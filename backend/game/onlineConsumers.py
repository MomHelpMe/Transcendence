import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
import jwt
from django.conf import settings
from channels.exceptions import DenyConnection
from .matchingConsumers import MatchingGameConsumer, MatchingGameState


class OnlineConsumer(AsyncWebsocketConsumer):
    online_user_list = set([])
    matching_queue = []
    matching_task = None

    @classmethod
    async def start_matching_task(cls):
        """중앙에서 매칭을 처리하는 task"""
        while True:
            await asyncio.sleep(2)
            if len(cls.matching_queue) >= 2:
                await cls.start_game()

    @classmethod
    async def start_game(cls):
        user1 = cls.matching_queue.pop(0)
        user2 = cls.matching_queue.pop(0)

        # Create a unique room name for the game
        room_name = f"{user1.uid}_{user2.uid}"

        # Initialize game state for the room
        MatchingGameConsumer.game_states[room_name] = MatchingGameState(
            user1.uid, user2.uid
        )
        MatchingGameConsumer.client_counts[room_name] = 2

        await user1.send(
            text_data=json.dumps({"action": "start_game", "room_name": room_name})
        )
        await user2.send(
            text_data=json.dumps({"action": "start_game", "room_name": room_name})
        )

        print(f"Users {user1.uid} and {user2.uid} moved to game room: {room_name}")

    async def connect(self):
        # Wait for authentication before joining room group
        self.uid = None
        self.authenticated = False
        await self.accept()

        # 매칭 task가 없으면 시작
        if OnlineConsumer.matching_task is None:
            OnlineConsumer.matching_task = asyncio.create_task(
                OnlineConsumer.start_matching_task()
            )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        action = text_data_json["action"]

        print("text_data", text_data_json)
        if action == "authenticate":
            token = text_data_json.get("token")
            if not token or not self.authenticate(token):
                print("authentication failed")
                await self.close(code=4001)
                return
            self.authenticated = True
            OnlineConsumer.online_user_list.add(self.uid)
            print("Online user list: ", OnlineConsumer.online_user_list)
        elif not self.authenticated:
            print("Invalid action")
            await self.close(code=4001)
            return
        elif action == "enter-matching":
            await self.enter_matching()
        elif action == "leave-matching":
            await self.leave_matching()

    def authenticate(self, token):
        try:
            # Decode JWT token
            decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            print("decoded: ", decoded)
            self.uid = decoded.get("id")
            print("uid: ", self.uid)
            if self.uid in OnlineConsumer.online_user_list:
                print("User already online")
                return False
            return True
        except jwt.ExpiredSignatureError:
            print("Token has expired")
            return False
        except jwt.InvalidTokenError:
            print("Invalid token")
            return False

    async def enter_matching(self):
        # Add user to matching queue
        if self not in OnlineConsumer.matching_queue:
            OnlineConsumer.matching_queue.append(self)
            print(
                "Matching queue: ", [user.uid for user in OnlineConsumer.matching_queue]
            )

    async def leave_matching(self):
        # Remove user from matching queue
        if self in OnlineConsumer.matching_queue:
            OnlineConsumer.matching_queue.remove(self)
            print(f"User {self.uid} removed from matching queue")
            print(
                "Matching queue: ", [user.uid for user in OnlineConsumer.matching_queue]
            )

    async def disconnect(self, close_code):
        # Leave room group
        if self.authenticated:
            OnlineConsumer.online_user_list.remove(self.uid)
            await self.leave_matching()
            print("Online user list: ", OnlineConsumer.online_user_list)

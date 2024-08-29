import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
import jwt
from django.conf import settings
from channels.exceptions import DenyConnection

class OnlineConsumer(AsyncWebsocketConsumer):
    online_user_list = set([])
    matching_queue = []

    async def connect(self):
        # Wait for authentication before joining room group
        self.uid = None
        self.authenticated = False
        await self.accept()

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
            print("Matching queue: ", [user.uid for user in OnlineConsumer.matching_queue])

        # Check if we have enough users to start a game
        if len(OnlineConsumer.matching_queue) >= 2:
            await self.start_game()

    async def leave_matching(self):
        # Remove user from matching queue
        if self in OnlineConsumer.matching_queue:
            OnlineConsumer.matching_queue.remove(self)
            print(f"User {self.uid} removed from matching queue")
            print("Matching queue: ", [user.uid for user in OnlineConsumer.matching_queue])

    async def start_game(self):
        # Take two users from the matching queue
        if len(OnlineConsumer.matching_queue) >= 2:
            user1 = OnlineConsumer.matching_queue.pop(0)
            user2 = OnlineConsumer.matching_queue.pop(0)

            # Create a unique room name for the game
            room_name = f"{user1.uid}_{user2.uid}"

            # Move users to the new room and start the game
            await user1.channel_layer.group_add(room_name, user1.channel_name)
            await user2.channel_layer.group_add(room_name, user2.channel_name)

            # Notify the users that they have been moved to a game room
            await user1.send(text_data=json.dumps({
                'action': 'start_game',
                'room_name': room_name
            }))
            await user2.send(text_data=json.dumps({
                'action': 'start_game',
                'room_name': room_name
            }))

            print(f"Started game in room: {room_name} with users: {user1.uid}, {user2.uid}")

    async def disconnect(self, close_code):
        # Leave room group
        if self.authenticated:
            OnlineConsumer.online_user_list.remove(self.uid)
            await self.leave_matching()
            print("Online user list: ", OnlineConsumer.online_user_list)

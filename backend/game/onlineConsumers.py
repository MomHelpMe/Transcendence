import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
import jwt
from django.conf import settings
from channels.exceptions import DenyConnection

class OnlineConsumer(AsyncWebsocketConsumer):
    online_user_list = set([])

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
        else:
            print("Invalid action")
            await self.close(code=4001)
            return

    def authenticate(self, token):
        try:
            # Decode JWT token
            decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            print("decoded: ", decoded)
            self.uid = decoded.get("id")
            print("uid: ", self.uid)
            if (OnlineConsumer.online_user_list.__contains__(self.uid)):
                print("User already online")
                return False
            # Check if uid matches the room_name
            return True
        except jwt.ExpiredSignatureError:
            print("Token has expired")
            return False
        except jwt.InvalidTokenError:
            print("Invalid token")
            return False


    async def disconnect(self, close_code):
        # Leave room group
        if self.authenticated:
            OnlineConsumer.online_user_list.remove(self.uid)
            print("Online user list: ", OnlineConsumer.online_user_list)

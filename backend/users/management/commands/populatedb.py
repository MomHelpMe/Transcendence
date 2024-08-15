from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from users.models import User, Friend, Game, Tournament
from django.utils import timezone
import random

class Command(BaseCommand):
    help = "Populates the database with sample data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Populating database...")

        # Create users
        users = []
        for i in range(10):
            rand = random.randint(1, 100)
            user, created = User.objects.update_or_create(
                user_id=i,
                defaults={
                    "nickname": f"User{rand}",
                    "email": f"user{rand}@example.com",
                    "img_url": f"https://example.com/user{rand}.png",
                    "is_2FA": random.choice([True, False]),
                    "is_online": random.choice([True, False]),
                },
            )
            users.append(user)

        # Create friends
        for i in range(15):
            user1, user2 = random.sample(users, 2)
            Friend.objects.create(user_id1=user1, user_id2=user2)

        # Create games
        for i in range(20):
            user1, user2 = random.sample(users, 2)
            Game.objects.create(
                game_type=random.choice(["Ai", "PvP", "Tournament"]),
                user_id1=user1,
                user_id2=user2,
                score1=random.randint(0, 100),
                score2=random.randint(0, 100),
                start_timestamp=timezone.now(),
                end_timestamp=timezone.now() + timezone.timedelta(minutes=10),
            )

        # Create tournaments
        games = list(Game.objects.all())
        for i in range(5):
            game1, game2, game3 = random.sample(games, 3)
            Tournament.objects.create(
                game_id1=game1,
                game_id2=game2,
                game_id3=game3,
                start_timestamp=timezone.now(),
                end_timestamp=timezone.now() + timezone.timedelta(minutes=30),
            )

        self.stdout.write(self.style.SUCCESS("Database successfully populated!"))

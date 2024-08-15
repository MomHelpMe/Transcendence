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
            user, created = User.objects.update_or_create(
                user_id=i,
                defaults={
                    "nickname": f"User{i}",
                    "email": f"user{i}@example.com",
                    "img_url": "https://picsum.photos/200",
                    "is_2FA": random.choice([True, False]),
                    "is_online": random.choice([True, False]),
                },
            )
            users.append(user)

        # Create friends
        for i in range(15):
            user1, user2 = random.sample(users, 2)
            Friend.objects.create(user1=user1, user2=user2)

        # Create games
        for i in range(20):
            user1, user2 = random.sample(users, 2)
            user1_score = random.randint(0, 100)
            user2_score = random.randint(0, 100)
            while user1_score == user2_score:
                user2_score = random.randint(0, 100)
            if (user1_score > user2_score):
                user1.win += 1
                user2.lose += 1
            else:
                user1.lose += 1
                user2.win += 1
            Game.objects.create(
                game_type="PvP",
                user1=user1,
                user2=user2,
                score1=user1_score,
                score2=user2_score,
                start_timestamp=timezone.now(),
                end_timestamp=timezone.now() + timezone.timedelta(minutes=10),
            )
            user1.save()
            user2.save()

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

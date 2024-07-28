from django.db import models


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    nickname = models.CharField(max_length=255)
    img_url = models.URLField(blank=True)
    is_2FA = models.BooleanField(default=False)
    is_online = models.BooleanField(default=False)

    def __str__(self):
        return self.nickname


class Friend(models.Model):
    friend_id = models.AutoField(primary_key=True)
    user_id1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friends_as_user1")
    user_id2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friends_as_user2")

    def __str__(self):
        return f"Friend: {self.userId1.nickname} - {self.userId2.nickname}"


class Game(models.Model):
    game_id = models.AutoField(primary_key=True)
    game_type = models.CharField(max_length=255)
    user_id1 = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name="games_as_user1")
    user_id2 = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name="games_as_user2")
    score1 = models.IntegerField()
    score2 = models.IntegerField()
    start_timestamp = models.DateTimeField()
    end_timestamp = models.DateTimeField()

    def __str__(self):
        return f"Game {self.game_id}: {self.user_id1.nickname} vs {self.user_id2.nickname}"


class Tournament(models.Model):
    tournament_id = models.AutoField(primary_key=True)
    game_id1 = models.ForeignKey(Game, null=True, on_delete=models.SET_NULL, related_name="tournaments_as_game1")
    game_id2 = models.ForeignKey(Game, null=True, on_delete=models.SET_NULL, related_name="tournaments_as_game2")
    game_id3 = models.ForeignKey(Game, null=True, on_delete=models.SET_NULL, related_name="tournaments_as_game3")
    start_timestamp = models.DateTimeField()
    end_timestamp = models.DateTimeField()

    def __str__(self):
        return f"Tournament {self.tournament_id}: {self.game_id1.game_type} - {self.game_id2.game_type} - {self.game_id3.game_type}"

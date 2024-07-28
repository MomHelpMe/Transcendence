# Generated by Django 4.2.14 on 2024-07-28 05:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('game_id', models.AutoField(primary_key=True, serialize=False)),
                ('game_type', models.CharField(max_length=255)),
                ('score1', models.IntegerField()),
                ('score2', models.IntegerField()),
                ('start_timestamp', models.DateTimeField()),
                ('end_timestamp', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('nickname', models.CharField(max_length=255)),
                ('img_url', models.CharField(max_length=255)),
                ('is_2FA', models.BooleanField(default=False)),
                ('is_online', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('tournament_id', models.AutoField(primary_key=True, serialize=False)),
                ('start_timestamp', models.DateTimeField()),
                ('end_timestamp', models.DateTimeField()),
                ('game_id1', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tournaments_as_game1', to='users.game')),
                ('game_id2', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tournaments_as_game2', to='users.game')),
                ('game_id3', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tournaments_as_game3', to='users.game')),
            ],
        ),
        migrations.AddField(
            model_name='game',
            name='user_id1',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='games_as_user1', to='users.user'),
        ),
        migrations.AddField(
            model_name='game',
            name='user_id2',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='games_as_user2', to='users.user'),
        ),
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('friend_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_id1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friend1', to='users.user')),
                ('user_id2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friend2', to='users.user')),
            ],
        ),
    ]
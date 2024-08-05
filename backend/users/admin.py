from django.contrib import admin
from .models import User, Friend, Game, Tournament

admin.site.register(User)
admin.site.register(Friend)
admin.site.register(Game)
admin.site.register(Tournament)

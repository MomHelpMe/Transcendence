from django.urls import path
from .views import ansan_king

urlpatterns = [
    path('ansan-king/', ansan_king, name='ansan-king'),
]

from django.urls import path

from core.views import send_message, save_token, csrf_token

urlpatterns = [
    path('csrf-token/', csrf_token, name='csrf_token'),
    path('save-token/', save_token, name='save_token'),
    path('send-message/', send_message, name='send_message'),
]
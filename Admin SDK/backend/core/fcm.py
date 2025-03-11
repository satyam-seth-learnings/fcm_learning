from django.conf import settings
from firebase_admin import messaging

firebase_app = getattr(settings, 'FIREBASE_APP')

def send_dummy_message_to_token(registration_token: str) -> None:
    # See documentation on defining a message payload.
    message = messaging.Message(
        token=registration_token,
        data={
            'test-key': 'test-value',
        },
        notification=messaging.Notification(
            title='Test notification Title',
            body='Test notification Body',
        ),
        webpush=messaging.WebpushConfig(
            fcm_options=messaging.WebpushFCMOptions(
                link='https://example.com/'
            )
        )
    )
        
    # Send a message to the device corresponding to the provided
    # registration token.
    response = messaging.send(message)
    # Response is a message ID string.
    print('Successfully sent message:', response)
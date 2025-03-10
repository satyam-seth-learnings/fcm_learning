import json
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods
from django.middleware.csrf import get_token
from core.fcm import send_dummy_message_to_token


def csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})


def send_message(request: HttpRequest) -> JsonResponse:
    # TODO: use stored fcm token from model
    fcm_token = request.session.get('fcm_token')

    print(fcm_token)
    
    if fcm_token:
        send_dummy_message_to_token(fcm_token)
        return JsonResponse({"status": "sending message"})

    return JsonResponse({"status": "token missing"}, status=400)


@require_http_methods(['POST'])
def save_token(request: HttpRequest) -> JsonResponse:
    try:
        data = json.loads(request.body)
        fcm_token = data.get("fcm_token") 
        
        if fcm_token:
            # TODO: store fcm token into model
            request.session['fcm_token'] = fcm_token
            request.session.save()
            return JsonResponse({"status": "token saved"})
        
        else:
            return JsonResponse({"status": "token missing"}, status=400)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
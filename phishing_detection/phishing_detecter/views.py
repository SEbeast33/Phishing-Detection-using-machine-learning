from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework import status, viewsets, generics
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from .classifier import *




# Create your views here.
from .models import *
@api_view(['POST'])
@csrf_exempt

def phishing_check(request):
    """This API is made by sharad"""


    try:
        url = request.data.get('url')
        pred=get_prediction_from_url(url)
        if pred==-1:
            result='its not safe '
        else:
            result='its totally safe'

        return Response(
            {
                "success": True,
                "message": "no error",
                "result" : result
            }
        )

    

    except:
        return Response({
            "success": False,
            "message": "An error occurred.",
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



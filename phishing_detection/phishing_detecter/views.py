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
from .serializers import *
from .models import *
import requests



# Create your views here.
from .models import *
@api_view(['POST'])

@csrf_exempt

def phishing_check(request):
    """This API is made by sharad"""


    try:
        serializer=SubmittedURLSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
        url = request.data.get('url')
        
         
        valid = check_website_existence(url)
        print(valid)
          
        pred = get_prediction_from_url(url)
        if pred == -1 :
            result = 'Phishing Website'
        elif pred == 0 :
            result ='Suspicious Website'
        elif valid == False:
            result = 'not valid'
        else:
            result='Legitimate Website'
        print(result)
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



@api_view(['GET'])
@csrf_exempt

def geturls(request):
    urls= SubmittedURL.objects.all().order_by('-id')[:6]
    serializer= SubmittedURLSerializer(urls,many=True)
    return Response(
        {
            "success": True,
            "message": "no error",
            "url": serializer.data
        }

    )

from django.urls import path
from . import views
urlpatterns = [

    path('',views.phishing_check),
    path('urls',views.geturls),


]
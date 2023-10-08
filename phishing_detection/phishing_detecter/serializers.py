from rest_framework import serializers
from .models import SubmittedURL

class SubmittedURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmittedURL
        fields = '__all__'

from django.db import models

# Create your models here.
class SubmittedURL(models.Model):
    url = models.CharField(max_length=4000)
    is_phishing = models.BooleanField(default=False)
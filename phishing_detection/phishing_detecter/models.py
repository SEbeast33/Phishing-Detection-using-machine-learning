from django.db import models

# Create your models here.
class SubmittedURL(models.Model):
    url = models.URLField(max_length=200)
    is_phishing = models.BooleanField(default=False)
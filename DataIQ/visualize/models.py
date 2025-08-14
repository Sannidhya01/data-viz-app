from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    pass
    
class Dataset(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="datasets")
    name = models.CharField(max_length=64)
    jsonContent = models.JSONField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} uploaded by {self.user.username}"


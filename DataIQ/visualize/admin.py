from django.contrib import admin
from .models import User, Dataset

# Register your models here.
admin.site.register(User)
admin.site.register(Dataset)
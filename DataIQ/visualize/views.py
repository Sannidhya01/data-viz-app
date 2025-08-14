from django.shortcuts import render, HttpResponse
import pandas as pd
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User, Dataset
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user

# Create your views here.

@csrf_exempt
@login_required
def upload_data(request):
    if request.method == 'POST' and request.FILES.get('file'):
        uploaded_file = request.FILES.get('file')
        datasetName = request.POST.get('datasetName')
        try:
            df = pd.read_csv(uploaded_file)
            json_data = df.to_dict(orient='records')

            if len(json_data) > 10001:
                return JsonResponse({'status':False, 'message':'Dataset must have 10000 records or less'})

            Dataset.objects.create(user = request.user, name = datasetName, jsonContent = json.dumps(json_data))
            return JsonResponse({'status':True, 'message':'Dataset successfully uploaded'})
        except Exception as e:
            return JsonResponse({'status':False, 'message':f'Error uploading dataset: {e}'})
    else:
        return JsonResponse({'status':False, 'message':'No file uploaded'})

@csrf_exempt
@login_required
def delete_dataset(request):
    if request.method == 'POST':
        try:
            jsonData = json.loads(request.body)
            dataset_id = jsonData.get('id')

            datasetObj = Dataset.objects.get(id = dataset_id)

            if not datasetObj:
                return JsonResponse({"error": "Dataset not found"})
            
            datasetObj.delete()

            return JsonResponse({'status': True, 'message': 'Dataset deleted successfully' })

        except:
            return JsonResponse({"error": "Error deleting dataset"})

    return JsonResponse({"error": "Invalid request method"})

@csrf_exempt
def authenticateUser(request):
    if request.method == 'POST':
        loginData = json.loads(request.body)
        username = loginData.get("username")
        password = loginData.get("password")

        user = authenticate(request, username = username, password = password)

        if user is not None:
            login(request, user)
            return JsonResponse({'status':True, 'message': 'Login Successful', 'username': request.user.username})
        else:
            return JsonResponse({'status':False, 'message': 'Invalid Credentials'})
    else:
        return JsonResponse({'status':False, 'message':'Authentication unsuccessful'})
        
@csrf_exempt        
def registerUser(request):
    if request.method == 'POST':
        loginData = json.loads(request.body)
        username = loginData.get("username")
        password = loginData.get("password")
        email = loginData.get("email")

        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            return JsonResponse({'status':True, 'message':'User registered successfully'})
        except IntegrityError as e:
            print(e)
            return JsonResponse({'status':False, 'message':'User credentials already exist'})
    else:
        return JsonResponse({'status':False, 'message':'No user credentials recieved'})


@csrf_exempt
def verifyLogin(request):
    if request.user.is_authenticated:
        return JsonResponse({'status':True, 'message':'User is logged in', 'username': request.user.username})
    else:
        return JsonResponse({'status':False, 'message':'Invalid session'})

@csrf_exempt
def logout_request(request):
    logout(request)
    return JsonResponse({'status':True, 'message': 'User logged out'})

@csrf_exempt
def fetch_datasets(request):
    datasets = Dataset.objects.filter(user = request.user).values('id', 'name', 'uploaded_at')
    return JsonResponse(list(datasets), safe=False)

@csrf_exempt
@login_required
def show_dataset(request):
    if request.method == 'POST':
        try:
            jsonData = json.loads(request.body)
            dataset_id = jsonData.get('id')

            dataset = Dataset.objects.filter(id=dataset_id).values_list('jsonContent', flat=True).first()

            if not dataset:
                return JsonResponse({"error": "Dataset not found"})
            
            if isinstance(dataset, str):
                dataset = json.loads(dataset)

            return JsonResponse({"dataset": dataset})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"})

    return JsonResponse({"error": "Invalid request method"})


from django.urls import path
from . import views

urlpatterns = [
    path("authenticate", views.authenticateUser, name = "authenticate_user"),
    path("register", views.registerUser, name = "register_user"),
    path("verify_login", views.verifyLogin, name = "verify_user"),
    path("logout", views.logout_request, name = "logout_user"),
    path("upload_data", views.upload_data, name = "upload_data"),
    path("fetch_datasets", views.fetch_datasets, name = "fetch_datasets"),
    path("show_dataset", views.show_dataset, name = "show_datasets"),
    path("delete", views.delete_dataset, name = "delete_datasets"),
]
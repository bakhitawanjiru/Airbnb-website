from django.urls import path
from .views import LoginView, RegisterView, UserView, AdminLoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserView.as_view(), name='user'),
    path('admin-login/', AdminLoginView.as_view(), name='admin-login'),
]
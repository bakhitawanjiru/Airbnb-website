from django.urls import path
from . import views

urlpatterns = [
    path('hosts/', views.HostListView.as_view(), name='host-list'),
    path('hosts/<int:pk>/', views.HostDetailView.as_view(), name='host-detail'),
]
from django.urls import path, include

urlpatterns = [
    path('accounts/', include('accounts.urls')),
    path('hosts/', include('hosts.urls')),
    path('auth/', include('authentication.urls')),
]
from rest_framework import viewsets
from .models import Host
from .serializers import HostSerializer

class HostViewSet(viewsets.ModelViewSet):
    queryset = Host.objects.all()
    serializer_class = HostSerializer

    def perform_create(self, serializer):
        serializer.save()
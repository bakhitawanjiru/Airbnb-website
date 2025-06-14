from rest_framework import serializers
from .models import Host

class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = '__all__'  # Include all fields from the Host model

class HostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = ['id', 'name', 'email', 'phone_number']  # Specify fields for detailed view
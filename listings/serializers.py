from rest_framework import serializers
from .models import Listing, Booking, Wishlist, Message
from authentication.models import User

class UserPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ListingSerializer(serializers.ModelSerializer):
    host = UserPreviewSerializer(read_only=True)

    class Meta:
        model = Listing
        fields = ['id', 'host', 'title', 'description', 'location', 'price', 'max_guests']

class BookingSerializer(serializers.ModelSerializer):
    listing = ListingSerializer(read_only=True)
    guest = UserPreviewSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'listing', 'guest', 'check_in', 'check_out', 'guests', 'status']

class WishlistSerializer(serializers.ModelSerializer):
    listings = ListingSerializer(many=True, read_only=True)
    user = UserPreviewSerializer(read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'name', 'listings', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserPreviewSerializer(read_only=True)
    receiver = UserPreviewSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'created_at', 'read']
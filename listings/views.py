from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Booking, Wishlist, Message, Listing, ListingImage
from .serializers import BookingSerializer, WishlistSerializer, MessageSerializer, ListingSerializer
from django.utils import timezone
from rest_framework.views import APIView
from django.db import models
from .permissions import IsHostOrReadOnly, IsListingHost


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Booking.objects.filter(guest=user)

    @action(detail=False, methods=['GET'])
    def upcoming(self, request):
        upcoming = self.get_queryset().filter(
            status__in=['pending', 'confirmed'],
            check_in__gte=timezone.now()
        )
        serializer = self.get_serializer(upcoming, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def past(self, request):
        past = self.get_queryset().filter(
            status='completed',
            check_out__lt=timezone.now()
        )
        serializer = self.get_serializer(past, many=True)
        return Response(serializer.data)

class WishlistView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        wishlists = Wishlist.objects.filter(user=request.user)
        serializer = WishlistSerializer(wishlists, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WishlistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            wishlist = Wishlist.objects.get(pk=pk, user=request.user)
            wishlist.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Wishlist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
class MessageView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        conversations = Message.objects.filter(
            models.Q(sender=request.user) | models.Q(receiver=request.user)
        ).values('sender', 'receiver').distinct()
        
      

    def post(self, request):
        serializer = MessageSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(sender=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [IsHostOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)

    @action(detail=False, methods=['GET'])
    def my_listings(self, request):
        listings = Listing.objects.filter(host=request.user)
        serializer = self.get_serializer(listings, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['POST'])
    def upload_images(self, request, pk=None):
        listing = self.get_object()
        if listing.host != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        files = request.FILES.getlist('images')
        for file in files:
            ListingImage.objects.create(listing=listing, image=file)
        return Response({'status': 'Images uploaded'})

    @action(detail=True, methods=['POST'])
    def set_availability(self, request, pk=None):
        listing = self.get_object()
        if listing.host != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        listing.availability_calendar = request.data.get('availability', {})
        listing.save()
        return Response({'status': 'Calendar updated'})

    @action(detail=True, methods=['GET'])
    def bookings(self, request, pk=None):
        listing = self.get_object()
        if listing.host != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        bookings = listing.booking_set.all()
        return Response(BookingSerializer(bookings, many=True).data)
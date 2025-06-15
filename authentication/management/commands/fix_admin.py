from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction

User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        with transaction.atomic():
            # Remove existing admin users
            User.objects.filter(is_superuser=True).delete()
            
            # Create fresh admin user
            admin = User.objects.create_user(
                username='admin',
                email='bakhita@gmail.com',
                password='admin123'
            )
            
            # Set admin privileges
            admin.is_superuser = True
            admin.is_staff = True
            admin.save()
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'\nAdmin user recreated successfully:'
                    f'\nUsername: {admin.username}'
                    f'\nEmail: {admin.email}'
                    f'\nPassword: admin123'
                    f'\nIs superuser: {admin.is_superuser}'
                    f'\nIs staff: {admin.is_staff}'
                )
            )
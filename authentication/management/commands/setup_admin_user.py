from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction

User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        with transaction.atomic():
            try:
                # Remove any existing admin user
                User.objects.filter(email='bakhita@gmail.com').delete()
                
                # Create fresh admin user
                admin = User.objects.create_user(
                    username='bakhita',
                    email='bakhita@gmail.com',
                    password='admin123'
                )
                
                # Set admin privileges
                admin.is_superuser = True
                admin.is_staff = True
                admin.save()
                
                self.stdout.write(
                    self.style.SUCCESS(
                        f'\nAdmin user created successfully:'
                        f'\nEmail: bakhita@gmail.com'
                        f'\nPassword: admin123'
                        f'\nUsername: {admin.username}'
                        f'\nIs superuser: {admin.is_superuser}'
                    )
                )
            
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error: {str(e)}'))
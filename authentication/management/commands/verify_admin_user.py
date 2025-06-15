from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction

User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        with transaction.atomic():
            # Check for existing admin
            admin = User.objects.filter(email='bakhita@gmail.com').first()
            
            if admin:
                # Update existing admin
                admin.set_password('admin123')
                admin.is_superuser = True
                admin.is_staff = True
                admin.save()
                
                self.stdout.write(
                    self.style.SUCCESS(
                        f'\nExisting admin updated:'
                        f'\nUsername: {admin.username}'
                        f'\nEmail: {admin.email}'
                        f'\nIs superuser: {admin.is_superuser}'
                    )
                )
            else:
                # Create new admin
                admin = User.objects.create_superuser(
                    username='admin',
                    email='bakhita@gmail.com',
                    password='admin123'
                )
                
                self.stdout.write(
                    self.style.SUCCESS(
                        f'\nNew admin created:'
                        f'\nUsername: {admin.username}'
                        f'\nEmail: {admin.email}'
                    )
                )

            self.stdout.write(
                self.style.SUCCESS(
                    '\nUse these credentials to login:'
                    '\nEmail: bakhita@gmail.com'
                    '\nPassword: admin123'
                )
            )
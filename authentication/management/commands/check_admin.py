from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        # Check for existing admin
        admin = User.objects.filter(is_superuser=True).first()
        
        if admin:
            # Reset admin password
            admin.set_password('admin123')
            admin.email = 'bakhita@gmail.com'
            admin.is_superuser = True
            admin.is_staff = True
            admin.save()
            
            self.stdout.write(self.style.SUCCESS(
                f'\nAdmin user updated:'
                f'\nEmail: {admin.email}'
                f'\nUsername: {admin.username}'
                f'\nPassword: admin123'
                f'\nIs superuser: {admin.is_superuser}'
                f'\nIs staff: {admin.is_staff}'
            ))
        else:
            self.stdout.write(self.style.ERROR('No admin user found!'))
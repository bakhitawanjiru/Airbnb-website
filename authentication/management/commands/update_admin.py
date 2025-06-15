from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        # Find admin user
        admin = User.objects.filter(is_superuser=True).first()
        
        if admin:
            # Update admin credentials
            old_email = admin.email
            admin.email = 'bakhita@gmail.com'
            admin.set_password('admin123')  # Reset password to ensure it works
            admin.is_superuser = True
            admin.is_staff = True
            admin.save()
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'\nAdmin credentials updated:'
                    f'\nOld email: {old_email}'
                    f'\nNew email: bakhita@gmail.com'
                    f'\nPassword: admin123'
                    f'\nIs superuser: {admin.is_superuser}'
                    f'\nIs staff: {admin.is_staff}'
                )
            )
        else:
            # Create new admin if none exists
            User.objects.create_superuser(
                username='admin',
                email='bakhita@gmail.com',
                password='admin123'
            )
            self.stdout.write(
                self.style.SUCCESS(
                    '\nNew admin user created:'
                    '\nEmail: bakhita@gmail.com'
                    '\nPassword: admin123'
                )
            )
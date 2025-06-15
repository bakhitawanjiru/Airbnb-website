from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        # Find admin user
        admin = User.objects.filter(is_superuser=True).first()
        
        if admin:
            self.stdout.write(self.style.WARNING(
                f"\nExisting admin found:"
                f"\nUsername: {admin.username}"
                f"\nEmail: {admin.email}"
                f"\nIs superuser: {admin.is_superuser}"
                f"\nIs staff: {admin.is_staff}"
                f"\nUser type: {admin.user_type}"
            ))
            
            # Update admin credentials
            admin.username = 'admin'
            admin.email = 'bakhita@gmail.com'
            admin.password = make_password('admin123')
            admin.is_superuser = True
            admin.is_staff = True
            admin.user_type = 'admin'
            admin.save()
            
            self.stdout.write(self.style.SUCCESS(
                "\nAdmin credentials updated:"
                "\nEmail: bakhita@gmail.com"
                "\nPassword: admin123"
            ))
        else:
            # Create new admin
            User.objects.create_superuser(
                username='admin',
                email='bakhita@gmail.com',
                password='admin123',
                user_type='admin'
            )
            self.stdout.write(self.style.SUCCESS(
                "\nNew admin user created:"
                "\nEmail: bakhita@gmail.com"
                "\nPassword: admin123"
            ))
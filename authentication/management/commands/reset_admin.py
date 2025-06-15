from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        # Delete existing admin users
        User.objects.filter(is_superuser=True).delete()

        # Create new admin user
        admin_user = User.objects.create_superuser(
            username='admin',
            email='bakhita@gmail.com',
            password='admin123',
            user_type='admin'
        )
        
        self.stdout.write(
            self.style.SUCCESS(
                '\nAdmin user reset successfully!'
                '\nUse these credentials to login:'
                '\nEmail: bakhita@gmail.com'
                '\nPassword: admin123'
            )
        )
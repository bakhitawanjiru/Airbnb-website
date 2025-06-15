from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        if User.objects.filter(is_superuser=True).exists():
            self.stdout.write(self.style.WARNING('Admin user already exists'))
            return

        admin_user = User.objects.create_superuser(
            username='admin',
            email='bakhita@gmail.com',
            password='admin123',
            user_type='admin'
        )
        
        self.stdout.write(
            self.style.SUCCESS(f'Admin user created successfully\nEmail: bakhita@gmail.com\nPassword: admin123')
        )
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates the admin user'

    def handle(self, *args, **kwargs):
        email = 'bakhita@gmail.com'  
        password = 'admin123' 
        
        if not User.objects.filter(email=email).exists():
            User.objects.create_superuser(
                username='admin',
                email=email,
                password=password,
                user_type='admin'
            )
            self.stdout.write(self.style.SUCCESS('Admin user created successfully'))
        else:
            self.stdout.write(self.style.WARNING('Admin user already exists'))
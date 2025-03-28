from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login as auth_login, authenticate
from django.contrib import messages

# Create your views here.
def index(request):
    """View function for the home page."""
    return render(request, 'index.html')

def menu(request):
    """View function for the menu page."""
    return render(request, 'menu.html')

def about(request):
    """View function for the about page."""
    return render(request, 'about.html')

def contact(request):
    """View function for the contact page."""
    return render(request, 'contact.html')

def login(request):
    """View function for the login page."""
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('index')
        else:
            messages.error(request, 'Invalid username or password')
    
    return render(request, 'login.html')

def register(request):
    """View function for the register page."""
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        # Basic validation
        if password != confirm_password:
            messages.error(request, 'Passwords do not match')
            return render(request, 'register.html')
        
        # Check if username already exists
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
            return render(request, 'register.html')
        
        # Check if email already exists
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered')
            return render(request, 'register.html')
        
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        # Log the user in automatically
        auth_login(request, user)
        messages.success(request, 'Registration successful!')
        return redirect('index')
    
    return render(request, 'register.html')

def some_view(request):
    # Change any occurrences of:
    # return redirect('home')
    # to:
    return redirect('index')

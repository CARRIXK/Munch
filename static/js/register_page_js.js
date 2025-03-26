document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const errorMessage = document.getElementById('error-message');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            
            // Simple validation
            if (!username || !email || !password || !confirmPassword) {
                errorMessage.textContent = 'Please fill in all fields';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorMessage.textContent = 'Please enter a valid email address';
                return;
            }
            
            // Password match validation
            if (password !== confirmPassword) {
                errorMessage.textContent = 'Passwords do not match';
                return;
            }
            
            // Password strength validation (basic)
            if (password.length < 8) {
                errorMessage.textContent = 'Password must be at least 8 characters long';
                return;
            }
            
            // Here you would typically send the data to your server
            // using fetch API or similar, but for now we'll just simulate a submission
            
            // Example fetch request (uncomment and modify when backend is ready)
            /*
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify({ username, email, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/login?registered=true';
                } else {
                    errorMessage.textContent = data.message || 'Registration failed';
                }
            })
            .catch(error => {
                errorMessage.textContent = 'An error occurred during registration';
                console.error(error);
            });
            */
            
            // For demonstration purposes only
            console.log('Registration form submitted:', { username, email, password });
            // Uncomment below line to submit the form for real
            // this.submit();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!username || !password) {
                errorMessage.textContent = 'Please enter both username and password';
                return;
            }
            
            // Here you would typically send the data to your server
            // using fetch API or similar, but for now we'll just simulate a submission
            
            // Example fetch request (uncomment and modify when backend is ready)
            /*
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/dashboard';
                } else {
                    errorMessage.textContent = data.message || 'Login failed';
                }
            })
            .catch(error => {
                errorMessage.textContent = 'An error occurred during login';
                console.error(error);
            });
            */
            
            // For demonstration purposes only
            console.log('Login form submitted:', { username, password });
            loginForm.reset();
        });
    }
});

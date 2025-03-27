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
            
            // Get CSRF token
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            
            // Send registration request to server
            fetch(registerForm.action || window.location.href, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrfToken
                },
                body: new URLSearchParams({
                    'username': username,
                    'email': email,
                    'password': password,
                    'confirm_password': confirmPassword,
                    'csrfmiddlewaretoken': csrfToken
                })
            })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                    return;
                }
                return response.text();
            })
            .then(data => {
                if (!data) return; // If redirected, data will be undefined
                
                // Check if the response contains an error message
                if (data.includes('error-message')) {
                    // Extract error message or use a default
                    const parser = new DOMParser();
                    const htmlDoc = parser.parseFromString(data, 'text/html');
                    const serverErrorMsg = htmlDoc.getElementById('error-message');
                    errorMessage.textContent = serverErrorMsg?.textContent || 'Registration failed. Please try again.';
                } else {
                    // If we got HTML back but no redirect, refresh the page
                    window.location.reload();
                }
            })
            .catch(error => {
                errorMessage.textContent = 'An error occurred during registration';
                console.error(error);
            });
        });
    }
});

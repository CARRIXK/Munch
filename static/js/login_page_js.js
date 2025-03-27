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
            
            // Get CSRF token
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            
            // Send login request to server
            fetch(loginForm.action || window.location.href, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrfToken
                },
                body: new URLSearchParams({
                    'username': username,
                    'password': password,
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
                    errorMessage.textContent = 'Invalid username or password';
                } else {
                    // If we got HTML back but no redirect, refresh the page
                    // This is a fallback and should typically not happen
                    window.location.reload();
                }
            })
            .catch(error => {
                errorMessage.textContent = 'An error occurred during login';
                console.error(error);
            });
        });
    }
});

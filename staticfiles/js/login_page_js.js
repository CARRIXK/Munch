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
            
            // Instead of using fetch, let's submit the form normally
            // which is more reliable for Django's authentication views
            this.submit();
            
            /* Commenting out fetch approach which might be causing issues
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
                // ...existing code...
            })
            .catch(error => {
                // ...existing code...
            });
            */
        });
    }
});

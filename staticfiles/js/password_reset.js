document.addEventListener('DOMContentLoaded', function() {
    const resetForm = document.getElementById('password-reset-form');
    const errorMessage = document.getElementById('error-message');
    
    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            
            // Simple validation
            if (!email) {
                errorMessage.textContent = 'Please enter your email address';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorMessage.textContent = 'Please enter a valid email address';
                return;
            }
            
            // Get CSRF token
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            
            // Send password reset request to server
            fetch(window.location.href, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrfToken
                },
                body: new URLSearchParams({
                    'email': email,
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
                
                // Always show success message to prevent email enumeration attacks
                resetForm.innerHTML = '<div class="success-message">If the email exists in our system, you will receive password reset instructions shortly.</div>';
            })
            .catch(error => {
                // Still show success message even on error to prevent email enumeration
                resetForm.innerHTML = '<div class="success-message">If the email exists in our system, you will receive password reset instructions shortly.</div>';
                console.error(error);
            });
        });
    }
});

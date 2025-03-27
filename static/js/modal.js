document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginOpenBtn = document.getElementById('login-modal-open');
    const registerOpenBtn = document.getElementById('register-modal-open');
    const loginCloseBtn = document.getElementById('login-modal-close');
    const registerCloseBtn = document.getElementById('register-modal-close');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    
    // Form elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginErrorMsg = document.getElementById('login-error-message');
    const registerErrorMsg = document.getElementById('register-error-message');

    // Open modals
    if (loginOpenBtn) {
        loginOpenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    if (registerOpenBtn) {
        registerOpenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modals
    if (loginCloseBtn) {
        loginCloseBtn.addEventListener('click', function() {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (registerCloseBtn) {
        registerCloseBtn.addEventListener('click', function() {
            registerModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Switch between modals
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            registerModal.classList.add('active');
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }
    
    // Close modals by clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Login form submission handling
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            if (!username || !password) {
                loginErrorMsg.textContent = 'Please enter both username and password';
                return;
            }
            
            const csrfToken = loginForm.querySelector('[name=csrfmiddlewaretoken]').value;
            
            fetch(loginForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrfToken
                },
                body: new URLSearchParams({
                    'username': username,
                    'password': password,
                    'csrfmiddlewaretoken': csrfToken,
                    'next': loginForm.querySelector('[name=next]').value
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
                if (!data) return; // If redirected
                
                if (data.includes('error-message')) {
                    loginErrorMsg.textContent = 'Invalid username or password';
                } else {
                    // Fallback in case no redirect happens
                    window.location.reload();
                }
            })
            .catch(error => {
                loginErrorMsg.textContent = 'An error occurred during login';
                console.error(error);
            });
        });
    }
    
    // Register form submission handling
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('reg-username').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm_password').value;
            
            if (!username || !email || !password || !confirmPassword) {
                registerErrorMsg.textContent = 'Please fill in all fields';
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                registerErrorMsg.textContent = 'Please enter a valid email address';
                return;
            }
            
            if (password !== confirmPassword) {
                registerErrorMsg.textContent = 'Passwords do not match';
                return;
            }
            
            if (password.length < 8) {
                registerErrorMsg.textContent = 'Password must be at least 8 characters long';
                return;
            }
            
            const csrfToken = registerForm.querySelector('[name=csrfmiddlewaretoken]').value;
            
            fetch(registerForm.action, {
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
                if (!data) return; // If redirected
                
                if (data.includes('error-message')) {
                    const parser = new DOMParser();
                    const htmlDoc = parser.parseFromString(data, 'text/html');
                    const serverErrorMsg = htmlDoc.querySelector('.error-message');
                    registerErrorMsg.textContent = serverErrorMsg?.textContent || 'Registration failed. Please try again.';
                } else {
                    // On success, show login modal with success message
                    registerModal.classList.remove('active');
                    loginModal.classList.add('active');
                    loginErrorMsg.textContent = '';
                    loginErrorMsg.innerHTML = '<div class="success-message">Registration successful! Please log in.</div>';
                }
            })
            .catch(error => {
                registerErrorMsg.textContent = 'An error occurred during registration';
                console.error(error);
            });
        });
    }
});

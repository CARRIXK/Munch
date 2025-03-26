document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile navigation toggle
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<span>Menu</span>';
    
    const header = document.querySelector('.site-header .container');
    const nav = document.querySelector('.main-nav');
    
    // Only add mobile navigation if we're on a small screen and the nav exists
    if (window.innerWidth <= 768 && nav) {
        header.insertBefore(navToggle, nav);
        
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close navigation when a link is clicked
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
});

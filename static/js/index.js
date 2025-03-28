// Toggle the dropdown menu
function toggleDropdown() {
    const dropdown = document.querySelector('.nav-links');
    dropdown.classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// JavaScript for carousel functionality
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}

function nextSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
  document.querySelector('.carousel-next').addEventListener('click', nextSlide);
  document.querySelector('.carousel-prev').addEventListener('click', prevSlide);

  setInterval(() => {
    nextSlide();
  }, 3000);
});


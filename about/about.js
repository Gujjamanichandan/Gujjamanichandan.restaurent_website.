let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function autoSlide() {
  nextSlide();
}

// Initial setup
showSlide(currentSlide);

// Add event listeners for navigation
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.testimonial-container').addEventListener('click', function (e) {
    if (e.target.classList.contains('left-arrow')) {
      prevSlide();
    } else if (e.target.classList.contains('right-arrow')) {
      nextSlide();
    }
  });

  // Automatic sliding every 5 seconds
  setInterval(autoSlide, 5000);
});

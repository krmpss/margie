let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

if (slides.length > 0) {
    slides[0].style.display = 'block'; // This line should display the first slide.

    setInterval(() => {
        slides[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.display = 'block';
    }, 5000); // Change slide every 5 seconds
}

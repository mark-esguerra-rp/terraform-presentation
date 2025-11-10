// Terraform Presentation - Navigation and Theme Toggle

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Theme Toggle Function
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    document.getElementById('themeIcon').textContent = isLight ? '☀️' : '🌙';
}

// Show specific slide
function showSlide(n) {
    currentSlide = Math.max(0, Math.min(n, slides.length - 1));
    slides[currentSlide].scrollIntoView({ behavior: 'smooth' });
    updateNavigationButtons();
}

// Change slide by direction
function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Update navigation button states
function updateNavigationButtons() {
    document.getElementById('prevBtn').disabled = currentSlide === 0;
    document.getElementById('nextBtn').disabled = currentSlide === slides.length - 1;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        changeSlide(1);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        changeSlide(-1);
    }
});

// Scroll detection to update current slide
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        slides.forEach((slide, index) => {
            const rect = slide.getBoundingClientRect();
            if (rect.top >= -100 && rect.top <= 100) {
                currentSlide = index;
                updateNavigationButtons();
            }
        });
    }, 100);
});

// Initialize
showSlide(0);
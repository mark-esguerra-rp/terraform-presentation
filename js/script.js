// Terraform Presentation - Navigation and Theme Toggle

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Update slide counter display
function updateSlideCounter() {
    const counter = document.getElementById('slideCounter');
    if (counter) {
        counter.textContent = `${currentSlide + 1}/${slides.length}`;
    }
}

// Theme Toggle Function
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    document.getElementById('themeIcon').textContent = isDark ? '🌙' : '☀️';
}

// Show specific slide
function showSlide(n) {
    currentSlide = Math.max(0, Math.min(n, slides.length - 1));
    slides[currentSlide].scrollIntoView({ behavior: 'smooth' });
    updateNavigationButtons();
    updateSlideCounter();
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
                updateSlideCounter();
            }
        });
    }, 100);
});

// Initialize
showSlide(0);
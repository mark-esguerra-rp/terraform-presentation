// Terraform Presentation - Navigation and Theme Toggle

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
let sections = [];
let isStepperOpen = false;

// Define sections (like chapters in your presentation)
function initializeSections() {
    sections = [
        { name: "Title", start: 0, end: 0 },
        { name: "CI/CD Basics", start: 1, end: 5 },
        { name: "Infrastructure as Code", start: 6, end: 11 },
        { name: "Terraform Basics", start: 12, end: 20 },
        { name: "POS Example", start: 21, end: 27 },
        { name: "Terragrunt", start: 28, end: 35 },
        { name: "ContentStack", start: 36, end: 42 },
        { name: "Multi-Region", start: 43, end: 45 },
        { name: "Summary", start: slides.length - 1, end: slides.length - 1 }
    ];
    buildStepperMenu();
}

// Build the stepper menu
function buildStepperMenu() {
    const stepperContent = document.getElementById('stepperContent');
    if (!stepperContent) return;

    stepperContent.innerHTML = sections.map((section, index) => {
        const slideCount = section.end - section.start + 1;
        return `
            <div class="stepper-item" data-section="${index}" onclick="jumpToSection(${index})">
                <div class="stepper-item-header">
                    <span class="stepper-number">${index + 1}</span>
                    <span class="stepper-name">${section.name}</span>
                </div>
                <div class="stepper-item-info">
                    <span class="stepper-slides">${slideCount} slide${slideCount > 1 ? 's' : ''}</span>
                    <span class="stepper-range">Slides ${section.start + 1}-${section.end + 1}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Toggle stepper menu
function toggleStepper() {
    isStepperOpen = !isStepperOpen;
    const stepperMenu = document.getElementById('stepperMenu');
    const stepperToggle = document.getElementById('stepperToggle');
    
    if (isStepperOpen) {
        stepperMenu.classList.add('active');
        stepperToggle.classList.add('active');
        updateStepperHighlight();
    } else {
        stepperMenu.classList.remove('active');
        stepperToggle.classList.remove('active');
    }
}

// Jump to a specific section
function jumpToSection(sectionIndex) {
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
        showSlide(sections[sectionIndex].start);
        toggleStepper();
    }
}

// Update stepper highlight based on current slide
function updateStepperHighlight() {
    const currentSection = sections.findIndex(section => 
        currentSlide >= section.start && currentSlide <= section.end
    );
    
    document.querySelectorAll('.stepper-item').forEach((item, index) => {
        if (index === currentSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

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
    updateStepperHighlight();
}

// Change slide by direction
function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Update navigation button states
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === slides.length - 1;
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        changeSlide(1);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        changeSlide(-1);
    } else if (e.key === 'Escape' && isStepperOpen) {
        toggleStepper();
    } else if (e.key === 'm' || e.key === 'M') {
        toggleStepper();
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
                updateStepperHighlight();
            }
        });
    }, 100);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSections();
    showSlide(0);
});

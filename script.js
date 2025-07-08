// Popular Projects Filtering
const categoryButtons = document.querySelectorAll('.projects-categories button');
const projectCards = document.querySelectorAll('.project-card');

categoryButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active from all
        categoryButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const selected = this.textContent.trim();
        projectCards.forEach(card => {
            const info = card.querySelector('.project-info span');
            if (selected === 'All' || (info && info.textContent.trim() === selected)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Show All button functionality
const showAllBtn = document.querySelector('.projects-showall button');
if (showAllBtn) {
    showAllBtn.addEventListener('click', function () {
        document.body.classList.add('show-all');
    });
}

// Testimonials auto-slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonials-dots .dot');
let testimonialIndex = 0;
const testimonialsPerSlide = 3;
const totalTestimonials = testimonialCards.length;
const totalSlides = Math.ceil(totalTestimonials / testimonialsPerSlide);

function showTestimonials(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('testimonial-featured', 'testimonial-hidden');
        if (i < index * testimonialsPerSlide || i >= (index + 1) * testimonialsPerSlide) {
            card.classList.add('testimonial-hidden');
        }
    });
    // Highlight the middle card
    const start = index * testimonialsPerSlide;
    const mid = start + 1;
    if (testimonialCards[mid]) {
        testimonialCards[mid].classList.add('testimonial-featured');
    }
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextTestimonialSlide() {
    testimonialIndex = (testimonialIndex + 1) % totalSlides;
    showTestimonials(testimonialIndex);
}

// Add more dots if needed
const dotsContainer = document.querySelector('.testimonials-dots');
if (dotsContainer && testimonialDots.length < totalSlides) {
    for (let i = testimonialDots.length; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dotsContainer.appendChild(dot);
    }
}

// Update dot references
const allDots = document.querySelectorAll('.testimonials-dots .dot');
allDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        testimonialIndex = i;
        showTestimonials(testimonialIndex);
    });
});

showTestimonials(testimonialIndex);
setInterval(nextTestimonialSlide, 4000); 
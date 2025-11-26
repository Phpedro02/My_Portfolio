// Dynamic Year
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
}

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

if (menuBtn && navbar) {
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]') as HTMLElement;
const cursorOutline = document.querySelector('[data-cursor-outline]') as HTMLElement;

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e: MouseEvent) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add some lag to the outline for a smooth feel
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.project-card, .skill-category, .about-text, .contact-container');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => {
    (el as HTMLElement).style.opacity = '0';
    (el as HTMLElement).style.transform = 'translateY(30px)';
    (el as HTMLElement).style.transition = 'all 0.8s ease';
    revealObserver.observe(el);
});

// Add revealed class styles dynamically
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleSheet);

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

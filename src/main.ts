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

    // Close menu when clicking a link and update active state
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuBtn.classList.remove('active');
            
            // Update active class on click
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]') as HTMLElement;
const cursorOutline = document.querySelector('[data-cursor-outline]') as HTMLElement;

if (cursorDot && cursorOutline) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    // Update mouse position
    window.addEventListener('mousemove', (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor with requestAnimationFrame for better performance
    function animateCursor() {
        // Instant dot movement
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        
        // Smooth outline movement with lerp
        const speed = 0.15;
        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover effect to interactive elements using event delegation
    const interactiveSelector = 'a, button, .project-card, .skill-category';
    
    document.body.addEventListener('mouseover', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest(interactiveSelector)) {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        }
    });

    document.body.addEventListener('mouseout', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (target.closest(interactiveSelector) && 
            !relatedTarget?.closest(interactiveSelector)) {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        }
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
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Add revealed class styles dynamically
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .project-card, .skill-category, .about-text, .contact-container {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
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

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

// Throttle function for better performance
function throttle<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastExecTime = 0;
    
    return function(this: any, ...args: Parameters<T>) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime >= delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionHeight = sectionElement.offsetHeight;
        const sectionTop = sectionElement.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Handle top of page (home section)
    if (scrollY < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
}

// Update active nav on scroll with throttling
window.addEventListener('scroll', throttle(updateActiveNav, 100));
// Also update on page load
updateActiveNav();
/**
 * Macao Internacional - Main JavaScript
 * Handles mobile menu, smooth scrolling, form validation, and interactive features
 */

// ===== DOM Elements =====
const header = document.getElementById('header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// ===== Mobile Menu Toggle =====
let mobileNavCreated = false;

function createMobileNav() {
    if (mobileNavCreated) return;

    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <div class="mobile-nav-links">
            <a href="#inicio" class="nav-link">Inicio</a>
            <a href="#productos" class="nav-link">Productos</a>
            <a href="#servicios" class="nav-link">Servicios</a>
            <a href="#nosotros" class="nav-link">Nosotros</a>
            <a href="#contacto" class="nav-link">Contacto</a>
        </div>
    `;

    document.body.appendChild(mobileNav);

    // Add click handlers to mobile nav links
    const mobileLinks = mobileNav.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    mobileNavCreated = true;
    return mobileNav;
}

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        const mobileNav = createMobileNav();
        const isActive = mobileNav.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', isActive);
    });
}

// ===== Header Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (currentScroll > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    lastScroll = currentScroll;
});

// ===== Back to Top Button =====
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Active Navigation Link Highlighting =====
function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===== Contact Form Validation & Submission =====
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.nombre || !data.email || !data.telefono || !data.pais || !data.tipo || !data.mensaje) {
            alert('Por favor completa todos los campos obligatorios.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Por favor ingresa un email válido.');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        try {
            // Here you can integrate with EmailJS, Formspree, or your backend
            // Example with Formspree (replace with your endpoint):
            // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'Accept': 'application/json'
            //     }
            // });

            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            alert('¡Gracias por contactarnos! Te responderemos pronto.');
            contactForm.reset();

            // Optional: Send to WhatsApp as fallback
            const whatsappMessage = encodeURIComponent(
                `Nuevo contacto:\nNombre: ${data.nombre}\nEmpresa: ${data.empresa || 'N/A'}\nEmail: ${data.email}\nTeléfono: ${data.telefono}\nPaís: ${data.pais}\nTipo: ${data.tipo}\nMensaje: ${data.mensaje}`
            );
            // window.open(`https://api.whatsapp.com/send?phone=50761121304&text=${whatsappMessage}`, '_blank');

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente o contáctanos por WhatsApp.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== Newsletter Form Submission =====
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor ingresa un email válido.');
            return;
        }

        // Show loading state
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Suscribiendo...';
        submitBtn.disabled = true;

        try {
            // Here you can integrate with your email service (Mailchimp, SendGrid, etc.)
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));

            alert('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.');
            newsletterForm.reset();

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al suscribirte. Por favor intenta nuevamente.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== Smooth Scroll Enhancement =====
// Enhance smooth scroll for browsers that don't support CSS scroll-behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for empty hash
        if (href === '#') return;

        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, href);
            }
        }
    });
});

// ===== Advanced Scroll Animations =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered animation classes
            setTimeout(() => {
                entry.target.classList.add('animated');
                
                // Trigger counter animation for stat cards
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target);
                }
            }, index * 100);
            
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe various elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Add animate-on-scroll class to elements
    const animateElements = document.querySelectorAll(
        '.product-card, .testimonial-card, .why-feature, .stat-card, ' +
        '.section-header, .section-header-center, .about-left, .about-right, ' +
        '.contact-method, .form-group'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        
        // Add specific animation class based on element type
        if (el.classList.contains('product-card')) {
            el.style.animationDelay = `${index * 0.1}s`;
        }
        
        scrollObserver.observe(el);
    });
});

// ===== Counter Animation =====
function animateCounter(element) {
    const valueElement = element.querySelector('.stat-value, .customers-count');
    if (!valueElement) return;
    
    const targetText = valueElement.textContent;
    const targetNumber = parseInt(targetText.replace(/\D/g, ''));
    const suffix = targetText.replace(/[0-9]/g, '');
    
    if (isNaN(targetNumber)) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        current = Math.min(Math.floor(increment * step), targetNumber);
        valueElement.textContent = current + suffix;
        
        if (step >= steps) {
            valueElement.textContent = targetText;
            clearInterval(timer);
        }
    }, duration / steps);
}

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroBackground = hero.querySelector('.waves-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
    
    // Parallax for floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        const speed = 0.1 + (index * 0.05);
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Form Input Enhancements =====
// Add floating label effect and validation feedback
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    // Add validation on blur
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#EF4444';
        } else {
            input.style.borderColor = '';
        }
    });

    // Remove error state on input
    input.addEventListener('input', () => {
        input.style.borderColor = '';
    });
});

// ===== Prevent FOUC (Flash of Unstyled Content) =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== Console Branding =====
console.log(
    '%c💼 Macao Internacional ',
    'background: #EF4444; color: white; padding: 8px 16px; border-radius: 4px; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cDistribuidor Oficial WiWU en América Latina',
    'color: #6B7280; font-size: 12px; margin-top: 4px;'
);
console.log(
    '%c🌎 Tecnología sin fronteras',
    'color: #EF4444; font-size: 14px; font-weight: bold; margin-top: 8px;'
);

// ===== Google Analytics (Placeholder) =====
// Uncomment and add your GA tracking ID
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
*/

// ===== 3D Tilt Effect for Cards =====
function addTiltEffect() {
    const tiltElements = document.querySelectorAll('.product-card, .testimonial-card, .stat-card');
    
    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize tilt effect after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addTiltEffect, 1000);
});

// ===== Magnetic Effect for Buttons =====
function addMagneticEffect() {
    const magneticButtons = document.querySelectorAll('.btn-primary, .whatsapp-float, .back-to-top');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize magnetic effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addMagneticEffect, 1000);
});

// ===== Smooth Reveal on Load =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Add entrance animation to hero elements
    const heroElements = document.querySelectorAll('.hero-left > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ===== Interactive Stars Rating =====
const stars = document.querySelectorAll('.star');
if (stars.length > 0) {
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.style.transform = 'scale(1.3) rotate(360deg)';
                    s.style.transition = 'all 0.3s ease';
                }
            });
        });
        
        star.addEventListener('mouseleave', () => {
            stars.forEach(s => {
                s.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    });
}

// ===== Cursor Trail Effect =====
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Only on desktop
    if (window.innerWidth < 768) return;
    
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ===== Page Visibility API - Pause animations when tab is hidden =====
document.addEventListener('visibilitychange', () => {
    const cards = document.querySelectorAll('.floating-card, .product-card');
    
    if (document.hidden) {
        cards.forEach(card => {
            card.style.animationPlayState = 'paused';
        });
    } else {
        cards.forEach(card => {
            card.style.animationPlayState = 'running';
        });
    }
});

// ===== Easter Egg - Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 3s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }
});

// ===== Performance Monitoring =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        
        // Log animation performance
        if (pageLoadTime < 3000) {
            console.log('✨ Animations: Optimal performance');
        } else {
            console.log('⚠️ Consider optimizing animations for better performance');
        }
    });
}

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

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation (uncomment if you want animations)
// document.querySelectorAll('.product-card, .testimonial-card, .why-feature, .stat-card').forEach(el => {
//     observer.observe(el);
// });

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

// ===== Performance Monitoring =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    });
}

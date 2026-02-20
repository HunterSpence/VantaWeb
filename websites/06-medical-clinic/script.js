// Clarity Health - Interactive JavaScript
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileNavigation();
    initScrollAnimations();
    initTestimonialCarousel();
    initAccordions();
    initMultiStepForm();
    initFormValidation();
    initSmoothScrolling();
    initAccessibilityFeatures();
});

// Mobile Navigation
// -----------------
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open on mobile
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.focus();
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll Animations with Intersection Observer
// ---------------------------------------------
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (!animatedElements.length) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Optional: stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Stagger animations for grids
    const serviceCards = document.querySelectorAll('.service-card[data-animate]');
    const featureCards = document.querySelectorAll('.feature[data-animate]');
    const doctorCards = document.querySelectorAll('.doctor-card[data-animate]');
    
    function staggerAnimations(elements) {
        elements.forEach((element, index) => {
            const delay = index * 100; // 100ms stagger
            element.style.animationDelay = `${delay}ms`;
        });
    }
    
    staggerAnimations(serviceCards);
    staggerAnimations(featureCards);
    staggerAnimations(doctorCards);
}

// Testimonial Carousel
// ---------------------
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (!testimonials.length || !dots.length) return;
    
    let currentSlide = 0;
    const totalSlides = testimonials.length;
    let autoplayInterval;
    
    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.setAttribute('aria-pressed', 'false');
        });
        
        // Show current testimonial
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        dots[index].setAttribute('aria-pressed', 'true');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoplay();
            startAutoplay(); // Restart autoplay
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (document.activeElement && document.activeElement.classList.contains('testimonial-dot')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });
    
    // Pause autoplay on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        carousel.addEventListener('focusin', stopAutoplay);
        carousel.addEventListener('focusout', startAutoplay);
    }
    
    // Start autoplay
    startAutoplay();
    
    // Pause when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });
}

// Accordion Functionality
// ------------------------
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = header.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isActive = accordionItem.classList.contains('active');
            
            // Close all other accordion items (if you want only one open at a time)
            // Comment out the next 6 lines if you want multiple items to be open
            const allAccordionItems = document.querySelectorAll('.accordion-item');
            allAccordionItems.forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            accordionItem.classList.toggle('active');
            header.setAttribute('aria-expanded', !isActive);
            
            // Accessibility: announce state change
            if (!isActive) {
                header.setAttribute('aria-label', `${header.textContent} - expanded`);
            } else {
                header.setAttribute('aria-label', `${header.textContent} - collapsed`);
            }
        });
        
        // Keyboard navigation
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });
}

// Multi-step Form
// ---------------
function initMultiStepForm() {
    const form = document.getElementById('appointment-form');
    const steps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    if (!form || !steps.length) return;
    
    let currentStep = 0;
    
    function showStep(stepIndex) {
        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));
        
        // Show current step
        steps[stepIndex].classList.add('active');
        
        // Update progress indicator
        progressDots.forEach((dot, index) => {
            const progressStep = dot.parentElement;
            progressStep.classList.remove('active', 'completed');
            
            if (index < stepIndex) {
                progressStep.classList.add('completed');
            } else if (index === stepIndex) {
                progressStep.classList.add('active');
            }
        });
        
        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Focus on first input in the step
        const firstInput = steps[stepIndex].querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 300);
        }
        
        currentStep = stepIndex;
    }
    
    function validateStep(stepIndex) {
        const step = steps[stepIndex];
        const inputs = step.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            const errorElement = input.parentElement.querySelector('.form-error');
            
            if (!input.value.trim()) {
                input.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'This field is required';
                }
                isValid = false;
            } else {
                input.classList.remove('error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
                
                // Additional validation
                if (input.type === 'email' && !isValidEmail(input.value)) {
                    input.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'Please enter a valid email address';
                    }
                    isValid = false;
                } else if (input.type === 'tel' && !isValidPhone(input.value)) {
                    input.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'Please enter a valid phone number';
                    }
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    // Next button handlers
    nextButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (validateStep(currentStep)) {
                if (currentStep < steps.length - 1) {
                    showStep(currentStep + 1);
                }
            }
        });
    });
    
    // Previous button handlers
    prevButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Show success message or submit data
            showFormConfirmation();
        }
    });
    
    // Initialize first step
    showStep(0);
}

// Form Validation Helpers
// ------------------------
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

function showFormConfirmation() {
    const form = document.getElementById('appointment-form');
    if (!form) return;
    
    const confirmationHTML = `
        <div class="form-confirmation" style="text-align: center; padding: 2rem; background: var(--light-gray); border-radius: var(--radius-lg); margin-top: 2rem;">
            <div style="font-size: 3rem; color: var(--primary-teal); margin-bottom: 1rem;">✅</div>
            <h3 style="color: var(--navy); margin-bottom: 1rem;">Appointment Request Submitted!</h3>
            <p style="color: var(--navy); opacity: 0.8; margin-bottom: 1.5rem;">
                Thank you for choosing Clarity Health. We've received your appointment request and will contact you within 24 hours to confirm your appointment.
            </p>
            <p style="font-size: 0.9rem; color: var(--navy); opacity: 0.7;">
                <strong>Reference Number:</strong> CH-${Date.now()}
            </p>
            <div style="margin-top: 2rem;">
                <a href="index.html" class="btn btn-primary">Return Home</a>
                <a href="patient-resources.html" class="btn btn-secondary" style="margin-left: 1rem;">Patient Resources</a>
            </div>
        </div>
    `;
    
    form.innerHTML = confirmationHTML;
}

// General Form Validation
// ------------------------
function initFormValidation() {
    const forms = document.querySelectorAll('form:not(#appointment-form)');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateInput(input);
            });
            
            input.addEventListener('input', function() {
                // Clear error state when user starts typing
                if (input.classList.contains('error')) {
                    input.classList.remove('error');
                    const errorElement = input.parentElement.querySelector('.form-error');
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                }
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isFormValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isFormValid = false;
                }
            });
            
            if (isFormValid) {
                // Handle form submission
                showGenericFormSuccess(form);
            }
        });
    });
}

function validateInput(input) {
    const errorElement = input.parentElement.querySelector('.form-error');
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    // Email validation
    else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    // Phone validation
    else if (input.type === 'tel' && input.value && !isValidPhone(input.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }
    // Minimum length validation
    else if (input.hasAttribute('minlength')) {
        const minLength = parseInt(input.getAttribute('minlength'));
        if (input.value.length < minLength) {
            isValid = false;
            errorMessage = `Minimum ${minLength} characters required`;
        }
    }
    
    // Update UI
    if (isValid) {
        input.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    } else {
        input.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    }
    
    return isValid;
}

function showGenericFormSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <div style="background: var(--primary-teal); color: var(--white); padding: 1rem; border-radius: var(--radius-md); text-align: center; margin-bottom: 1rem;">
            <strong>✅ Success!</strong> Your message has been sent. We'll get back to you soon.
        </div>
    `;
    
    form.insertBefore(successMessage, form.firstChild);
    form.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Smooth Scrolling
// ----------------
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just #
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const offset = 80; // Account for fixed header
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update focus for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        });
    });
}

// Accessibility Features
// ----------------------
function initAccessibilityFeatures() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Keyboard navigation for custom elements
    const customButtons = document.querySelectorAll('[role="button"]:not(button)');
    customButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    // Enhanced focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Announce page changes for screen readers
    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
        pageTitle.setAttribute('aria-live', 'polite');
    }
    
    // High contrast mode detection
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
    
    // Reduced motion preferences
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

// Utility Functions
// -----------------

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            }, function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (loadTime > 3000) {
            console.warn('Page load time is slower than recommended:', loadTime + 'ms');
        }
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error occurred:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Intersection Observer polyfill fallback
if (!window.IntersectionObserver) {
    // Simple fallback - just add animate class to all elements
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
        element.classList.add('animate');
    });
}
// ================================================
// MAIN JAVASCRIPT FILE - STEELE & ASSOCIATES
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initSmoothScroll();
    initHeaderScroll();
    initFormValidation();
    initAccordions();
    initTestimonialSlider();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// ================================================
// MOBILE MENU FUNCTIONALITY
// ================================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        const isActive = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', !isActive);
        
        // Animate hamburger lines
        const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
        if (!isActive) {
            lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            lines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isActive ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            // Reset hamburger lines
            const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
            lines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
            lines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        }
    });
}

// ================================================
// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// ================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create intersection observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation if element has counter
                const counters = entry.target.querySelectorAll('.stat-number[data-target]');
                counters.forEach(counter => animateCounter(counter));
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with slide-up class
    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(element => {
        observer.observe(element);
    });
    
    // Handle fade-in elements
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// ================================================
// ANIMATED COUNTERS
// ================================================
function initCounters() {
    // Counters are triggered by intersection observer in initScrollAnimations
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            // Add + or % if needed
            const label = element.nextElementSibling?.textContent.toLowerCase();
            if (label && (label.includes('satisfaction') || label.includes('success'))) {
                element.textContent = target + '%';
            } else if (target >= 100) {
                element.textContent = target + '+';
            }
        }
    };
    
    // Start animation
    requestAnimationFrame(updateCounter);
}

// ================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================================
function initSmoothScroll() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================================
// HEADER SCROLL EFFECTS
// ================================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// ================================================
// FORM VALIDATION
// ================================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            // Clear previous errors
            form.querySelectorAll('.error').forEach(error => error.remove());
            form.querySelectorAll('.field-error').forEach(field => field.classList.remove('field-error'));
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                } else if (field.type === 'email' && !isValidEmail(field.value)) {
                    isValid = false;
                    showFieldError(field, 'Please enter a valid email address');
                } else if (field.type === 'tel' && !isValidPhone(field.value)) {
                    isValid = false;
                    showFieldError(field, 'Please enter a valid phone number');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                const firstError = form.querySelector('.field-error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        // Real-time validation
        form.addEventListener('input', function(e) {
            const field = e.target;
            if (field.classList.contains('field-error')) {
                validateField(field);
            }
        });
    });
}

function showFieldError(field, message) {
    field.classList.add('field-error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

function validateField(field) {
    let isValid = true;
    let message = '';
    
    if (field.required && !field.value.trim()) {
        isValid = false;
        message = 'This field is required';
    } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        isValid = false;
        message = 'Please enter a valid email address';
    } else if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
        isValid = false;
        message = 'Please enter a valid phone number';
    }
    
    // Remove existing error
    const existingError = field.parentNode.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }
    
    if (isValid) {
        field.classList.remove('field-error');
    } else {
        field.classList.add('field-error');
        showFieldError(field, message);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ================================================
// ACCORDION FUNCTIONALITY
// ================================================
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentNode;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isActive = accordionItem.classList.contains('active');
            
            // Close all other accordions in the same group
            const accordionGroup = accordionItem.closest('.accordion-group');
            if (accordionGroup) {
                accordionGroup.querySelectorAll('.accordion-item.active').forEach(item => {
                    if (item !== accordionItem) {
                        item.classList.remove('active');
                        const content = item.querySelector('.accordion-content');
                        content.style.maxHeight = '0';
                    }
                });
            }
            
            // Toggle current accordion
            accordionItem.classList.toggle('active');
            
            if (!isActive) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = '0';
            }
            
            // Update ARIA attributes
            const expanded = accordionItem.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
        });
        
        // Initialize ARIA attributes
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        
        // Handle keyboard navigation
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ================================================
// TESTIMONIAL SLIDER (if needed on testimonials page)
// ================================================
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider-container');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimonial-slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const indicators = slider.querySelectorAll('.slider-indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    if (totalSlides <= 1) return;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play
    setInterval(nextSlide, 5000);
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    slider.addEventListener('touchend', e => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const difference = startX - endX;
        const minSwipeDistance = 50;
        
        if (Math.abs(difference) > minSwipeDistance) {
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
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
    }
}

// Get viewport height accounting for mobile browsers
function getViewportHeight() {
    return window.visualViewport ? window.visualViewport.height : window.innerHeight;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight = getViewportHeight();
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= viewportHeight &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ================================================
// PAGE-SPECIFIC FUNCTIONALITY
// ================================================

// Handle page-specific features
function initPageSpecific() {
    const bodyClass = document.body.className;
    
    if (bodyClass.includes('practice-areas')) {
        initPracticeAreaDetails();
    }
    
    if (bodyClass.includes('team')) {
        initTeamFilters();
    }
    
    if (bodyClass.includes('contact')) {
        initContactMap();
    }
}

function initPracticeAreaDetails() {
    // Expand/collapse functionality for practice area details
    const detailButtons = document.querySelectorAll('.detail-toggle');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            details.style.display = isExpanded ? 'none' : 'block';
            this.textContent = isExpanded ? 'Read More' : 'Read Less';
        });
    });
}

function initTeamFilters() {
    // Filter team members by practice area
    const filterButtons = document.querySelectorAll('.team-filter');
    const teamMembers = document.querySelectorAll('.team-member');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter team members
            teamMembers.forEach(member => {
                const practices = member.getAttribute('data-practices');
                
                if (filter === 'all' || practices.includes(filter)) {
                    member.style.display = 'block';
                    member.classList.add('fade-in');
                } else {
                    member.style.display = 'none';
                }
            });
        });
    });
}

function initContactMap() {
    // Initialize map if Google Maps API is available
    if (typeof google !== 'undefined' && google.maps) {
        const mapElement = document.getElementById('contact-map');
        if (mapElement) {
            const map = new google.maps.Map(mapElement, {
                zoom: 15,
                center: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates
                styles: [
                    // Custom map styling to match brand colors
                    {
                        featureType: 'all',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#1b2a4a' }]
                    }
                ]
            });
            
            const marker = new google.maps.Marker({
                position: { lat: 40.7128, lng: -74.0060 },
                map: map,
                title: 'Steele & Associates'
            });
        }
    }
}

// Initialize page-specific functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', initPageSpecific);

// ================================================
// PERFORMANCE OPTIMIZATION
// ================================================

// Lazy load images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Call lazy loading on DOM ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// ================================================
// ACCESSIBILITY ENHANCEMENTS
// ================================================

// Skip link functionality
function initSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.focus();
                targetElement.scrollIntoView();
            }
        });
    }
}

// Keyboard navigation for custom elements
function initKeyboardNavigation() {
    // Add keyboard support for custom interactive elements
    document.querySelectorAll('[data-keyboard]').forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    initSkipLink();
    initKeyboardNavigation();
});

// ================================================
// ERROR HANDLING & FALLBACKS
// ================================================

// Handle JavaScript errors gracefully
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could send error to analytics or logging service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// Fallback for browsers without IntersectionObserver
if (!window.IntersectionObserver) {
    // Polyfill or fallback behavior
    document.querySelectorAll('.slide-up').forEach(el => {
        el.classList.add('visible');
    });
    
    // Trigger counters immediately
    document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
        animateCounter(counter);
    });
}

// CSS variables fallback for older browsers
function initCSSFallbacks() {
    if (!window.CSS || !CSS.supports('color', 'var(--fake-var)')) {
        // Add fallback styles for older browsers
        const fallbackStyles = `
            .hero { background-color: #1b2a4a; }
            .btn-primary { background-color: #b8860b; }
            .footer { background-color: #1b2a4a; }
        `;
        
        const style = document.createElement('style');
        style.textContent = fallbackStyles;
        document.head.appendChild(style);
    }
}

document.addEventListener('DOMContentLoaded', initCSSFallbacks);
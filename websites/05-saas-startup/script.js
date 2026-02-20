// FlowStack - JavaScript Functionality
class FlowStack {
  constructor() {
    this.init();
  }

  init() {
    this.setupThemeToggle();
    this.setupMobileMenu();
    this.setupScrollEffects();
    this.setupAnimatedCounters();
    this.setupPricingToggle();
    this.setupFAQAccordion();
    this.setupFeatureTabs();
    this.setupIntegrationsFilter();
    this.setupFormHandling();
    this.setupSmoothScroll();
    this.setupIntersectionObserver();
    this.setupFloatingElements();
    this.setupEmailValidation();
    this.initializePage();
  }

  // Theme Toggle Functionality
  setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme or default to system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (prefersDark.matches ? 'dark' : 'light');
    
    // Apply theme
    this.setTheme(savedTheme);
    
    // Toggle event listener
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }

    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', 
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  // Mobile Menu
  setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('open');
        mobileMenu.classList.toggle('open');
        mobileToggle.innerHTML = isOpen ? '☰' : '✕';
        mobileToggle.setAttribute('aria-expanded', !isOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
      });

      // Close menu when clicking on a link
      const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          mobileToggle.innerHTML = '☰';
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = 'auto';
        });
      });
    }
  }

  // Scroll Effects
  setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (header) {
        // Add scrolled class for styling
        if (currentScrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
      }

      lastScrollY = currentScrollY;
    });
  }

  // Animated Counters
  setupAnimatedCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const socialProofCounter = document.querySelector('.social-proof-counter');
    
    const animateCounter = (element, target, suffix = '') => {
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.floor(current).toLocaleString() + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target.toLocaleString() + suffix;
        }
      };
      
      updateCounter();
    };

    // Observe counters and animate when in view
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          const target = parseInt(entry.target.getAttribute('data-counter'));
          const suffix = entry.target.getAttribute('data-suffix') || '';
          animateCounter(entry.target, target, suffix);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });

    // Social proof counter
    if (socialProofCounter) {
      counterObserver.observe(socialProofCounter);
      socialProofCounter.setAttribute('data-counter', '10000');
      socialProofCounter.setAttribute('data-suffix', '+');
    }
  }

  // Pricing Toggle
  setupPricingToggle() {
    const billingOptions = document.querySelectorAll('.billing-option');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    billingOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove active class from all options
        billingOptions.forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked option
        option.classList.add('active');
        
        const isAnnual = option.getAttribute('data-billing') === 'annual';
        
        // Update pricing
        pricingCards.forEach(card => {
          const monthlyPrice = card.getAttribute('data-monthly');
          const annualPrice = card.getAttribute('data-annual');
          const priceElement = card.querySelector('.price-amount');
          
          if (priceElement && monthlyPrice && annualPrice) {
            const price = isAnnual ? annualPrice : monthlyPrice;
            priceElement.textContent = price === '0' ? 'Free' : `$${price}`;
          }
        });
        
        // Show/hide savings badge
        const savingsBadges = document.querySelectorAll('.savings-badge');
        savingsBadges.forEach(badge => {
          badge.style.display = isAnnual ? 'inline' : 'none';
        });
      });
    });
  }

  // FAQ Accordion
  setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (question && answer) {
        question.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          
          // Close all other FAQ items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('open');
              const otherAnswer = otherItem.querySelector('.faq-answer');
              if (otherAnswer) {
                otherAnswer.style.maxHeight = '0';
              }
            }
          });
          
          // Toggle current item
          item.classList.toggle('open');
          
          if (isOpen) {
            answer.style.maxHeight = '0';
          } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        });
      }
    });
  }

  // Feature Tabs
  setupFeatureTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // Integrations Filter
  setupIntegrationsFilter() {
    const searchInput = document.querySelector('.search-input');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const integrationCards = document.querySelectorAll('.integration-card');
    
    // Search functionality
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        this.filterIntegrations(searchTerm, this.getCurrentCategory());
      });
    }
    
    // Category filter functionality
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        this.filterIntegrations(searchTerm, category);
      });
    });
  }

  getCurrentCategory() {
    const activeButton = document.querySelector('.category-btn.active');
    return activeButton ? activeButton.getAttribute('data-category') : 'all';
  }

  filterIntegrations(searchTerm, category) {
    const integrationCards = document.querySelectorAll('.integration-card');
    
    integrationCards.forEach(card => {
      const name = card.querySelector('.integration-name').textContent.toLowerCase();
      const description = card.querySelector('.integration-description').textContent.toLowerCase();
      const cardCategory = card.getAttribute('data-category');
      
      const matchesSearch = searchTerm === '' || 
                           name.includes(searchTerm) || 
                           description.includes(searchTerm);
      const matchesCategory = category === 'all' || cardCategory === category;
      
      if (matchesSearch && matchesCategory) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.3s ease-in';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Form Handling
  setupFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    });
  }

  handleFormSubmit(form) {
    const formData = new FormData(form);
    const formType = form.getAttribute('data-form-type') || 'contact';
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Show success message
      this.showFormMessage(form, 'Message sent successfully!', 'success');
      
      // Reset form
      form.reset();
      
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      
      // Track form submission
      this.trackEvent('form_submit', { form_type: formType });
    }, 1500);
  }

  showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 0.5rem;
      font-weight: 500;
      ${type === 'success' ? 
        'background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' : 
        'background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;'
      }
    `;
    
    form.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  // Email Validation
  setupEmailValidation() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateEmail(input);
      });
      
      input.addEventListener('input', () => {
        // Clear validation message on input
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
          errorMessage.remove();
        }
        input.classList.remove('error');
      });
    });
  }

  validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    if (email && !emailRegex.test(email)) {
      input.classList.add('error');
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.textContent = 'Please enter a valid email address';
      errorMessage.style.cssText = `
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      `;
      input.parentNode.appendChild(errorMessage);
    } else {
      input.classList.remove('error');
    }
  }

  // Smooth Scroll
  setupSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Intersection Observer for Animations
  setupIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.glass-card, .feature-card, .testimonial-card, .blog-card, .integration-card');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(element => {
      // Set initial state
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      observer.observe(element);
    });
  }

  // Floating Elements Animation
  setupFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-ui-mockup');
    
    // Add floating animation with random delays
    floatingElements.forEach((element, index) => {
      const delay = Math.random() * 2; // Random delay between 0-2 seconds
      const duration = 8 + Math.random() * 4; // Random duration between 8-12 seconds
      
      element.style.animationDelay = `${delay}s`;
      element.style.animationDuration = `${duration}s`;
    });
  }

  // Page Initialization
  initializePage() {
    // Set active navigation item based on current page
    this.setActiveNavigation();
    
    // Initialize tooltips
    this.setupTooltips();
    
    // Setup keyboard navigation
    this.setupKeyboardNavigation();
    
    // Track page view
    this.trackEvent('page_view', { page: window.location.pathname });
  }

  setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setupTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        const tooltipText = e.target.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.cssText = `
          position: absolute;
          background: var(--color-dark);
          color: var(--color-white);
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          white-space: nowrap;
          z-index: 1000;
          pointer-events: none;
          opacity: 0;
          transform: translateY(-5px);
          transition: opacity 0.2s, transform 0.2s;
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = e.target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        tooltip.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
        tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;
        
        // Show tooltip
        setTimeout(() => {
          tooltip.style.opacity = '1';
          tooltip.style.transform = 'translateY(0)';
        }, 10);
        
        e.target._tooltip = tooltip;
      });
      
      element.addEventListener('mouseleave', (e) => {
        if (e.target._tooltip) {
          e.target._tooltip.remove();
          delete e.target._tooltip;
        }
      });
    });
  }

  setupKeyboardNavigation() {
    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          mobileToggle.innerHTML = '☰';
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = 'auto';
        }
      }
    });
    
    // Focus management for modals and dropdowns
    const focusableElements = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const mobileMenu = document.querySelector('.mobile-menu.open');
        if (mobileMenu) {
          const focusable = mobileMenu.querySelectorAll(focusableElements);
          const firstFocusable = focusable[0];
          const lastFocusable = focusable[focusable.length - 1];
          
          if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });
  }

  // Analytics/Tracking (placeholder)
  trackEvent(eventName, parameters = {}) {
    // Replace with your analytics service (Google Analytics, Mixpanel, etc.)
    console.log('Track Event:', eventName, parameters);
    
    // Example: Google Analytics 4
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', eventName, parameters);
    // }
  }

  // Utility Functions
  debounce(func, wait) {
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

  throttle(func, limit) {
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

  // Performance optimization
  requestIdleCallback(callback) {
    if (window.requestIdleCallback) {
      return window.requestIdleCallback(callback);
    } else {
      return setTimeout(callback, 1);
    }
  }
}

// Additional CSS for dynamic elements
const dynamicStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .form-message {
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from { transform: translateY(-10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .tooltip {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .error {
    border-color: #dc2626 !important;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
  }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Initialize FlowStack when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new FlowStack());
} else {
  new FlowStack();
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FlowStack;
}
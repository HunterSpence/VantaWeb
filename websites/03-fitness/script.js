// APEX Athletics - JavaScript Functionality
// VantaWeb Portfolio Project

class ApexAthletics {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeAnimations();
    this.initializeCounters();
    this.initializeFilters();
    this.initializeFAQ();
    this.initializeMobileMenu();
    this.initializeScrollEffects();
    this.initializeFormValidation();
    this.setActiveNavLink();
  }

  setupEventListeners() {
    // DOM Content Loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    }

    // Window events
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('load', this.handleLoad.bind(this));
  }

  // Mobile Menu Functionality
  initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileToggle || !navMenu) return;

    // Toggle menu
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Toggle icon
      const icon = mobileToggle.querySelector('i') || mobileToggle;
      if (navMenu.classList.contains('active')) {
        icon.innerHTML = '✕';
      } else {
        icon.innerHTML = '☰';
      }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i') || mobileToggle;
        icon.innerHTML = '☰';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i') || mobileToggle;
        icon.innerHTML = '☰';
      }
    });
  }

  // Scroll Effects
  handleScroll() {
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Trigger animations on scroll
    this.animateOnScroll();
  }

  handleResize() {
    // Handle responsive adjustments
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768 && navMenu) {
      navMenu.classList.remove('active');
    }
  }

  handleLoad() {
    // Page fully loaded
    this.initializeCounters();
  }

  // Intersection Observer for Animations
  initializeAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          
          // Trigger specific animations
          if (entry.target.classList.contains('stats-container')) {
            this.animateCounters();
          }
          if (entry.target.classList.contains('pricing-table')) {
            this.animatePricingCards();
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      '.stats-container, .card, .pricing-card, .section-header, .hero-content'
    );
    
    animateElements.forEach(el => {
      observer.observe(el);
    });
  }

  // Animate elements on scroll
  animateOnScroll() {
    const elements = document.querySelectorAll('.card, .stat-item, .pricing-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // Animated Number Counters
  initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      counter.style.opacity = '0';
    });
  }

  animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      if (counter.classList.contains('animated')) return;
      
      counter.style.opacity = '1';
      const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/\D/g, ''));
      const suffix = counter.textContent.replace(/\d/g, '');
      let current = 0;
      const increment = target / 100;
      const duration = 2000;
      const stepTime = duration / 100;

      counter.classList.add('animated');

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current) + suffix;
          setTimeout(updateCounter, stepTime);
        } else {
          counter.textContent = target + suffix;
        }
      };

      updateCounter();
    });
  }

  // Pricing Cards Animation
  animatePricingCards() {
    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, index * 200);
    });
  }

  // Class Filter Functionality
  initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const classCards = document.querySelectorAll('.class-card');

    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter cards
        classCards.forEach(card => {
          if (filter === 'all' || card.classList.contains(filter)) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // FAQ Accordion
  initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (question && answer) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all other FAQ items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherAnswer = otherItem.querySelector('.faq-answer');
              if (otherAnswer) {
                otherAnswer.classList.remove('active');
              }
            }
          });
          
          // Toggle current item
          if (isActive) {
            item.classList.remove('active');
            answer.classList.remove('active');
          } else {
            item.classList.add('active');
            answer.classList.add('active');
          }
        });
      }
    });
  }

  // Form Validation
  initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            this.showInputError(input, 'This field is required');
          } else {
            this.clearInputError(input);
            
            // Email validation
            if (input.type === 'email') {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(input.value)) {
                isValid = false;
                this.showInputError(input, 'Please enter a valid email');
              }
            }
            
            // Phone validation
            if (input.type === 'tel') {
              const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
              if (!phoneRegex.test(input.value.replace(/\s/g, ''))) {
                isValid = false;
                this.showInputError(input, 'Please enter a valid phone number');
              }
            }
          }
        });
        
        if (isValid) {
          this.handleFormSubmission(form);
        }
      });
    });
  }

  showInputError(input, message) {
    this.clearInputError(input);
    
    input.style.borderColor = 'var(--red-accent)';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--red-accent)';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '0.5rem';
    
    input.parentNode.appendChild(errorElement);
  }

  clearInputError(input) {
    input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    
    const existingError = input.parentNode.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
  }

  handleFormSubmission(form) {
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
      <div style="background: var(--electric-lime); color: var(--jet-black); padding: 1rem; border-radius: 5px; margin: 1rem 0; text-align: center; font-weight: 600;">
        ✓ Thank you! We'll contact you soon to get started on your fitness journey!
      </div>
    `;
    
    form.appendChild(successMessage);
    form.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

  // Set active navigation link based on current page
  setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // Smooth scrolling for anchor links
  initializeScrollEffects() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100; // Account for fixed header
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Schedule Table Interactions
  initializeSchedule() {
    const classSlots = document.querySelectorAll('.class-slot');
    
    classSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        const className = slot.textContent;
        const time = slot.getAttribute('data-time');
        const instructor = slot.getAttribute('data-instructor');
        
        // Show class details modal or redirect to booking
        this.showClassDetails(className, time, instructor);
      });
    });
  }

  showClassDetails(className, time, instructor) {
    // Simple alert for demo - in production would show a modal
    alert(`Book ${className} class\nTime: ${time}\nInstructor: ${instructor}\n\nClick OK to proceed to booking!`);
  }

  // Parallax Effect for Hero Section
  initializeParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Image Lazy Loading
  initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Intensity Bar Animation
  animateIntensityBars() {
    const intensityContainers = document.querySelectorAll('.intensity-bars');
    
    intensityContainers.forEach(container => {
      const bars = container.querySelectorAll('.intensity-bar');
      const level = parseInt(container.getAttribute('data-level') || 3);
      
      bars.forEach((bar, index) => {
        setTimeout(() => {
          if (index < level) {
            bar.classList.add('active');
          }
        }, index * 100);
      });
    });
  }

  // Progress Bar Animation
  animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress') || 0;
      const progressFill = bar.querySelector('.progress-fill');
      
      if (progressFill) {
        setTimeout(() => {
          progressFill.style.width = progress + '%';
        }, 500);
      }
    });
  }

  // Testimonial Slider (if implemented)
  initializeTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.testimonial-slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    
    let currentSlide = 0;
    
    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    };
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        showSlide(currentSlide);
      });
    }
    
    // Auto-play
    setInterval(() => {
      currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
      showSlide(currentSlide);
    }, 5000);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new ApexAthletics();
});

// Additional utility functions
const utils = {
  // Format phone number
  formatPhone: (phone) => {
    return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  },
  
  // Validate email
  isValidEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Get random fitness image
  getRandomFitnessImage: (width = 400, height = 300, seed = null) => {
    const seedParam = seed ? `&random=${seed}` : '';
    return `https://picsum.photos/${width}/${height}?category=sports${seedParam}`;
  }
};

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ApexAthletics, utils };
}
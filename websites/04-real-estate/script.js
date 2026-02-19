/* ===================================================================
   MERIDIAN PROPERTIES - JAVASCRIPT
   Luxury Real Estate Website Interactive Features
   =================================================================== */

// ===================================================================
// GLOBAL STATE AND UTILITIES
// ===================================================================

const MeridianApp = {
  // Application state
  state: {
    currentSlide: 0,
    isMenuOpen: false,
    currentGallerySlide: 0,
    properties: [],
    filteredProperties: [],
    filters: {
      priceRange: 'all',
      bedrooms: 'all',
      location: 'all',
      propertyType: 'all'
    }
  },

  // Utility functions
  utils: {
    // Debounce function for performance
    debounce: function(func, wait) {
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

    // Format currency
    formatCurrency: function(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    },

    // Format number with commas
    formatNumber: function(num) {
      return new Intl.NumberFormat('en-US').format(num);
    },

    // Get element by ID safely
    getElementById: function(id) {
      const element = document.getElementById(id);
      if (!element) {
        console.warn(`Element with ID '${id}' not found`);
      }
      return element;
    },

    // Smooth scroll to element
    scrollToElement: function(element, offset = 80) {
      if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  }
};

// ===================================================================
// DOM READY AND INITIALIZATION
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Meridian Properties - Website Loaded');
  
  // Initialize all features
  MeridianApp.init();
});

// ===================================================================
// MAIN INITIALIZATION
// ===================================================================

MeridianApp.init = function() {
  this.initNavigation();
  this.initHeroSlideshow();
  this.initScrollAnimations();
  this.initPropertyFilters();
  this.initSearchFunctionality();
  this.initPropertyGallery();
  this.initMortgageCalculator();
  this.initFormValidation();
  this.initScrollEffects();
  this.generateSampleProperties();
};

// ===================================================================
// NAVIGATION AND MOBILE MENU
// ===================================================================

MeridianApp.initNavigation = function() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMain = document.querySelector('.nav-main');
  const navLinks = document.querySelectorAll('.nav-main a');
  const header = document.querySelector('.header');

  // Mobile menu toggle
  if (mobileToggle && navMain) {
    mobileToggle.addEventListener('click', () => {
      this.state.isMenuOpen = !this.state.isMenuOpen;
      navMain.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = this.state.isMenuOpen ? 'hidden' : '';
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMain.classList.remove('active');
        mobileToggle.classList.remove('active');
        this.state.isMenuOpen = false;
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.state.isMenuOpen && !navMain.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMain.classList.remove('active');
        mobileToggle.classList.remove('active');
        this.state.isMenuOpen = false;
        document.body.style.overflow = '';
      }
    });
  }

  // Header scroll effect
  if (header) {
    window.addEventListener('scroll', this.utils.debounce(() => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, 10));
  }

  // Active nav link highlighting
  this.updateActiveNavLink();
  window.addEventListener('scroll', this.utils.debounce(() => {
    this.updateActiveNavLink();
  }, 100));
};

MeridianApp.updateActiveNavLink = function() {
  const sections = document.querySelectorAll('section[id], main[id]');
  const navLinks = document.querySelectorAll('.nav-main a[href^="#"], .nav-main a[href$=".html"]');
  
  let current = '';
  const scrollPosition = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (href === `#${current}` || 
        (href === 'index.html' && window.location.pathname.includes('index')) ||
        (href.includes(window.location.pathname.split('/').pop()))) {
      link.classList.add('active');
    }
  });
};

// ===================================================================
// HERO SLIDESHOW
// ===================================================================

MeridianApp.initHeroSlideshow = function() {
  const slideshow = document.querySelector('.hero-slideshow');
  if (!slideshow) return;

  const slides = [
    'https://picsum.photos/1920/1080?random=1&auto=format&fit=crop&w=1920&h=1080',
    'https://picsum.photos/1920/1080?random=2&auto=format&fit=crop&w=1920&h=1080',
    'https://picsum.photos/1920/1080?random=3&auto=format&fit=crop&w=1920&h=1080'
  ];

  // Create slide elements
  slides.forEach((imageUrl, index) => {
    const slide = document.createElement('div');
    slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
    slide.style.backgroundImage = `url(${imageUrl})`;
    slideshow.appendChild(slide);
  });

  // Auto-rotate slides
  setInterval(() => {
    this.nextSlide();
  }, 5000);

  // Optional: Add slide indicators
  this.createSlideIndicators();
};

MeridianApp.nextSlide = function() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;

  slides[this.state.currentSlide].classList.remove('active');
  this.state.currentSlide = (this.state.currentSlide + 1) % slides.length;
  slides[this.state.currentSlide].classList.add('active');

  // Update indicators if they exist
  const indicators = document.querySelectorAll('.slide-indicator');
  if (indicators.length > 0) {
    indicators.forEach(indicator => indicator.classList.remove('active'));
    if (indicators[this.state.currentSlide]) {
      indicators[this.state.currentSlide].classList.add('active');
    }
  }
};

MeridianApp.createSlideIndicators = function() {
  const hero = document.querySelector('.hero');
  const slides = document.querySelectorAll('.hero-slide');
  if (!hero || slides.length <= 1) return;

  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'slide-indicators';
  indicatorsContainer.style.cssText = `
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    z-index: 10;
  `;

  slides.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.className = `slide-indicator ${index === 0 ? 'active' : ''}`;
    indicator.style.cssText = `
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.5);
      background: ${index === 0 ? 'rgba(255, 255, 255, 0.8)' : 'transparent'};
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    
    indicator.addEventListener('click', () => {
      this.goToSlide(index);
    });

    indicatorsContainer.appendChild(indicator);
  });

  hero.appendChild(indicatorsContainer);
};

MeridianApp.goToSlide = function(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.slide-indicator');
  
  if (slides.length === 0 || index >= slides.length) return;

  slides[this.state.currentSlide].classList.remove('active');
  indicators[this.state.currentSlide]?.classList.remove('active');
  
  this.state.currentSlide = index;
  
  slides[this.state.currentSlide].classList.add('active');
  indicators[this.state.currentSlide]?.classList.add('active');
};

// ===================================================================
// SCROLL ANIMATIONS
// ===================================================================

MeridianApp.initScrollAnimations = function() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Add animation classes to elements that should animate
  this.addScrollAnimationClasses();
};

MeridianApp.addScrollAnimationClasses = function() {
  // Add animate-on-scroll class to property cards
  document.querySelectorAll('.property-card').forEach(card => {
    card.classList.add('animate-on-scroll');
  });

  // Add to section headings
  document.querySelectorAll('section h2, section h3').forEach(heading => {
    heading.classList.add('animate-on-scroll');
  });

  // Add to other content sections
  document.querySelectorAll('.agent-card, .neighborhood-card, .testimonial').forEach(el => {
    el.classList.add('animate-on-scroll');
  });
};

// ===================================================================
// SCROLL EFFECTS (PARALLAX, ETC.)
// ===================================================================

MeridianApp.initScrollEffects = function() {
  window.addEventListener('scroll', this.utils.debounce(() => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }, 10));
};

// ===================================================================
// PROPERTY FILTERING
// ===================================================================

MeridianApp.initPropertyFilters = function() {
  const filterInputs = document.querySelectorAll('.filter-sidebar input, .filter-sidebar select');
  
  filterInputs.forEach(input => {
    input.addEventListener('change', () => {
      this.updateFilters();
      this.filterProperties();
    });
  });

  // Initialize filters
  this.updateFilters();
};

MeridianApp.updateFilters = function() {
  const priceRange = document.getElementById('price-range')?.value || 'all';
  const bedrooms = document.getElementById('bedrooms-filter')?.value || 'all';
  const location = document.getElementById('location-filter')?.value || 'all';
  const propertyType = document.getElementById('property-type-filter')?.value || 'all';

  this.state.filters = {
    priceRange,
    bedrooms,
    location,
    propertyType
  };
};

MeridianApp.filterProperties = function() {
  if (this.state.properties.length === 0) return;

  this.state.filteredProperties = this.state.properties.filter(property => {
    const filters = this.state.filters;
    
    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max && (property.price < min || property.price > max)) return false;
      if (!max && property.price < min) return false;
    }
    
    // Bedrooms filter
    if (filters.bedrooms !== 'all' && property.bedrooms != filters.bedrooms) {
      return false;
    }
    
    // Location filter
    if (filters.location !== 'all' && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Property type filter
    if (filters.propertyType !== 'all' && property.type !== filters.propertyType) {
      return false;
    }
    
    return true;
  });

  this.renderProperties();
};

MeridianApp.renderProperties = function() {
  const propertyGrid = document.querySelector('.property-grid');
  if (!propertyGrid) return;

  const propertiesToShow = this.state.filteredProperties.length > 0 
    ? this.state.filteredProperties 
    : this.state.properties;

  propertyGrid.innerHTML = propertiesToShow.map(property => 
    this.createPropertyCard(property)
  ).join('');

  // Re-add animation classes
  propertyGrid.querySelectorAll('.property-card').forEach(card => {
    card.classList.add('animate-on-scroll');
  });

  // Re-initialize scroll animations for new elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  propertyGrid.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
};

MeridianApp.createPropertyCard = function(property) {
  return `
    <div class="property-card" onclick="window.location.href='property.html?id=${property.id}'">
      <div class="property-image">
        <img src="${property.image}" alt="${property.title}" loading="lazy">
        <div class="property-price">${this.utils.formatCurrency(property.price)}</div>
      </div>
      <div class="property-info">
        <div class="property-address">${property.address}</div>
        <h3 class="property-title">${property.title}</h3>
        <div class="property-details">
          <div class="property-detail">
            <span>🛏️</span>
            <span>${property.bedrooms} beds</span>
          </div>
          <div class="property-detail">
            <span>🛁</span>
            <span>${property.bathrooms} baths</span>
          </div>
          <div class="property-detail">
            <span>📐</span>
            <span>${this.utils.formatNumber(property.sqft)} sqft</span>
          </div>
        </div>
      </div>
    </div>
  `;
};

// ===================================================================
// SEARCH FUNCTIONALITY
// ===================================================================

MeridianApp.initSearchFunctionality = function() {
  const searchForm = document.querySelector('.search-bar');
  const searchButton = document.querySelector('.search-btn');
  
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.performSearch();
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.performSearch();
    });
  }
};

MeridianApp.performSearch = function() {
  const location = document.getElementById('search-location')?.value || '';
  const priceRange = document.getElementById('search-price')?.value || '';
  const bedrooms = document.getElementById('search-bedrooms')?.value || '';
  const propertyType = document.getElementById('search-type')?.value || '';

  // If we're not on the listings page, redirect there with parameters
  if (!window.location.pathname.includes('listings.html')) {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (priceRange) params.append('price', priceRange);
    if (bedrooms) params.append('bedrooms', bedrooms);
    if (propertyType) params.append('type', propertyType);
    
    window.location.href = `listings.html?${params.toString()}`;
    return;
  }

  // Apply search filters
  this.state.filters = {
    location: location.toLowerCase(),
    priceRange: priceRange,
    bedrooms: bedrooms,
    propertyType: propertyType
  };

  this.filterProperties();
};

// ===================================================================
// PROPERTY GALLERY
// ===================================================================

MeridianApp.initPropertyGallery = function() {
  const gallery = document.querySelector('.property-gallery');
  if (!gallery) return;

  const galleryImages = [
    'https://picsum.photos/800/600?random=10&auto=format&fit=crop&w=800&h=600',
    'https://picsum.photos/800/600?random=11&auto=format&fit=crop&w=800&h=600',
    'https://picsum.photos/800/600?random=12&auto=format&fit=crop&w=800&h=600',
    'https://picsum.photos/800/600?random=13&auto=format&fit=crop&w=800&h=600',
    'https://picsum.photos/800/600?random=14&auto=format&fit=crop&w=800&h=600'
  ];

  this.setupGallery(gallery, galleryImages);
};

MeridianApp.setupGallery = function(gallery, images) {
  const galleryMain = gallery.querySelector('.gallery-main');
  const galleryNav = gallery.querySelector('.gallery-nav');
  
  if (!galleryMain) return;

  // Create slides
  galleryMain.innerHTML = images.map((imageUrl, index) => `
    <div class="gallery-slide ${index === 0 ? 'active' : ''}">
      <img src="${imageUrl}" alt="Property Image ${index + 1}" loading="lazy">
    </div>
  `).join('');

  // Create navigation dots
  if (galleryNav) {
    galleryNav.innerHTML = images.map((_, index) => `
      <button class="gallery-nav-dot ${index === 0 ? 'active' : ''}" 
              onclick="MeridianApp.goToGallerySlide(${index})">
      </button>
    `).join('');
  }

  // Auto-advance gallery
  setInterval(() => {
    this.nextGallerySlide();
  }, 4000);
};

MeridianApp.nextGallerySlide = function() {
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('.gallery-nav-dot');
  
  if (slides.length === 0) return;

  slides[this.state.currentGallerySlide].classList.remove('active');
  dots[this.state.currentGallerySlide]?.classList.remove('active');
  
  this.state.currentGallerySlide = (this.state.currentGallerySlide + 1) % slides.length;
  
  slides[this.state.currentGallerySlide].classList.add('active');
  dots[this.state.currentGallerySlide]?.classList.add('active');
};

MeridianApp.goToGallerySlide = function(index) {
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('.gallery-nav-dot');
  
  if (slides.length === 0 || index >= slides.length) return;

  slides[this.state.currentGallerySlide].classList.remove('active');
  dots[this.state.currentGallerySlide]?.classList.remove('active');
  
  this.state.currentGallerySlide = index;
  
  slides[this.state.currentGallerySlide].classList.add('active');
  dots[this.state.currentGallerySlide]?.classList.add('active');
};

// ===================================================================
// MORTGAGE CALCULATOR
// ===================================================================

MeridianApp.initMortgageCalculator = function() {
  const calculator = document.querySelector('.mortgage-calculator');
  if (!calculator) return;

  const loanAmountInput = document.getElementById('loan-amount');
  const interestRateInput = document.getElementById('interest-rate');
  const loanTermInput = document.getElementById('loan-term');
  const monthlyPaymentDisplay = document.getElementById('monthly-payment');

  // Auto-populate loan amount from property price if available
  const propertyPrice = document.querySelector('.property-price-large');
  if (propertyPrice && loanAmountInput) {
    const priceText = propertyPrice.textContent.replace(/[$,]/g, '');
    const price = parseInt(priceText);
    if (price) {
      loanAmountInput.value = Math.round(price * 0.8); // 80% LTV
    }
  }

  // Calculate on input change
  const inputs = [loanAmountInput, interestRateInput, loanTermInput];
  inputs.forEach(input => {
    if (input) {
      input.addEventListener('input', this.utils.debounce(() => {
        this.calculateMortgage();
      }, 300));
    }
  });

  // Initial calculation
  this.calculateMortgage();
};

MeridianApp.calculateMortgage = function() {
  const loanAmount = parseFloat(document.getElementById('loan-amount')?.value) || 0;
  const annualRate = parseFloat(document.getElementById('interest-rate')?.value) || 0;
  const loanTermYears = parseInt(document.getElementById('loan-term')?.value) || 0;
  const monthlyPaymentDisplay = document.getElementById('monthly-payment');

  if (!monthlyPaymentDisplay || loanAmount <= 0 || annualRate <= 0 || loanTermYears <= 0) {
    if (monthlyPaymentDisplay) {
      monthlyPaymentDisplay.textContent = '$0';
    }
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  monthlyPaymentDisplay.textContent = this.utils.formatCurrency(monthlyPayment);

  // Update additional details if they exist
  this.updateMortgageDetails(loanAmount, monthlyPayment, numberOfPayments);
};

MeridianApp.updateMortgageDetails = function(loanAmount, monthlyPayment, numberOfPayments) {
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  const totalPaymentEl = document.getElementById('total-payment');
  const totalInterestEl = document.getElementById('total-interest');

  if (totalPaymentEl) {
    totalPaymentEl.textContent = this.utils.formatCurrency(totalPayment);
  }

  if (totalInterestEl) {
    totalInterestEl.textContent = this.utils.formatCurrency(totalInterest);
  }
};

// ===================================================================
// FORM VALIDATION
// ===================================================================

MeridianApp.initFormValidation = function() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!this.validateForm(form)) {
        e.preventDefault();
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
    });
  });
};

MeridianApp.validateForm = function(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!this.validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
};

MeridianApp.validateField = function(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';

  // Remove existing error styling
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Required field validation
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  }

  // Email validation
  if (field.type === 'email' && value && !this.isValidEmail(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid email address';
  }

  // Phone validation
  if (field.type === 'tel' && value && !this.isValidPhone(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid phone number';
  }

  // Display error if invalid
  if (!isValid) {
    field.classList.add('error');
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = errorMessage;
    errorEl.style.cssText = 'color: #d32f2f; font-size: 0.875rem; margin-top: 4px;';
    field.parentNode.appendChild(errorEl);
  }

  return isValid;
};

MeridianApp.isValidEmail = function(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

MeridianApp.isValidPhone = function(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// ===================================================================
// SAMPLE DATA GENERATION
// ===================================================================

MeridianApp.generateSampleProperties = function() {
  this.state.properties = [
    {
      id: 1,
      title: "Luxury Penthouse with City Views",
      address: "123 Madison Ave, Manhattan, NY 10016",
      price: 3250000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      type: "condo",
      location: "Manhattan",
      image: "https://picsum.photos/400/300?random=20&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: 2,
      title: "Modern Waterfront Estate",
      address: "456 Harbor Drive, Brooklyn, NY 11201",
      price: 2750000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3500,
      type: "house",
      location: "Brooklyn",
      image: "https://picsum.photos/400/300?random=21&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: 3,
      title: "Historic Brownstone Beauty",
      address: "789 Park Slope, Brooklyn, NY 11215",
      price: 1850000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2200,
      type: "townhouse",
      location: "Brooklyn",
      image: "https://picsum.photos/400/300?random=22&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: 4,
      title: "Contemporary Loft Space",
      address: "101 SoHo Street, Manhattan, NY 10012",
      price: 2100000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1800,
      type: "loft",
      location: "Manhattan",
      image: "https://picsum.photos/400/300?random=23&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: 5,
      title: "Elegant Victorian Home",
      address: "234 Queens Blvd, Queens, NY 11375",
      price: 1450000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2600,
      type: "house",
      location: "Queens",
      image: "https://picsum.photos/400/300?random=24&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: 6,
      title: "Luxury High-Rise Apartment",
      address: "567 Upper East Side, Manhattan, NY 10021",
      price: 4200000,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2400,
      type: "condo",
      location: "Manhattan",
      image: "https://picsum.photos/400/300?random=25&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: 7,
      title: "Charming Colonial Estate",
      address: "890 Forest Hills, Queens, NY 11375",
      price: 1650000,
      bedrooms: 5,
      bathrooms: 3,
      sqft: 3200,
      type: "house",
      location: "Queens",
      image: "https://picsum.photos/400/300?random=26&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: 8,
      title: "Designer Studio Apartment",
      address: "345 Chelsea, Manhattan, NY 10011",
      price: 875000,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 800,
      type: "condo",
      location: "Manhattan",
      image: "https://picsum.photos/400/300?random=27&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: 9,
      title: "Spacious Family Home",
      address: "678 Bay Ridge, Brooklyn, NY 11220",
      price: 1350000,
      bedrooms: 4,
      bathrooms: 2,
      sqft: 2800,
      type: "house",
      location: "Brooklyn",
      image: "https://picsum.photos/400/300?random=28&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: 10,
      title: "Luxury Duplex Penthouse",
      address: "789 TriBeCa, Manhattan, NY 10013",
      price: 5500000,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 3800,
      type: "condo",
      location: "Manhattan",
      image: "https://picsum.photos/400/300?random=29&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: 11,
      title: "Renovated Craftsman Bungalow",
      address: "456 Astoria, Queens, NY 11106",
      price: 1150000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1900,
      type: "house",
      location: "Queens",
      image: "https://picsum.photos/400/300?random=30&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: 12,
      title: "Modern Glass Tower Unit",
      address: "123 Financial District, Manhattan, NY 10005",
      price: 2850000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1600,
      type: "condo",
      location: "Manhattan",
      image: "https://picsum.photos/400/300?random=31&auto=format&fit=crop&w=400&h=300"
    }
  ];

  this.state.filteredProperties = [...this.state.properties];
  this.renderProperties();
};

// ===================================================================
// UTILITY FUNCTIONS FOR EXTERNAL USE
// ===================================================================

// Function to handle property card clicks
window.viewProperty = function(propertyId) {
  window.location.href = `property.html?id=${propertyId}`;
};

// Function to handle contact form submission
window.submitContactForm = function(form) {
  if (MeridianApp.validateForm(form)) {
    // In a real application, you would send the data to a server
    alert('Thank you for your inquiry. We will contact you soon!');
    form.reset();
  }
  return false;
};

// Function to handle schedule viewing
window.scheduleViewing = function(form) {
  if (MeridianApp.validateForm(form)) {
    alert('Viewing scheduled successfully. We will confirm the time via email.');
    form.reset();
  }
  return false;
};

// Function to handle newsletter signup
window.subscribeNewsletter = function(form) {
  const emailInput = form.querySelector('input[type="email"]');
  if (MeridianApp.validateField(emailInput)) {
    alert('Thank you for subscribing to our newsletter!');
    form.reset();
  }
  return false;
};

// ===================================================================
// ERROR HANDLING AND FALLBACKS
// ===================================================================

// Global error handler
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.error);
  // In production, you might want to send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled Promise Rejection:', e.reason);
  e.preventDefault();
});

// Fallback for browsers without Intersection Observer
if (!('IntersectionObserver' in window)) {
  // Simple fallback - just add the animated class to all elements
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animated');
      });
    }, 500);
  });
}

// ===================================================================
// PERFORMANCE OPTIMIZATIONS
// ===================================================================

// Lazy loading for images (fallback for older browsers)
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.loading = 'lazy';
  });
} else {
  // Fallback lazy loading implementation
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

console.log('Meridian Properties JavaScript - Fully Loaded ✨');
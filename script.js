// VantaWeb Portfolio - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimations();
    initLogoLoader();
    initContactForm();
});

// Navigation functionality
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(15, 15, 15, 0.95)';
        } else {
            nav.style.background = 'rgba(15, 15, 15, 0.9)';
        }
    });

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Logo loader
function initLogoLoader() {
    const logosGrid = document.getElementById('logos-grid');
    
    // Logo data from catalog
    const logos = [
        { id: 1, name: "Ember & Oak", industry: "Restaurant", file: "01-ember-oak.svg" },
        { id: 2, name: "Steele & Associates", industry: "Law", file: "02-steele-associates.svg" },
        { id: 3, name: "APEX Athletics", industry: "Fitness", file: "03-apex-athletics.svg" },
        { id: 4, name: "Meridian Properties", industry: "Real Estate", file: "04-meridian-properties.svg" },
        { id: 5, name: "FlowStack", industry: "SaaS/Tech", file: "05-flowstack.svg" },
        { id: 6, name: "Clarity Health", industry: "Medical", file: "06-clarity-health.svg" },
        { id: 7, name: "Coastline Coffee", industry: "Café", file: "07-coastline-coffee.svg" },
        { id: 8, name: "TrueNorth Financial", industry: "Finance", file: "08-truenorth-financial.svg" },
        { id: 9, name: "Pawprint Pet Care", industry: "Veterinary", file: "09-pawprint-petcare.svg" },
        { id: 10, name: "Verde Landscaping", industry: "Landscaping", file: "10-verde-landscaping.svg" },
        { id: 11, name: "Pixel & Frame", industry: "Photography", file: "11-pixel-frame.svg" },
        { id: 12, name: "Summit Construction", industry: "Construction", file: "12-summit-construction.svg" },
        { id: 13, name: "Bloom Boutique", industry: "Fashion", file: "13-bloom-boutique.svg" },
        { id: 14, name: "Circuit Labs", industry: "Electronics", file: "14-circuit-labs.svg" },
        { id: 15, name: "Harbor Insurance", industry: "Insurance", file: "15-harbor-insurance.svg" },
        { id: 16, name: "Wildcraft Brewing", industry: "Brewery", file: "16-wildcraft-brewing.svg" },
        { id: 17, name: "Nimbus Cloud Services", industry: "Cloud/IT", file: "17-nimbus-cloud.svg" },
        { id: 18, name: "Sage & Stone Spa", industry: "Wellness", file: "18-sage-stone-spa.svg" },
        { id: 19, name: "Atlas Logistics", industry: "Shipping", file: "19-atlas-logistics.svg" },
        { id: 20, name: "Bright Minds Academy", industry: "Education", file: "20-bright-minds-academy.svg" }
    ];

    // Load and display logos
    logos.forEach((logo, index) => {
        const logoItem = document.createElement('div');
        logoItem.className = 'logo-item';
        logoItem.setAttribute('data-aos', 'fade-up');
        logoItem.setAttribute('data-aos-delay', (index % 4) * 100);
        
        logoItem.innerHTML = `
            <div class="logo-preview">
                <div class="loading" id="loading-${logo.id}"></div>
                <div class="logo-svg" id="svg-${logo.id}" style="display: none;"></div>
            </div>
            <div class="logo-name">${logo.name}</div>
            <div class="logo-industry">${logo.industry}</div>
        `;
        
        logosGrid.appendChild(logoItem);
        
        // Load SVG
        loadLogoSVG(logo.id, logo.file);
    });
}

// Load individual logo SVG
function loadLogoSVG(logoId, filename) {
    fetch(`logos/svg/${filename}`)
        .then(response => response.text())
        .then(svgContent => {
            const loadingEl = document.getElementById(`loading-${logoId}`);
            const svgEl = document.getElementById(`svg-${logoId}`);
            
            if (loadingEl && svgEl) {
                loadingEl.style.display = 'none';
                svgEl.innerHTML = svgContent;
                svgEl.style.display = 'flex';
            }
        })
        .catch(error => {
            console.error(`Failed to load logo ${filename}:`, error);
            const loadingEl = document.getElementById(`loading-${logoId}`);
            if (loadingEl) {
                loadingEl.innerHTML = '❌';
            }
        });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Create mailto link
        const subject = encodeURIComponent(`VantaWeb Inquiry - ${data.service}`);
        const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Service: ${data.service}

Message:
${data.message}
        `);
        
        const mailtoLink = `mailto:hunter@vantaweb.dev?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Email client opened! Please send the message.', 'success');
        
        // Reset form
        form.reset();
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#10b981' : '#6366f1',
        color: 'white',
        borderRadius: '0.5rem',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
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

    images.forEach(img => imageObserver.observe(img));
}
// VantaWeb Portfolio - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initLogoPopup();
    initContactForm();
});

// Navigation
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 100
            ? 'rgba(15, 15, 15, 0.95)'
            : 'rgba(15, 15, 15, 0.9)';
    });

    navToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Logo click-to-popup
function initLogoPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'logo-popup-overlay';
    overlay.innerHTML = `
        <div class="logo-popup-card" style="position:relative;">
            <span class="popup-close">&times;</span>
            <div class="logo-popup-svg"></div>
            <div class="popup-name"></div>
            <div class="popup-industry"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    const card = overlay.querySelector('.logo-popup-card');
    const popupSvg = overlay.querySelector('.logo-popup-svg');
    const popupName = overlay.querySelector('.popup-name');
    const popupIndustry = overlay.querySelector('.popup-industry');

    // Close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('popup-close')) {
            overlay.classList.remove('active');
        }
    });
    card.addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') overlay.classList.remove('active');
    });

    // Click any logo-item to open popup
    const logosGrid = document.getElementById('logos-grid');
    if (!logosGrid) return;

    logosGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.logo-item');
        if (!item) return;

        const img = item.querySelector('.logo-preview img');
        const name = item.querySelector('.logo-name');
        const industry = item.querySelector('.logo-industry');

        popupSvg.innerHTML = img ? `<img src="${img.src}" alt="${img.alt}" style="max-width:100%;max-height:100%;">` : '';
        popupName.textContent = name ? name.textContent : '';
        popupIndustry.textContent = industry ? industry.textContent : '';
        overlay.classList.add('active');
    });
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        const subject = encodeURIComponent(`VantaWeb Inquiry - ${data.service}`);
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}\n\nMessage:\n${data.message}`);
        window.location.href = `mailto:hunter@vantaweb.dev?subject=${subject}&body=${body}`;
        form.reset();
    });
}

# 🏗️ MASTER PLAN: Web Design Portfolio Business

**Author:** Clawrence + Hunter
**Date:** February 20, 2026
**Status:** DRAFT — Awaiting Hunter's review & tweaks

---

## 🎯 Executive Summary

Build a professional web design portfolio showcasing 6 industry-specific websites + 20 custom logos. Use this portfolio to cold-email small businesses and sell custom website design services. Everything starts local, moves to GitHub, then deploys live via GitHub Pages / Vercel / Netlify.

---

## 📁 PHASE 1: File System & Storage Architecture

### Local Structure
```
C:\Users\hspen\web-design-business\
├── MASTER-PLAN.md              # This file
├── README.md                   # GitHub repo README
├── .gitignore
│
├── portfolio/                  # THE MAIN PORTFOLIO SITE (showcases everything)
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── assets/
│   └── pages/
│       ├── websites.html       # Gallery of 6 websites
│       ├── logos.html           # Gallery of 20 logos
│       ├── about.html
│       ├── services.html
│       └── contact.html
│
├── websites/                   # THE 6 SHOWCASE WEBSITES
│   ├── 01-restaurant/
│   ├── 02-law-firm/
│   ├── 03-fitness/
│   ├── 04-real-estate/
│   ├── 05-saas-startup/
│   └── 06-medical-clinic/
│
├── logos/                      # THE 20 LOGOS
│   ├── svg/                    # Vector originals
│   ├── png/                    # Rasterized exports
│   ├── mockups/                # Logos on business cards, letterheads, etc.
│   └── catalog.json            # Logo metadata (name, industry, colors, fonts)
│
├── outreach/                   # COLD EMAIL SYSTEM
│   ├── templates/              # Email templates by industry
│   ├── leads.csv               # Lead database
│   ├── tracker.json            # Send/open/reply tracking
│   └── scripts/                # Automation scripts
│
├── backups/                    # LOCAL BACKUPS
│   └── (auto-generated zips)
│
└── docs/
    ├── PRICING.md              # Service pricing tiers
    ├── PROCESS.md              # Client onboarding process
    └── CONTRACTS.md            # Template contracts/agreements
```

### Backup Strategy
1. **Git** — every meaningful change committed + pushed to GitHub
2. **Local ZIP backups** — weekly automated zip of entire project
3. **GitHub repo** — primary remote backup + version control
4. **Optional:** Sync to OneDrive/Google Drive for redundancy

### GitHub Repository
- **Repo name:** `hunter-web-designs` (or your brand name)
- **Visibility:** Public (serves as both portfolio AND backup)
- **GitHub Pages:** Enabled — free hosting for the portfolio site
- **URL:** `https://yourusername.github.io/hunter-web-designs/`

---

## 🌐 PHASE 2: The 6 Showcase Websites

### Industry Selection Strategy
Chosen to hit the **highest-demand** small business segments that actively pay for websites:

| # | Industry | Target Client | Why This Industry | Inspiration Reference |
|---|----------|--------------|-------------------|----------------------|
| 1 | **Upscale Restaurant / Bar** | Local restaurants, cafés, bars | Every restaurant needs a site, most have bad ones | Noma, Eleven Madison Park, Alinea |
| 2 | **Law Firm** | Solo attorneys, small firms | High-value clients, willing to pay premium | Cravath, Wachtell sites — clean & authoritative |
| 3 | **Fitness / Gym** | Boutique gyms, personal trainers | Booming industry, visual-heavy | Equinox, Barry's Bootcamp, Peloton |
| 4 | **Luxury Real Estate** | Realtors, property agencies | Realtors ALWAYS need sites + high commission = high budget | Sotheby's Realty, Compass, The Agency |
| 5 | **SaaS / Tech Startup** | Tech startups, app developers | Shows technical range, modern design chops | Linear, Vercel, Notion, Stripe |
| 6 | **Medical / Dental Clinic** | Dentists, doctors, clinics | Steady demand, professional look required | One Medical, Tend, Aspen Dental |

### Design Standards (ALL 6 sites)
- **Fully responsive** (mobile-first design)
- **Fast loading** (< 2s, optimized images, minimal JS)
- **Accessible** (WCAG 2.1 AA compliant)
- **SEO-ready** (meta tags, semantic HTML, Open Graph)
- **Interactive elements** (smooth scroll, animations, hover effects)
- **Contact forms** (functional with Formspree or similar)
- **Modern stack:** HTML5 + CSS3 (with CSS Grid/Flexbox) + Vanilla JS (no heavy frameworks)
- **Dark mode toggle** where appropriate
- **Cookie-free** (no tracking, privacy-friendly)

### Website Specifications

#### 1. 🍽️ Upscale Restaurant — "Ember & Oak"
**Vibe:** Dark, moody, elegant. Think candlelit dinner.
**Pages:** Home (hero video/parallax) | Menu | Reservations (OpenTable-style form) | Gallery | About | Contact
**Key Features:**
- Full-screen hero with video background or parallax food imagery
- Animated menu with categories (Starters, Mains, Desserts, Wine)
- Reservation form with date/time picker
- Instagram feed integration placeholder
- Google Maps embed
**Color Palette:** Deep charcoal (#1a1a1a), warm gold (#c9a84c), cream (#f5f0e8)
**Typography:** Playfair Display (headings) + Lato (body)
**Inspired by:** Noma, Alinea, Eleven Madison Park websites

#### 2. ⚖️ Law Firm — "Steele & Associates"
**Vibe:** Clean, authoritative, trustworthy. Navy + white.
**Pages:** Home | Practice Areas | Our Team | Case Results | Testimonials | Contact
**Key Features:**
- Professional hero with confident imagery
- Practice area cards with icons (Corporate, Family, Criminal, Real Estate, IP)
- Attorney bio cards with photos + credentials
- Testimonial carousel
- Free consultation CTA (sticky header)
- Blog/insights section placeholder
**Color Palette:** Navy (#1b2a4a), white (#ffffff), silver (#e8e8e8), gold accent (#b8860b)
**Typography:** Cormorant Garamond (headings) + Source Sans Pro (body)
**Inspired by:** Cravath, Kirkland & Ellis — authoritative but approachable

#### 3. 💪 Fitness / Gym — "APEX Athletics"
**Vibe:** Bold, energetic, high-contrast. Black + neon.
**Pages:** Home | Classes | Trainers | Membership | Schedule | Contact
**Key Features:**
- High-energy hero with bold typography
- Class schedule grid/calendar
- Trainer profile cards with specialties
- Membership tier comparison table
- BMI calculator or fitness quiz (interactive element)
- Video testimonials section
- Animated counters (Members, Classes, Trainers)
**Color Palette:** Jet black (#0d0d0d), electric lime (#c4f538), white (#ffffff)
**Typography:** Bebas Neue (headings) + Inter (body)
**Inspired by:** Equinox, Barry's Bootcamp, CrossFit HQ

#### 4. 🏠 Luxury Real Estate — "Meridian Properties"
**Vibe:** Luxurious, spacious, aspirational. Lots of whitespace.
**Pages:** Home | Listings | Property Detail | Agents | Neighborhoods | Contact
**Key Features:**
- Full-bleed property hero slideshow
- Property search/filter bar (price, beds, location)
- Property cards with hover animations
- Individual property pages with image gallery, map, details
- Agent profile pages
- Neighborhood guides
- Mortgage calculator widget
**Color Palette:** White (#ffffff), charcoal (#2d2d2d), gold (#c5a47e), sage (#8b9d83)
**Typography:** Tenor Sans (headings) + Nunito Sans (body)
**Inspired by:** Sotheby's Realty, The Agency, Compass

#### 5. 🚀 SaaS Startup — "FlowStack"
**Vibe:** Modern, clean, tech-forward. Gradients + glass morphism.
**Pages:** Home | Features | Pricing | Integrations | Blog | Contact/Demo
**Key Features:**
- Gradient mesh hero with floating UI mockups
- Feature grid with animated icons
- Pricing table (Free / Pro / Enterprise) with toggle (monthly/annual)
- Integration logos grid
- Animated stats/social proof section
- CTA everywhere (Start Free Trial)
- Dark/light mode toggle
**Color Palette:** Deep purple (#6c3ce9), electric blue (#3b82f6), white, subtle gradients
**Typography:** Plus Jakarta Sans (headings + body)
**Inspired by:** Linear, Vercel, Stripe, Notion landing pages

#### 6. 🏥 Medical / Dental Clinic — "Clarity Health"
**Vibe:** Clean, calming, professional. Trust-building.
**Pages:** Home | Services | Our Doctors | Patient Resources | Insurance | Book Appointment | Contact
**Key Features:**
- Warm, welcoming hero with real-feeling imagery
- Services grid (General, Cosmetic, Pediatric, Emergency, etc.)
- Doctor profile cards with credentials & specialties
- Online appointment booking form (date, time, service, doctor)
- Insurance accepted logos
- Patient testimonials
- FAQ accordion
- HIPAA compliance notice
**Color Palette:** Soft teal (#4ecdc4), white (#ffffff), light gray (#f7f7f7), navy accent (#2c3e50)
**Typography:** DM Sans (headings + body)
**Inspired by:** One Medical, Tend, ZocDoc

---

## 🎨 PHASE 3: The 20 Logos

### Logo Categories (spread across industries)
| # | Logo Name | Industry | Style |
|---|-----------|----------|-------|
| 1 | Ember & Oak | Restaurant | Elegant wordmark + flame icon |
| 2 | Steele & Associates | Law | Classic serif monogram |
| 3 | APEX Athletics | Fitness | Bold geometric |
| 4 | Meridian Properties | Real Estate | Minimal house/compass mark |
| 5 | FlowStack | SaaS/Tech | Modern abstract lettermark |
| 6 | Clarity Health | Medical | Clean cross/leaf combo |
| 7 | Coastline Coffee | Café | Hand-drawn / artisan |
| 8 | TrueNorth Financial | Finance | Shield + compass |
| 9 | Pawprint Pet Care | Veterinary | Playful mascot |
| 10 | Verde Landscaping | Landscaping | Nature/leaf organic |
| 11 | Pixel & Frame | Photography | Camera aperture minimal |
| 12 | Summit Construction | Construction | Mountain/building geometric |
| 13 | Bloom Boutique | Fashion/Retail | Elegant floral |
| 14 | Circuit Labs | Electronics | Tech circuit abstract |
| 15 | Harbor Insurance | Insurance | Lighthouse/shield |
| 16 | Wildcraft Brewing | Brewery | Vintage/craft badge |
| 17 | Nimbus Cloud Services | Cloud/IT | Cloud abstract |
| 18 | Sage & Stone Spa | Wellness/Spa | Zen minimal |
| 19 | Atlas Logistics | Shipping/Logistics | Globe/arrow dynamic |
| 20 | Bright Minds Academy | Education | Lightbulb/book |

### Logo Deliverables (each logo)
- SVG (scalable vector)
- PNG (transparent, multiple sizes: 64px, 256px, 512px, 1024px)
- Dark + Light variants
- Mockup on business card
- Color palette documentation

### Logo Creation Method
- Generated using AI image tools (Gemini, DALL-E) for initial concepts
- Refined into clean SVG using code (hand-crafted SVG paths)
- Each logo stored with metadata in `logos/catalog.json`

---

## 🖥️ PHASE 4: Portfolio Website (The Showcase)

The **main portfolio site** ties everything together. This is what prospects see.

### Pages
1. **Home** — Hero with tagline, featured work, CTA
2. **Websites** — Gallery of all 6 sites with screenshots + live demo links
3. **Logos** — Grid of all 20 logos with hover details
4. **Services** — What you offer + pricing tiers
5. **About** — Your story, skills, experience
6. **Contact** — Form + email + socials

### Hosting Progression
1. **Local first** → `localhost` via VS Code Live Server or Python http.server
2. **GitHub Pages** → Free, reliable, custom domain support
3. **Upgrade later** → Vercel or Netlify for more features (forms, analytics)
4. **Custom domain** → Buy a professional domain ($10-15/yr)

### Suggested Domains
- `hunterdesigns.com`
- `spencerwebdesign.com`
- `[yourbrandname].dev`
- `[yourbrandname].design`

---

## 📧 PHASE 5: Cold Email Outreach System

### Lead Generation
1. **Google Maps** — Search "[industry] near [city]" → find businesses with bad/no websites
2. **Yelp** — Businesses with high reviews but bad web presence
3. **Facebook Business Pages** — Businesses relying on FB instead of a real site
4. **Industry directories** — Local chambers of commerce, professional associations

### Email Templates (by industry)
- Restaurant template
- Law firm template
- Fitness/gym template
- Real estate template
- Medical/dental template
- Generic small business template

### Cold Email Strategy
1. **Personalize every email** (reference their business by name, note specific website issues)
2. **Lead with value** ("I noticed [specific problem with their current site]")
3. **Include portfolio link** (the GitHub Pages portfolio)
4. **Offer free audit** (5-minute video reviewing their current site)
5. **Follow up** (Day 3, Day 7, Day 14 — 3-touch sequence)
6. **Track everything** in `outreach/tracker.json`

### Email Sequence
```
Email 1 (Day 0): Introduction + portfolio link + specific observation
Email 2 (Day 3): Follow up + case study/testimonial
Email 3 (Day 7): Free website audit offer (personalized video)
```

### Tools
- **Email:** Your business email (you'll provide)
- **Tracking:** Custom script or Mailtrack
- **CRM:** Simple JSON/CSV tracker (we build this)
- **Templates:** Markdown templates with merge fields

---

## 💰 PHASE 6: Pricing & Packages

### Suggested Pricing Tiers
| Tier | What's Included | Price |
|------|----------------|-------|
| **Starter** | 1-page landing site + 1 logo | $500 |
| **Professional** | 5-page responsive site + logo + contact form | $1,500 |
| **Premium** | Full custom site (up to 10 pages) + logo + SEO + 1 month support | $3,000 |
| **E-Commerce** | Online store + payment integration + product pages | $5,000+ |
| **Logo Only** | Custom logo + brand guide | $200 |

### Add-Ons
- SEO setup: $300
- Monthly maintenance: $100/mo
- Content writing: $50/page
- Social media kit: $150
- Business card design: $75

---

## 📋 EXECUTION ORDER

### Week 1: Foundation
- [ ] Set up Git repo + file structure
- [ ] Choose brand name for YOUR business
- [ ] Build Website #1 (Restaurant — "Ember & Oak")
- [ ] Build Website #2 (Law Firm — "Steele & Associates")
- [ ] Create Logos #1–7

### Week 2: Build
- [ ] Build Website #3 (Fitness — "APEX Athletics")
- [ ] Build Website #4 (Real Estate — "Meridian Properties")
- [ ] Create Logos #8–14
- [ ] Start portfolio site structure

### Week 3: Build + Polish
- [ ] Build Website #5 (SaaS — "FlowStack")
- [ ] Build Website #6 (Medical — "Clarity Health")
- [ ] Create Logos #15–20
- [ ] Complete portfolio site

### Week 4: Launch + Outreach
- [ ] Deploy everything to GitHub Pages
- [ ] Set up custom domain (optional)
- [ ] Build lead database (50+ leads minimum)
- [ ] Write email templates
- [ ] Begin cold outreach (10 emails/day)
- [ ] Set up tracking

### Ongoing
- [ ] Follow up on leads (3-touch sequence)
- [ ] A/B test email subject lines
- [ ] Add new portfolio pieces as you get clients
- [ ] Collect testimonials from first clients
- [ ] Iterate on pricing based on market response

---

## 🛠️ Tech Stack Summary

| Component | Technology | Cost |
|-----------|-----------|------|
| Websites | HTML5 + CSS3 + Vanilla JS | Free |
| Logos | AI generation + SVG hand-tuning | Free |
| Version Control | Git + GitHub | Free |
| Hosting | GitHub Pages | Free |
| Domain | .com or .design | $10-15/yr |
| Email | Your business email | TBD |
| Portfolio | Static site on GitHub Pages | Free |
| Lead Tracking | Custom JSON/CSV + scripts | Free |

**Total startup cost: ~$10-15** (just the domain)

---

## 🎯 Revenue Projections (Conservative)

| Month | Emails Sent | Responses (5%) | Closes (20%) | Revenue |
|-------|------------|----------------|--------------|---------|
| Month 1 | 200 | 10 | 2 | $3,000 |
| Month 2 | 300 | 15 | 3 | $4,500 |
| Month 3 | 300 | 15 | 3 | $5,000+ |

**Break-even:** Immediately (near-zero costs)
**Target:** $3,000–$5,000/month within 90 days

---

## ✅ NEXT STEPS (After Hunter's Review)

1. **Hunter reviews this plan** — adds tweaks, picks brand name, provides email
2. **Clawrence creates the Git repo + file structure**
3. **Start building Website #1** (Restaurant)
4. **Iterate from there**

---

*This plan is a living document. We'll update it as we execute.*

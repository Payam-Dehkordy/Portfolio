// Calculate years of experience dynamically
// This automatically calculates experience from 2017 to current year
function calculateExperience() {
    const startYear = 2017; // Starting year of professional experience
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    
    // Update both instances
    const experienceElement1 = document.getElementById('experience-years');
    const experienceElement2 = document.getElementById('experience-years-about');
    
    if (experienceElement1) {
        experienceElement1.textContent = `${years}+`;
    }
    if (experienceElement2) {
        experienceElement2.textContent = `${years}+`;
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Handle hash navigation on page load (for cross-page links)
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        const hash = window.location.hash;
        const target = document.querySelector(hash);
        if (target) {
            // Small delay to ensure page is fully rendered
            setTimeout(() => {
                const NAV_SCROLL_OFFSET = 52;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - NAV_SCROLL_OFFSET,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip links that are just '#' or have onclick handlers (like Calendly popup)
    const href = anchor.getAttribute('href');
    if (href === '#' || anchor.hasAttribute('onclick')) {
        return;
    }
    
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Anchor nav scroll offset for About/Experience so header doesn't cover the titles
const NAV_SCROLL_OFFSET = 52;
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href) {
    // Handle both same-page (#section) and cross-page (page.html#section) links
    if (href.startsWith('#')) {
      // Same-page anchor link
      link.addEventListener('click', function(e) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.pageYOffset - NAV_SCROLL_OFFSET,
            behavior: 'smooth'
          });
        }
      });
    } else if (href.includes('#')) {
      // Cross-page link with hash (e.g., index.html#about)
      // Let the browser handle navigation, hash scrolling will be handled on page load
      // No preventDefault needed - allow normal navigation
    }
  }
});


// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Portfolio Details Data
const portfolioDetails = {
    'eda-automation-qa': {
        title: 'EDA QA Automation – Synopsys',
        subtitle: 'Electronic Design Automation – EDA Software Division',
        platforms: 'Platforms: Linux x64 / ARM / PPC / Windows',
        technologies: 'Technologies: Python, bash, Perl, tcl, GitHub Action, Git, Perforce, EDA toolchains (GDSII, OASIS)',
        responsibilities: [
            'Designed and maintained automated test frameworks to validate EDA tools handling layout and binary file formats (GDSII, OASIS, LEF/DEF).',
            'Developed regression systems to test geometric accuracy, layer integrity, and binary consistency across multiple architectures (x86_64, ARM64, PPC64).',
            'Automated functional, performance, and regression tests for high-precision design tools used in semiconductor manufacturing.',
            'Built validation pipelines that ensure bit-level accuracy in file conversions and transformations between multiple design representations.',
            'Collaborated with development teams to identify and resolve cross-platform inconsistencies, improving the stability of critical design tools.',
            'Integrated automated test execution into CI/CD workflows (GitHub Action), enabling nightly test coverage and automated reporting.',
            'Contributed to QA infrastructure improvements — refactored scripts, standardized test frameworks, and optimized log analysis to reduce false positives.',
            'Performed failure pattern analysis and introduced self-verifying tests for geometry-based algorithms, enhancing overall quality metrics.'
        ],
        examples: [
            {
                title: 'Binary Validation Suite:',
                description: 'Created a Python-based automation scripts to compare GDSII and OASIS files at a binary and geometric level, ensuring sub-micron precision across different compute platforms.'
            },
            {
                title: 'Cross-Platform Regression Framework:',
                description: 'Built a scalable test system for Linux (ARM, PPC, x86) and Windows that validates end-to-end flow, including file generation, transformation, and visualization.'
            },
            {
                title: 'Continuous Quality Dashboard:',
                description: 'Designed reporting automation that aggregates regression results from distributed systems, enabling QA and dev teams to track accuracy trends over time.'
            }
        ]
    },
    'layout-portal': {
        title: 'Layout Portal – Synopsys',
        subtitle: 'Automation Engineer – Electronic Design Automation (Internal Tools & Infrastructure)',
        platforms: 'Tech Stack: Python (Flask), JavaScript (Vanilla), MySQL, LSF, Linux',
        technologies: 'Project: Automated Layout Monitoring & Metrics System',
        responsibilities: [
            'Developed an end-to-end web-based automation system named Layout Portal, designed to monitor and analyze layout repositories for EDA design teams.',
            'Built a clean, lightweight vanilla JavaScript interface for browsing and visualizing layout metrics, repository status, and extraction results.',
            'Implemented a Flask-based API with MySQL database, handling real-time updates, task scheduling, and automatic data recovery.',
            'Integrated with LSF (Load Sharing Facility) for distributed task execution, enabling parallel extraction of layout metrics across compute nodes.',
            'Developed continuous repository monitoring that watches multiple EDA layout repositories and detects changes (new layouts, modified cells, or deleted files).',
            'Created dynamic extraction system that triggers user-defined scripts, tools, or commands to extract updated layout metrics automatically on each detected change.',
            'Built self-healing database automation routines that detect and repair missing tables or corrupted entries, ensuring database integrity with zero manual intervention.',
            'Implemented comprehensive reporting with sortable, filterable tables, Excel and CSV export capabilities, and advanced search/filter functionality.'
        ],
        examples: [
            {
                title: 'System Architecture:',
                description: 'Built scalable and extensible modular architecture that allows new metric extractors or tool integrations without system downtime. Supports multiple projects and compute environments.'
            },
            {
                title: 'Automation Engine:',
                description: 'Integrated distributed task execution using LSF, enabling parallel extraction of layout metrics across compute nodes for improved performance and scalability.'
            },
            {
                title: 'Impact & Achievements:',
                description: 'Enabled fully automated, 24/7 layout monitoring across multiple design teams with no manual supervision. Reduced layout metric extraction time by over 90%, freeing engineers to focus on analysis. Improved data reliability through automated recovery and consistency checks. Became a central internal portal used by EDA teams for layout verification, performance tracking, and quality reporting.'
            }
        ]
    },
    'oasis-portal': {
        title: 'Oasis Portal – Synopsys',
        subtitle: 'Automation Engineer – Electronic Design Automation (Internal Tools & Validation Systems)',
        platforms: 'Tech Stack: Python (Flask), JavaScript (Vanilla), MySQL, LSF, Linux',
        technologies: 'Project: Interactive OASIS File Visualization & Validation System',
        responsibilities: [
            'Developed a comprehensive web-based application named Oasis Portal, designed to parse, visualize, and validate OASIS layout files — one of the key binary formats used in EDA workflows.',
            'Implemented a backend parser that decodes OASIS binary files into structured data, displaying their hierarchical content in an interactive tree-style interface.',
            'Built binary-level editing capabilities allowing users to perform direct modifications such as adding, removing, or editing records via drag-and-drop, checkboxes, and context menus.',
            'Implemented real-time validation that automatically highlights structural or binary errors caused by user edits, showing precise feedback on which part of the file becomes invalid.',
            'Developed custom scenario creation system supporting saving modified OASIS files — even those that are intentionally invalid — to enable QA teams to create negative and boundary test cases.',
            'Integrated backend validation scripts executed through LSF, verifying file integrity, record structure, and cross-reference consistency on the fly.',
            'Built full automation and data management with MySQL database integration storing file versions, validation logs, and edit history, making every test case searchable, traceable, and reproducible.',
            'Created responsive vanilla JavaScript frontend for fluid navigation through large hierarchical datasets, supporting advanced search, filtering, and visualization of record relationships.'
        ],
        examples: [
            {
                title: 'OASIS Parsing & Visualization:',
                description: 'Implemented a backend parser that decodes OASIS binary files into structured data, displaying their hierarchical content in an interactive tree-style interface for engineers and QA teams.'
            },
            {
                title: 'Binary-Level Editing & Validation:',
                description: 'Built direct modification capabilities with drag-and-drop, checkboxes, and context menus. System automatically highlights structural or binary errors with precise feedback, supporting creation of negative and boundary test cases.'
            },
            {
                title: 'Impact & Achievements:',
                description: 'Provided QA and development teams with a powerful in-house tool for analyzing and experimenting with OASIS layouts at a binary level. Enabled automated validation of malformed or incomplete formats, improving negative testing coverage. Reduced manual test-case preparation time by over 70%. Enhanced debugging and training workflows by offering a visual representation of binary data, bridging the gap between raw file structure and practical EDA tool behavior.'
            }
        ]
    },
    'maggy-beauty': {
        title: 'Maggy Beauty – E-Commerce Platform',
        subtitle: 'QA Engineer – Maggy Beauty (Startup) - E-commerce Platform (Web & Mobile)',
        platforms: 'Tech Stack: Web (React, HTML/CSS, JS), Backend (Node.js), MySQL, REST API, Payment Gateway Integration',
        technologies: 'Project: End-to-End Manual Testing for Maggy Beauty E-Commerce Platform',
        responsibilities: [
            'Performed comprehensive manual quality assurance for Maggy Beauty, an early-stage startup developing an online beauty and cosmetics store covering product browsing, shopping cart, payment gateway, and order management modules.',
            'Executed end-to-end manual testing across the full customer journey — from registration and product discovery to checkout and order confirmation.',
            'Designed and maintained detailed test plans, cases, and execution reports covering functional, usability, UI, and regression testing.',
            'Conducted cross-browser and device testing to ensure consistent experience across Chrome, Safari, Edge, and mobile devices.',
            'Validated REST API integrations between the frontend, backend, and third-party services such as payment processors and shipping APIs.',
            'Verified database transactions and data consistency for user accounts, product inventory, and order history in MySQL.',
            'Collaborated with developers to reproduce, document, and prioritize defects, ensuring timely fixes in agile development cycles.',
            'Performed UI/UX validation, focusing on responsiveness, accessibility, and visual accuracy against design specifications. Executed smoke, regression, and acceptance testing before each production release to maintain a stable deployment pipeline.'
        ],
        examples: [
            {
                title: 'Testing Scope & Responsibilities:',
                description: 'Comprehensive manual testing covering end-to-end customer journey, cross-browser/device compatibility, REST API validation, database integrity verification, and UI/UX validation across web and mobile platforms.'
            },
            {
                title: 'Agile Collaboration:',
                description: 'Worked closely with development team in agile cycles to reproduce, document, and prioritize defects. Established structured QA workflow and documentation process for startup environment.'
            },
            {
                title: 'Impact & Achievements:',
                description: 'Ensured a bug-free launch of the Maggy Beauty e-commerce platform with a 95% reduction in post-release defects. Improved user experience through detailed UI feedback and consistency checks. Contributed to early product success by identifying critical edge-case failures in checkout and API synchronization before public launch.'
            }
        ]
    },
    'sahakyan-law': {
        title: 'Sahakyan Law Office – Website',
        subtitle: 'Web Developer / Designer – Sahakyan Law Office (Corporate Law Firm – Website Design & Implementation)',
        platforms: 'Tech Stack: WordPress, HTML5, CSS3, JavaScript, Responsive Design, SEO fundamentals',
        technologies: 'Project: SahakyanLaw.com – Full Website Design & Development (WordPress)',
        responsibilities: [
            'Led the end-to-end website design and WordPress build for Sahakyan Law Office, a professional legal services firm in Yerevan—including concept, UI/UX design, WordPress theme customization, and SEO.',
            'Crafted a professional, responsive layout that adapts across desktop, tablet and mobile devices. The user interface emphasizes clarity, readability and accessibility.',
            'Organized the website into key sections — Home, About, Services, Practice Areas, Contacts — enabling visitors to easily navigate the firm’s expertise such as entity registration, tax, accounting, customs, real-estate law and more.',
            'Incorporated firm branding, professional photography and a clients-carousel showcasing the firm’s varied clientele from media law to banking and antitrust.',
            'Integrated contact details (phone, email, address) and a call-to-action ("Contact Us") button to drive client inquiries.',
            'Structured headings, meta tags and alt text to optimise for search visibility in a competitive legal services market (SEO fundamentals).',
            'Implemented content in multiple languages (Armenian, English, Persian) to serve the local and international client base.',
            'Setup WordPress as backend to allow client to self-manage content updates (services, client logos, team info). Managed domain, hosting configuration and launch, ensuring secure, performant operation.'
        ],
        examples: [
            {
                title: 'UX / UI Design & Content Architecture:',
                description: 'Crafted professional, responsive layout emphasizing clarity, readability and accessibility. Organized website into key sections (Home, About, Services, Practice Areas, Contacts) enabling easy navigation of legal expertise.'
            },
            {
                title: 'Multilingual & Professional Branding:',
                description: 'Implemented multilingual support (Armenian, English, Persian) for local and international clients. Incorporated firm branding, professional photography, and client carousel showcasing varied clientele across legal domains.'
            },
            {
                title: 'Impact & Achievements:',
                description: 'Delivered a polished online presence that projects professionalism and trust. Enhanced digital accessibility through multiple languages and responsive design, broadening potential client base. Streamlined visitor experience with clear navigation. Created maintainable website architecture enabling independent updates, reducing future maintenance costs.'
            }
        ],
        image: 'assets/images/Sahakyan-Law-Office.png'
    },
    'daily-cups': {
        title: 'Daily Cups – Logo Design',
        subtitle: 'Branding & Logo Design – Daily Cups Take-Away Cafe, Yerevan',
        platforms: 'Tool: Adobe Illustrator',
        technologies: 'Project: Logo Design for Take-Away Cafe',
        responsibilities: [
            'Designed a complete logo identity for Daily Cups, a take-away cafe in Yerevan.',
            'Created brand logo using Adobe Illustrator with focus on modern, appealing design suitable for cafe branding.'
        ],
        examples: [
            {
                title: 'Design Process:',
                description: 'Developed logo design using Adobe Illustrator, creating a distinctive brand identity for the take-away cafe that reflects the establishment\'s character and appeal.'
            }
        ],
        image: 'assets/images/Daily-cups.svg'
    },
    'goldenarms': {
        title: 'GoldenArms – Logo Design',
        subtitle: 'Brand Identity for an Armenian Holding Company',
        platforms: 'Tool: Adobe Illustrator',
        technologies: 'Project: Corporate Logo & Visual Identity System',
        responsibilities: [
            'Designed a distinctive logo and wordmark for GoldenArms, a diversified Armenian holding with logistics, import/export, and investment divisions.',
            'Created a scalable identity system for use across corporate materials, signage, and digital platforms.'
        ],
        examples: [
            {
                title: 'Concept & Symbolism:',
                description: "Visually, the logo weaves together the silhouette of Mount Ararat and a winding road. The road, subtly hidden in the mark, alludes to GoldenArms’s vital logistics and import/export services. 'Arms' stands as both an abbreviation for 'Armenians' and an embrace—signaling national reach and unity."
            },
            {
                title: 'Design Direction:',
                description: 'Clean geometry, precise spacing, and a restrained gold-on-dark palette convey stability, ambition, and trust—qualities associated with a modern holding company.'
            },
            {
                title: 'Applications:',
                description: 'Crafted responsive variants (primary, compact mark, monochrome) and a minimal usage guide for consistent deployment across print and web.'
            }
        ],
        image: 'assets/images/GoldenArms.svg'
    },
    'robs-furniture': {
        title: "Rob’s Furniture & Mattresses – Shopify E-Commerce",
        subtitle: "Web Developer / Designer – Rob’s Furniture & Mattresses (Canada)",
        platforms: "Platform: Shopify – Custom Theme, UI/UX, Payment Integration",
        technologies: "Project: RobsFurniture.ca – Complete Online Store Setup",
        responsibilities: [
            "Led end-to-end Shopify store build: store setup, theme customization, catalog structure, checkout, and launch.",
            "Designed a modern, conversion-driven UI/UX tailored to showcase furniture, promotions, and brand partners.",
            "Imported product data, defined navigation menus & categories, integrated payment, shipping, and tax settings.",
            "Developed promotions & financing banners, featuring 'WE OFFER FINANCING!' integration with Fairstone Financial.",
            "Optimized responsive experience—seamless on desktop, tablet, and mobile with intuitive calls to action.",
            "Configured Shopify domain/hosting, facilitated successful go-live, and monitored key e-commerce KPIs."
        ],
        examples: [
            {
                title: "Creative Approach:",
                description: "Married modern e-commerce functionality with the brand’s comfort-focused ethos—the homepage greets visitors with 'Discover the Art of Comfort.' Imagery and sectioning prioritize both aesthetics and easy furniture discovery."
            },
            {
                title: "Store Structure & Payments:",
                description: "Built product and collection structure to surface categories like sofas, mattresses, and promotions. Integrated payment/checkout flows tailored to furniture delivery and fulfillment." 
            },
            {
                title: "Results & Impact:",
                description: "Launched a stable, scalable Shopify experience. Storefront highlights financing, partner brands, and offers—communicating value to shoppers. Built on a flexible Shopify foundation for future marketing and growth."
            }
        ]
    },
    'robs-rebrand': {
        title: "Rob’s Furniture – Rebrand",
        subtitle: "Branding & Visual Identity Refresh for Canadian Retailer",
        platforms: "Tool: Adobe Illustrator",
        technologies: "Project: Visual Identity System, Logo, and Brand Guide",
        responsibilities: [
            "Spearheaded a comprehensive rebranding for Rob’s Furniture, including logo, palette, typography, and branded assets.",
            "Developed a friendlier, modernized look while retaining the brand’s warmth and reputation for comfort.",
            "Created assets for multi-channel use (print, web, signage) supporting the brand’s next phase of marketing."
        ],
        examples: [
            {
                title: "Logo Evolution:",
                description: "The redesigned logo introduces smoother curves and bold type, evoking both approachability and long-lasting comfort. Palette and typographic refresh tie into the store’s message: Discover the Art of Comfort."
            },
            {
                title: "Visual Elements:",
                description: "Brand graphics incorporate patterns inspired by furniture textures—softened lines, earth tones, and accent colors. Versioning and lockups support digital and signage applications."
            },
            {
                title: "Impact:",
                description: "Rebrand delivers consistent, relatable visuals that resonate in-store and online. Customers now connect with an updated, contemporary identity without losing the legacy feel of Rob’s." 
            }
        ],
        image: "assets/images/Rob's-detail.svg"
    },
    'parsa-world-rebrand': {
        title: 'Parsa World Agency – Rebrand',
        subtitle: 'Visual Identity Refresh for Digital & Social Platforms',
        platforms: 'Tool: Adobe Illustrator',
        technologies: 'Project: Logo Modernization and Brand Consistency',
        responsibilities: [
            'Refined the core Parsa World Agency logo, modernizing its shape for digital and social branding.',
            'Preserved key legacy elements so the visual lineage and existing brand recognition are retained.',
            'Adapted the logo to a circular format, improving its fit and appearance for avatars, app icons, and responsive web contexts.'
        ],
        examples: [
            {
                title: 'Legacy Meets Modern:',
                description: 'The new design preserves the spirit and color palette of the original rectangular logo while evolving to a contemporary, round layout—perfect for social profiles and device/app interfaces.'
            },
            {
                title: 'Strategic Adaptation:',
                description: 'A circular mark integrates more naturally into today’s round-cornered or circular UI environments. The update ensures the brand looks cohesive across platforms.'
            },
            {
                title: 'Brand Consistency:',
                description: 'By carefully modernizing the form while honoring brand history, the identity remains credible and instantly recognizable, but feels current on every platform.'
            }
        ],
        image: 'assets/images/Parsa-detail.png'
    }
};

// Portfolio Details Section Functionality
let currentPortfolioIndex = -1;
let portfolioIds = [];

// Get all portfolio items with data-portfolio-id
function initializePortfolioNavigation() {
    portfolioIds = [];
    document.querySelectorAll('.portfolio-item[data-portfolio-id]').forEach(item => {
        const portfolioId = item.getAttribute('data-portfolio-id');
        if (portfolioId && portfolioDetails[portfolioId]) {
            portfolioIds.push(portfolioId);
        }
    });
}

function showPortfolioDetails(portfolioId) {
    const details = portfolioDetails[portfolioId];
    if (!details) return;

    // Find current index
    currentPortfolioIndex = portfolioIds.indexOf(portfolioId);

    const detailsSection = document.getElementById('portfolio-details-section');
    const detailsContent = document.getElementById('portfolio-details-content');

    let html = `<h2>${details.title}</h2>`;

    // Use two-column layout if category is 'branding'. Otherwise simple single column.
    let isBranding = false;
    const grid = document.querySelector(`.portfolio-item[data-portfolio-id="${portfolioId}"]`);
    if (grid && grid.getAttribute('data-category') === 'branding') isBranding = true;

    if (isBranding) {
        html += `<div class="portfolio-details-grid">`;
        html += `<div class="portfolio-details-left">`;
    }

    html += `<div class="platform-info">`;
    html += `<p><strong>${details.subtitle}</strong></p>`;
    html += `<p>${details.platforms}</p>`;
    html += `<p>${details.technologies}</p>`;
    html += `</div>`;

    html += `<h3>Responsibilities & Contributions</h3>`;
    html += `<ul>`;
    details.responsibilities.forEach(resp => {
        html += `<li>${resp}</li>`;
    });
    html += `</ul>`;

    html += `<h3>Example Work</h3>`;
    details.examples.forEach(example => {
        html += `<p><strong>${example.title}</strong><br>${example.description}</p>`;
    });

    if (isBranding) {
        html += `</div>`; // end left
        html += `<div class="portfolio-details-right">`;
        if (details.image) {
            html += `<div class="portfolio-detail-image-container">`;
            html += `<img src="${details.image}" alt="${details.title}" class="portfolio-detail-image">`;
            html += `</div>`;
        }
        html += `</div>`; // end right
        html += `</div>`; // end grid
    }

    detailsContent.innerHTML = html;
    detailsSection.classList.add('active');

    // Update navigation buttons
    updateNavigationButtons();

    // Scroll to details section smoothly
    detailsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('portfolio-prev-btn');
    const nextBtn = document.getElementById('portfolio-next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentPortfolioIndex <= 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPortfolioIndex >= portfolioIds.length - 1;
    }
}

function navigatePortfolio(direction) {
    if (direction === 'prev' && currentPortfolioIndex > 0) {
        const prevId = portfolioIds[currentPortfolioIndex - 1];
        showPortfolioDetails(prevId);
    } else if (direction === 'next' && currentPortfolioIndex < portfolioIds.length - 1) {
        const nextId = portfolioIds[currentPortfolioIndex + 1];
        showPortfolioDetails(nextId);
    }
}

// Make function globally accessible
window.navigatePortfolio = navigatePortfolio;

function hidePortfolioDetails() {
    const detailsSection = document.getElementById('portfolio-details-section');
    if (detailsSection) {
        detailsSection.classList.remove('active');
        
        // Scroll back to portfolio section
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Make function globally accessible
window.hidePortfolioDetails = hidePortfolioDetails;

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Calculate experience years
    calculateExperience();
    
    // Initialize portfolio navigation
    initializePortfolioNavigation();
    
    // Initialize portfolio view buttons
    document.querySelectorAll('.portfolio-view-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const portfolioId = button.getAttribute('data-portfolio-id');
            if (portfolioId) {
                showPortfolioDetails(portfolioId);
            }
        });
    });
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add slide animations to specific elements
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
    }
    if (aboutImage) {
        aboutImage.classList.add('slide-in-right');
        observer.observe(aboutImage);
    }
    
    // Add animations to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.classList.add('fade-in');
        category.style.animationDelay = `${index * 0.1}s`;
        observer.observe(category);
    });
    
    // Add animations to experience items
    const experienceItems = document.querySelectorAll('.experience-item-sidebar');
    experienceItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Add animations to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Add animations to blog posts
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach((post, index) => {
        post.classList.add('fade-in');
        post.style.animationDelay = `${index * 0.1}s`;
        observer.observe(post);
    });
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Typing animation that preserves HTML structure and colors
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const terminal = document.querySelector('.terminal');
    
    // Hide all elements initially
    if (heroTitle) heroTitle.style.opacity = '0';
    if (heroSubtitle) heroSubtitle.style.opacity = '0';
    if (heroDescription) heroDescription.style.opacity = '0';
    if (heroButtons) heroButtons.style.opacity = '0';
    if (terminal) terminal.style.opacity = '0';
    
    if (heroTitle) {
        // Get the text content to type
        const fullText = "Hi, I'm Payam Dehkordy";
        const nameStart = "Hi, I'm ";
        const name = "Payam Dehkordy";
        
        let charIndex = 0;
        
        function typeText() {
            if (charIndex <= fullText.length) {
                const currentText = fullText.substring(0, charIndex);
                
                // Build HTML with proper structure
                if (charIndex <= nameStart.length) {
                    // Typing "Hi, I'm "
                    heroTitle.innerHTML = `
                        <span class="code-symbol">&lt;</span>${currentText}<span class="code-symbol">/&gt;</span>
                    `;
                } else {
                    // Typing the name with highlight
                    const nameChars = currentText.substring(nameStart.length);
                    heroTitle.innerHTML = `
                        <span class="code-symbol">&lt;</span>${nameStart}<span class="highlight">${nameChars}</span><span class="code-symbol">/&gt;</span>
                    `;
                }
                
                charIndex++;
                setTimeout(typeText, 50);
            } else {
                // Title animation complete, animate other elements
                animateHeroElements();
            }
        }
        
        function animateHeroElements() {
            // Animate subtitle with fade-in and slide-up
            setTimeout(() => {
                if (heroSubtitle) {
                    heroSubtitle.style.transition = 'opacity 1s ease, transform 1s ease';
                    heroSubtitle.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        heroSubtitle.style.opacity = '1';
                        heroSubtitle.style.transform = 'translateY(0)';
                    }, 50);
                }
            }, 600);
            
            // Animate description
            setTimeout(() => {
                if (heroDescription) {
                    heroDescription.style.transition = 'opacity 1s ease, transform 1s ease';
                    heroDescription.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        heroDescription.style.opacity = '1';
                        heroDescription.style.transform = 'translateY(0)';
                    }, 50);
                }
            }, 1400);
            
            // Animate buttons
            setTimeout(() => {
                if (heroButtons) {
                    heroButtons.style.transition = 'opacity 1s ease, transform 1s ease';
                    heroButtons.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        heroButtons.style.opacity = '1';
                        heroButtons.style.transform = 'translateY(0)';
                    }, 50);
                }
            }, 2200);
            
            // Animate terminal with realistic typing
            setTimeout(() => {
                if (terminal) {
                    terminal.style.transition = 'opacity 1s ease, transform 1s ease';
                    terminal.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        terminal.style.opacity = '1';
                        terminal.style.transform = 'translateY(0)';
                        // Start typing after terminal fully fades in (doubled speed: 1000ms -> 500ms)
                        setTimeout(() => {
                            animateTerminal(terminal);
                        }, 500);
                    }, 50);
                }
            }, 3000);
        }
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            typeText();
        }, 500);
    }
});

// Terminal typing animation
function animateTerminal(terminal) {
    const lines = [
        { type: 'command', text: '$ whoami', delay: 0 },
        { type: 'output', text: 'payam.dehkordy', delay: 600 },
        { type: 'command', text: '$ whereis location', delay: 500 },
        { type: 'output', text: 'Yerevan, Armenia', delay: 600 },
        { type: 'command', text: '$ which company', delay: 500 },
        { type: 'output', text: 'Synopsys', delay: 600 },
        { type: 'command', text: '$ skills --list', delay: 500 },
        { type: 'output', text: 'QA Automation | Full Stack Dev | Electronic Engineering', delay: 600 }
    ];
    
    terminal.innerHTML = '<span class="terminal-cursor">█</span>';
    
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    
    function typeLine() {
        if (currentLineIndex >= lines.length) {
            // Remove cursor when done
            const cursor = terminal.querySelector('.terminal-cursor');
            if (cursor) cursor.remove();
            return;
        }
        
        const line = lines[currentLineIndex];
        
        if (currentCharIndex === 0) {
            // Start new line - remove cursor
            const cursor = terminal.querySelector('.terminal-cursor');
            if (cursor) cursor.remove();
            
            // Add line break if not first line
            if (currentLineIndex > 0) {
                terminal.innerHTML += '<br>';
            }
            
            // Add line container
            if (line.type === 'command') {
                terminal.innerHTML += '<span class="terminal-line"></span>';
            } else {
                terminal.innerHTML += '<span class="terminal-output"></span>';
            }
        }
        
        // Type character only for commands, show output instantly
        const lineElements = terminal.querySelectorAll(
            line.type === 'command' ? '.terminal-line' : '.terminal-output'
        );
        const lineElement = lineElements[lineElements.length - 1];
        
        if (lineElement && currentCharIndex < line.text.length) {
            if (line.type === 'command') {
                // Type commands character by character
                lineElement.textContent += line.text[currentCharIndex];
                currentCharIndex++;
                
                // Remove old cursor and add new one after current text
                const oldCursor = terminal.querySelector('.terminal-cursor');
                if (oldCursor) oldCursor.remove();
                lineElement.insertAdjacentHTML('afterend', '<span class="terminal-cursor">█</span>');
                
                // Continue typing command (doubled speed: 150ms -> 75ms)
                setTimeout(typeLine, 75);
            } else {
                // Show output instantly
                lineElement.textContent = line.text;
                currentCharIndex = line.text.length;
                
                // Remove old cursor and add new one after output
                const oldCursor = terminal.querySelector('.terminal-cursor');
                if (oldCursor) oldCursor.remove();
                lineElement.insertAdjacentHTML('afterend', '<span class="terminal-cursor">█</span>');
                
                // Move to next line after delay
                setTimeout(() => {
                    currentCharIndex = 0;
                    currentLineIndex++;
                    setTimeout(typeLine, line.delay);
                }, 50);
            }
        } else if (currentCharIndex >= line.text.length) {
            // Line complete, move to next
            currentCharIndex = 0;
            currentLineIndex++;
            
            // Delay before next line
            setTimeout(typeLine, line.delay);
        }
    }
    
    // Start typing after a brief delay (doubled speed: 800ms -> 400ms)
    setTimeout(typeLine, 400);
}

// Parallax effect for both columns with different speeds
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const experienceSidebar = document.querySelector('.experience-sidebar');
    
    if (hero) {
        const heroRate = scrolled * -0.3;
        hero.style.transform = `translateY(${heroRate}px)`;
    }
    
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

// Add lazy loading to all images
document.querySelectorAll('img').forEach(img => {
    if (img.src) {
        img.dataset.src = img.src;
        img.classList.add('lazy');
        imageObserver.observe(img);
    }
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 38px;
    height: 38px;
    border: none;
    border-radius: 50%;
    background: #C29734;
    color: #23272f;
    font-size: 1.2rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.12);
    z-index: 1002;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    .back-to-top:hover {
        background: #a88326;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Reset scroll position on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Reset scroll position on page refresh
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Fix animation retriggering by resetting intersection observer
function resetAnimations() {
    // Reset all animated elements
    const animatedElements = document.querySelectorAll('.experience-item-sidebar, .skill-category, .portfolio-item, .blog-post, .stat');
    animatedElements.forEach(element => {
        element.classList.remove('animate');
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });
    
    // Reinitialize intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Re-observe all elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Reset animations on scroll to top
window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        setTimeout(resetAnimations, 100);
    }
});

var form = document.getElementById("my-form");
if (form) {
  form.addEventListener("submit", async function(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(form);
    var submitBtn = document.getElementById('my-form-button');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
    fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        // Remove the button and show the message in its place
        if (submitBtn) {
          submitBtn.parentNode.removeChild(submitBtn);
        }
        status.innerHTML = "Thanks for your submission!";
        status.style.color = "#C29734";
        form.reset();
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form.";
          }
          status.style.color = "red";
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
        });
      }
    }).catch(() => {
      status.innerHTML = "Oops! There was a problem submitting your form.";
      status.style.color = "red";
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  });
}

// Custom Calendly Modal Functions
function openCalendlyModal() {
  const modal = document.getElementById('calendly-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Wait for Calendly to load, then initialize widget only once
    function initCalendly() {
      if (typeof Calendly !== 'undefined') {
        const container = document.querySelector('.calendly-inline-widget-container');
        if (container && !container.hasAttribute('data-initialized')) {
          // Clear any existing content first
          container.innerHTML = '';
          
          // Create the widget div with data-url attribute
          const widget = document.createElement('div');
          widget.className = 'calendly-inline-widget';
          widget.setAttribute('data-url', 'https://calendly.com/payam-dehkordy/15min');
          widget.style.minWidth = '320px';
          widget.style.height = '630px';
          container.appendChild(widget);
          
          // Initialize the widget
          try {
            Calendly.initInlineWidget({
              url: 'https://calendly.com/payam-dehkordy/15min',
              parentElement: widget
            });
          } catch (e) {
            console.warn('Calendly initialization error:', e);
            // Fallback: let the data-url attribute handle it
          }
          
          container.setAttribute('data-initialized', 'true');
        }
      } else {
        // Retry if Calendly not loaded yet
        setTimeout(initCalendly, 100);
      }
    }
    
    initCalendly();
  }
}

function closeCalendlyModal() {
  const modal = document.getElementById('calendly-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Clear the widget content when closing to prevent double loading
    const container = document.querySelector('.calendly-inline-widget-container');
    if (container) {
      container.removeAttribute('data-initialized');
      container.innerHTML = '';
    }
  }
}

// Calendly Modal Button Handler
document.addEventListener('DOMContentLoaded', () => {
  const bookCallBtn = document.getElementById('book-call-btn');
  
  if (bookCallBtn) {
    bookCallBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openCalendlyModal();
    });
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeCalendlyModal();
    }
  });
});

// Make functions globally accessible
window.openCalendlyModal = openCalendlyModal;
window.closeCalendlyModal = closeCalendlyModal;


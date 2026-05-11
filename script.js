// Calculate years of experience dynamically
// This automatically calculates experience from 2017 to current year
function calculateExperience() {
    const currentYear = new Date().getFullYear();

    document.querySelectorAll('[data-start-year]').forEach((element) => {
        const startYear = parseInt(element.getAttribute('data-start-year'), 10);
        if (Number.isNaN(startYear)) return;
        const years = Math.max(0, currentYear - startYear);
        element.textContent = `${years}+`;
    });
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Unified smooth-scroll: all same-page anchor links use scroll-margin-top from CSS
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href === '#' || anchor.hasAttribute('onclick')) return;
    try {
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } catch (_) { /* invalid selector from hash */ }
});

// Handle hash on page load (cross-page anchor links)
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        try {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            }
        } catch (_) { /* invalid selector */ }
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

// Apply portfolio filter from URL query, e.g. ?portfolioFilter=fullstack#portfolio
function applyPortfolioFilterFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const filterFromUrl = params.get('portfolioFilter');
    if (!filterFromUrl) return;

    const targetButton = document.querySelector(`.filter-btn[data-filter="${filterFromUrl}"]`);
    if (targetButton) {
        targetButton.click();
    }
}

// Portfolio data loaded from portfolio-data.js (global var, must be included before this script)

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

    let html = `<div class="portfolio-details-title-row">`;
    html += `<h2>${details.title}</h2>`;
    if (details.liveUrl) {
        html += `<a href="${details.liveUrl}" target="_blank" rel="noopener" class="portfolio-details-live-btn">Visit Live Project</a>`;
    }
    html += `</div>`;

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
    applyPortfolioFilterFromUrl();
    
    // Initialize portfolio view buttons
    document.querySelectorAll('.portfolio-view-btn[data-portfolio-id]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const portfolioId = button.getAttribute('data-portfolio-id');
            if (portfolioId) {
                showPortfolioDetails(portfolioId);
            }
        });
    });

    // Enable clicking anywhere on a portfolio card to open details
    document.querySelectorAll('.portfolio-item[data-portfolio-id]').forEach((item) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', (e) => {
            // Let buttons/links behave normally
            if (e.target.closest('button, a')) return;

            const portfolioId = item.getAttribute('data-portfolio-id');
            if (portfolioId) {
                showPortfolioDetails(portfolioId);
            }
        });
    });
    
    // Add fade-in animation to sections (hero has its own animation)
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
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
    
});

// Hero animation: typing + sequential reveal
// .hero-hidden  = invisible starting state (no transition — instant hide)
// .hero-revealed = visible final state (permanent, single source of truth)
// revealElement swaps .hero-hidden → .hero-revealed with a one-shot
// inline transition that is removed after the animation completes.
function revealElement(el, delay, cb) {
    if (!el) return;
    setTimeout(() => {
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        void el.offsetHeight;
        el.classList.remove('hero-hidden');
        el.classList.add('hero-revealed');

        let fired = false;
        const cleanup = () => {
            if (fired) return;
            fired = true;
            el.style.transition = '';
            if (cb) cb();
        };
        el.addEventListener('transitionend', cleanup, { once: true });
        setTimeout(cleanup, 1200);
    }, delay);
}

document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroEls = {
        subtitle: document.querySelector('.hero-subtitle'),
        tagline: document.querySelector('.hero-tagline'),
        description: document.querySelector('.hero-description'),
        buttons: document.querySelector('.hero-buttons'),
        terminal: document.querySelector('.terminal'),
    };

    [heroTitle, ...Object.values(heroEls)].forEach(el => { if (el) el.classList.add('hero-hidden'); });

    if (!heroTitle) return;

    const fullText = "Hi, I'm Payam Dehkordy";
    const nameStart = "Hi, I'm ";
    let charIndex = 0;

    function typeText() {
        if (charIndex <= fullText.length) {
            const current = fullText.substring(0, charIndex);
            if (charIndex <= nameStart.length) {
                heroTitle.innerHTML = `<span class="code-symbol">&lt;</span>${current}<span class="code-symbol">/&gt;</span>`;
            } else {
                heroTitle.innerHTML = `<span class="code-symbol">&lt;</span>${nameStart}<span class="highlight">${current.substring(nameStart.length)}</span><span class="code-symbol">/&gt;</span>`;
            }
            charIndex++;
            setTimeout(typeText, 50);
        } else {
            revealElement(heroEls.subtitle, 600);
            revealElement(heroEls.tagline, 1150);
            revealElement(heroEls.description, 1850);
            revealElement(heroEls.buttons, 2650);
            revealElement(heroEls.terminal, 3450, () => animateTerminal(heroEls.terminal));
        }
    }

    setTimeout(() => {
        heroTitle.classList.remove('hero-hidden');
        heroTitle.classList.add('hero-revealed');
        typeText();
    }, 500);
});

// Parallax: hero slides up as user scrolls down
(function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                hero.style.transform = `translateY(${window.pageYOffset * -0.3}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
})();

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
        { type: 'output', text: 'QA Automation', delay: 600 },
        { type: 'output', text: 'Full-Stack Development', delay: 600 },
        { type: 'output', text: 'EDA Quality', delay: 600 },
        { type: 'output', text: 'AI Agent & Workflow Automation', delay: 600 }
    ];
    
    terminal.innerHTML = '<span class="terminal-cursor">█</span>';
    
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    
    function typeLine() {
        if (currentLineIndex >= lines.length) {
            return;
        }
        
        const line = lines[currentLineIndex];
        
        if (currentCharIndex === 0) {
            const cursor = terminal.querySelector('.terminal-cursor');
            if (cursor) cursor.remove();
            const promptLine = terminal.querySelector('.terminal-prompt-line');
            if (promptLine) promptLine.remove();
            
            if (currentLineIndex > 0) {
                terminal.innerHTML += '<br>';
            }
            
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
                lineElement.textContent = line.text;
                currentCharIndex = line.text.length;
                
                const oldCursor = terminal.querySelector('.terminal-cursor');
                if (oldCursor) oldCursor.remove();

                const nextLine = lines[currentLineIndex + 1];
                const nextIsCommand = nextLine && nextLine.type === 'command';
                const isLast = !nextLine;

                if (nextIsCommand || isLast) {
                    terminal.innerHTML += '<span class="terminal-prompt-line"><br><span class="terminal-prompt">$ </span><span class="terminal-cursor">█</span></span>';
                } else {
                    lineElement.insertAdjacentHTML('afterend', '<span class="terminal-cursor">█</span>');
                }
                
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

// Back to top (button is in HTML)
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        const show = window.pageYOffset > 300;
        backToTopBtn.style.opacity = show ? '1' : '0';
        backToTopBtn.style.visibility = show ? 'visible' : 'hidden';
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}



function portfolioMailErrorMessage(payload) {
  if (!payload || typeof payload !== 'object') return 'Something went wrong. Please try again or email directly.';
  const d = payload.detail;
  if (typeof d === 'string') return d;
  if (Array.isArray(d)) {
    return d.map((e) => (e && (e.msg || e.message)) || '').filter(Boolean).join('. ') || 'Invalid input.';
  }
  return 'Something went wrong. Please try again or email directly.';
}

function setFormStatus(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('form-status--error');
  if (type) el.classList.add('form-status--' + type);
}

function clearFieldErrors(formEl) {
  formEl.querySelectorAll('.form-field--invalid').forEach(function(f) {
    f.classList.remove('form-field--invalid');
  });
  formEl.querySelectorAll('.form-field-error').forEach(function(e) {
    e.remove();
  });
}

function showFieldError(field, msg) {
  field.classList.add('form-field--invalid');
  var hint = document.createElement('p');
  hint.className = 'form-field-error';
  hint.textContent = msg;
  field.parentNode.appendChild(hint);
  field.addEventListener('input', function handler() {
    field.classList.remove('form-field--invalid');
    if (hint.parentNode) hint.remove();
    field.removeEventListener('input', handler);
  });
}

function validateField(field) {
  if (field.validity.valueMissing) {
    showFieldError(field, 'This field is required.');
    return false;
  }
  if (field.validity.typeMismatch && field.type === 'email') {
    showFieldError(field, 'Please enter a valid email address.');
    return false;
  }
  return true;
}

function validateForm(formEl) {
  clearFieldErrors(formEl);
  var fields = formEl.querySelectorAll('input[required], textarea[required]');
  var firstInvalid = null;
  fields.forEach(function(f) {
    if (f.offsetParent === null) return;
    if (!validateField(f) && !firstInvalid) firstInvalid = f;
  });
  if (firstInvalid) { firstInvalid.focus(); return false; }
  return true;
}

var form = document.getElementById("my-form");
if (form) {
  var contactStatus = document.getElementById("my-form-status");
  var contactBtn = document.getElementById('my-form-button');
  var contactBtnLabel = contactBtn ? contactBtn.textContent : 'Send Message';

  form.addEventListener("submit", async function(event) {
    event.preventDefault();
    if (!validateForm(form)) return;

    var hp = form.querySelector('[name="website"]');
    if (contactBtn) {
      contactBtn.disabled = true;
      contactBtn.textContent = 'Sending\u2026';
    }
    setFormStatus(contactStatus, '', '');
    var payload = {
      kind: 'contact',
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim(),
      website: hp ? hp.value : ''
    };
    try {
      var response = await fetch('/api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        form.reset();
        if (contactBtn) {
          contactBtn.textContent = 'Sent';
          contactBtn.classList.add('btn--sent');
          setTimeout(function() {
            contactBtn.classList.remove('btn--sent');
            contactBtn.textContent = contactBtnLabel;
            contactBtn.disabled = false;
          }, 2500);
        }
      } else {
        var errBody = null;
        try { errBody = await response.json(); } catch (_) {}
        setFormStatus(contactStatus, portfolioMailErrorMessage(errBody), 'error');
        if (contactBtn) {
          contactBtn.disabled = false;
          contactBtn.textContent = contactBtnLabel;
        }
      }
    } catch (_) {
      setFormStatus(contactStatus, 'Could not send \u2014 try again later.', 'error');
      if (contactBtn) {
        contactBtn.disabled = false;
        contactBtn.textContent = contactBtnLabel;
      }
    }
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

  var referralForm = document.getElementById('referral-form');
  if (referralForm) {
    var referralStatusEl = document.getElementById('referral-form-status');
    var referralSubmitBtn = document.getElementById('referral-submit-btn');
    var referralBtnLabel = referralSubmitBtn ? referralSubmitBtn.textContent : 'Refer me';

    function resetReferralBtn() {
      if (!referralSubmitBtn) return;
      referralSubmitBtn.disabled = false;
      referralSubmitBtn.textContent = referralBtnLabel;
    }

    referralForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      if (!validateForm(referralForm)) return;
      var recipientInput = document.getElementById('referral-recipient');

      var hp = referralForm.querySelector('[name="website"]');

      referralSubmitBtn.disabled = true;
      referralSubmitBtn.textContent = 'Sending\u2026';
      setFormStatus(referralStatusEl, '', '');

      try {
        var res = await fetch('/api/mail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            kind: 'referral',
            recipient_email: recipientInput.value.trim(),
            website: hp ? hp.value : ''
          })
        });

        if (res.ok) {
          referralForm.reset();
          referralSubmitBtn.textContent = 'Sent';
          referralSubmitBtn.classList.add('btn--sent');
          setTimeout(function() {
            referralSubmitBtn.classList.remove('btn--sent');
            resetReferralBtn();
          }, 2500);
          return;
        }

        var errBody = null;
        try { errBody = await res.json(); } catch (_) {}
        setFormStatus(referralStatusEl, portfolioMailErrorMessage(errBody), 'error');
        resetReferralBtn();
      } catch (_) {
        setFormStatus(referralStatusEl, 'Could not send \u2014 try again later.', 'error');
        resetReferralBtn();
      }
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


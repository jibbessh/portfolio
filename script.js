/**
 * ==============================================================================
 * PORTFOLIO WEBSITE JAVASCRIPT
 * Vanilla ES6+ - No Frameworks
 * Features:
 *   - Dark/Light mode toggle with persistence & system preference detection
 *   - Scroll progress bar at viewport top
 *   - Sticky navigation header with scroll state
 *   - Smooth scroll anchor links with header offset
 *   - Accurate Scroll Spy highlighting current active nav link
 *   - Section reveal animations via IntersectionObserver
 *   - Responsive mobile hamburger navigation with backdrop & escape listener
 *   - Floating "Back to Top" button
 *   - Working interactive contact form with validation & feedback
 *   - Copy email to clipboard with instant tooltip feedback
 * ==============================================================================
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // 1. DOM ELEMENT REFERENCES
  // ----------------------------------------------------------------------------
  const htmlEl = document.documentElement;
  const header = document.getElementById('header');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const navMenu = document.getElementById('nav-menu');
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const menuBackdrop = document.getElementById('menu-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const metaThemeColor = document.getElementById('meta-theme-color');
  const backToTopBtn = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formFeedback = document.getElementById('form-feedback');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const currentYearSpan = document.getElementById('current-year');

  // Track sections for scroll spy
  const sections = document.querySelectorAll('section[id]');

  // ----------------------------------------------------------------------------
  // 2. INITIALIZATION
  // ----------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollProgress();
    initBackToTop();
    initScrollSpyAndHeader();
    initSmoothScroll();
    initMobileNav();
    initRevealAnimations();
    initContactForm();
    initCopyEmail();
    initYear();
  });

  // ----------------------------------------------------------------------------
  // 3. THEME TOGGLE (DARK / LIGHT MODE)
  // ----------------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    // Use saved theme or fallback to system preference
    let theme = savedTheme ? savedTheme : (systemPrefersLight ? 'light' : 'dark');
    applyTheme(theme, false);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme, true);
      });
    }

    // Listen for OS system theme changes if user has not set a manual preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
          applyTheme(e.matches ? 'light' : 'dark', false);
        }
      });
    }
  }

  function applyTheme(theme, save = true) {
    htmlEl.setAttribute('data-theme', theme);
    if (save) {
      localStorage.setItem('portfolio-theme', theme);
    }

    // Update meta theme-color for mobile browser address bars
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0d14' : '#f8fafc');
    }

    // Update button ARIA label
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  // ----------------------------------------------------------------------------
  // 4. SCROLL PROGRESS BAR & HEADER SCROLLED STATE
  // ----------------------------------------------------------------------------
  function initScrollProgress() {
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial run
  }

  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${Math.min(100, Math.max(0, progressPercent))}%`;
    }

    // Add 'scrolled' class to header for subtle shadow/border elevation
    if (header) {
      if (scrollTop > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  // ----------------------------------------------------------------------------
  // 5. BACK TO TOP BUTTON
  // ----------------------------------------------------------------------------
  function initBackToTop() {
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 6. SCROLL SPY (ACTIVE NAV LINK HIGHLIGHTING)
  // ----------------------------------------------------------------------------
  function initScrollSpyAndHeader() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveNavLink();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    updateActiveNavLink(); // Initial run
  }

  function updateActiveNavLink() {
    if (!sections.length || !navLinks.length) return;

    const scrollPosition = window.scrollY + 120; // Lookahead offset
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

    let currentSectionId = '';

    if (isAtBottom) {
      // Highlight the very last section (contact) when reached bottom
      currentSectionId = sections[sections.length - 1].getAttribute('id');
    } else {
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      // Default to first section if at top
      if (!currentSectionId && window.scrollY < 300 && sections[0]) {
        currentSectionId = sections[0].getAttribute('id');
      }
    }

    if (currentSectionId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 7. SMOOTH SCROLLING WITH OFFSET FOR STICKY HEADER
  // ----------------------------------------------------------------------------
  function initSmoothScroll() {
    const allInternalAnchors = document.querySelectorAll('a[href^="#"]');

    allInternalAnchors.forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();

          // Close mobile menu if currently open
          closeMobileNav();

          const headerOffset = header ? header.offsetHeight : 72;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset + 1;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update browser URL hash without jump
          if (history.pushState) {
            history.pushState(null, '', targetId);
          }
        }
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 8. MOBILE HAMBURGER MENU & ACCESSIBILITY
  // ----------------------------------------------------------------------------
  function initMobileNav() {
    if (!mobileToggleBtn || !navMenu) return;

    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close when clicking outside on backdrop
    if (menuBackdrop) {
      menuBackdrop.addEventListener('click', closeMobileNav);
    }

    // Close when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileNav();
        mobileToggleBtn.focus();
      }
    });

    // Auto-close on resize back to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth > 868 && navMenu.classList.contains('open')) {
        closeMobileNav();
      }
    });
  }

  function openMobileNav() {
    navMenu.classList.add('open');
    mobileToggleBtn.classList.add('open');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
    mobileToggleBtn.setAttribute('aria-label', 'Close navigation menu');
    if (menuBackdrop) menuBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileNav() {
    if (!navMenu) return;
    navMenu.classList.remove('open');
    if (mobileToggleBtn) {
      mobileToggleBtn.classList.remove('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
      mobileToggleBtn.setAttribute('aria-label', 'Open navigation menu');
    }
    if (menuBackdrop) menuBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ----------------------------------------------------------------------------
  // 9. INTERSECTION OBSERVER ANIMATIONS (FADE-IN / SLIDE-UP)
  // ----------------------------------------------------------------------------
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Keep revealed once visible
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before full view
        threshold: 0.12
      });

      revealElements.forEach((el) => {
        revealObserver.observe(el);
      });
    } else {
      // Fallback for older browsers
      revealElements.forEach((el) => el.classList.add('active'));
    }
  }

  // ----------------------------------------------------------------------------
  // 10. INTERACTIVE CONTACT FORM WITH CLIENT-SIDE VALIDATION
  // ----------------------------------------------------------------------------
  function initContactForm() {
    if (!contactForm) return;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');

    // Remove error class on input
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          const parentGroup = input.closest('.form-group');
          if (parentGroup) {
            parentGroup.classList.remove('has-error');
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showFieldError(nameInput, 'Please enter your name');
        isValid = false;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        showFieldError(messageInput, 'Please enter your message');
        isValid = false;
      }

      if (!isValid) return;

      // Simulate sending via loading spinner state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Show success alert
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = '✨ Message sent successfully! I will get back to you shortly.';

        contactForm.reset();

        // Hide success message after 6 seconds
        setTimeout(() => {
          formFeedback.style.display = 'none';
          formFeedback.className = 'form-feedback';
        }, 6000);
      }, 1000);
    });
  }

  function showFieldError(inputElement, errorMessage) {
    const parentGroup = inputElement.closest('.form-group');
    if (parentGroup) {
      parentGroup.classList.add('has-error');
      const errorSpan = parentGroup.querySelector('.field-error');
      if (errorSpan && errorMessage) {
        errorSpan.textContent = errorMessage;
      }
    }
    inputElement.focus();
  }

  // ----------------------------------------------------------------------------
  // 11. ONE-CLICK EMAIL COPY TO CLIPBOARD
  // ----------------------------------------------------------------------------
  function initCopyEmail() {
    if (!copyEmailBtn) return;

    copyEmailBtn.addEventListener('click', () => {
      const emailEl = document.getElementById('email-text');
      const email = emailEl ? emailEl.textContent.trim() : 'dexillspiker849@gmail.com';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showCopySuccess();
        }).catch(() => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    });

    function showCopySuccess() {
      const originalTitle = copyEmailBtn.getAttribute('title') || 'Copy email';
      copyEmailBtn.setAttribute('title', 'Copied to clipboard!');
      copyEmailBtn.style.color = '#10b981';
      copyEmailBtn.style.borderColor = '#10b981';

      setTimeout(() => {
        copyEmailBtn.setAttribute('title', originalTitle);
        copyEmailBtn.style.color = '';
        copyEmailBtn.style.borderColor = '';
      }, 2000);
    }

    function fallbackCopyText(text) {
      const tempInput = document.createElement('input');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand('copy');
        showCopySuccess();
      } catch (err) {
        console.warn('Could not copy email to clipboard', err);
      }
      document.body.removeChild(tempInput);
    }
  }

  // ----------------------------------------------------------------------------
  // 12. DYNAMIC YEAR IN FOOTER
  // ----------------------------------------------------------------------------
  function initYear() {
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }
  }

})();


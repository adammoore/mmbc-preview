/**
 * ========================================
 * MMBC Website JavaScript
 * Interactive functionality with accessibility focus
 * ========================================
 */

/**
 * Wrap all code in IIFE (Immediately Invoked Function Expression)
 * This prevents polluting the global namespace and avoids conflicts
 */
(function() {
  'use strict';  // Enable strict mode for better error catching

  /**
   * ========================================
   * MOBILE NAVIGATION MENU
   * ========================================
   * Handles the hamburger menu toggle on mobile devices
   */

  /**
   * Initialize mobile menu functionality
   * Sets up event listeners for menu toggle and closes menu when clicking links
   */
  function initMobileMenu() {
    // Get references to DOM elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Guard clause - exit if elements don't exist
    if (!mobileMenuToggle || !mainNav) {
      return;
    }

    /**
     * Toggle mobile menu open/closed
     * Updates ARIA attributes for accessibility
     */
    function toggleMobileMenu() {
      // Check current state from aria-expanded attribute
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle the state
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');

      // Prevent body scroll when menu is open (improves mobile UX)
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    /**
     * Close mobile menu
     * Used when clicking navigation links or outside the menu
     */
    function closeMobileMenu() {
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Add click event listener to toggle button
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking any navigation link
    navLinks.forEach(function(link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when pressing Escape key (accessibility feature)
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && mainNav.classList.contains('active')) {
        closeMobileMenu();
        mobileMenuToggle.focus();  // Return focus to toggle button
      }
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
      const isClickInsideNav = mainNav.contains(event.target);
      const isClickOnToggle = mobileMenuToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  /**
   * ========================================
   * SMOOTH SCROLLING FOR ANCHOR LINKS
   * ========================================
   * Provides smooth scrolling behavior when clicking navigation links
   * Falls back to native behavior if browser doesn't support smooth scroll
   */

  /**
   * Initialize smooth scrolling
   * Adds custom scroll behavior to all anchor links pointing to page sections
   */
  function initSmoothScroll() {
    // Get all anchor links that point to sections on the page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        // Get the target element ID from the href attribute
        const targetId = this.getAttribute('href');
        
        // Skip if it's just a '#' with no target
        if (targetId === '#') {
          return;
        }

        // Find the target element
        const targetElement = document.querySelector(targetId);

        // If target exists, perform smooth scroll
        if (targetElement) {
          event.preventDefault();  // Prevent default jump behavior

          // Calculate the position to scroll to
          // Account for fixed header height
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;

          // Perform smooth scroll
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL hash without jumping (for browser history)
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }

          // Move focus to the target element for keyboard navigation
          // This is important for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
          
          // Remove tabindex after focus (keeps normal tab flow)
          targetElement.addEventListener('blur', function() {
            targetElement.removeAttribute('tabindex');
          }, { once: true });
        }
      });
    });
  }

  /**
   * ========================================
   * ACCORDION FUNCTIONALITY
   * ========================================
   * Handles expandable/collapsible sections for contact information
   */

  /**
   * Initialize accordion
   * Sets up click handlers for accordion triggers
   */
  function initAccordion() {
    // Get all accordion trigger buttons
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function() {
        // Get current expanded state
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Get the content panel controlled by this trigger
        const contentId = this.getAttribute('aria-controls');
        const content = document.getElementById(contentId);

        if (!content) {
          return;
        }

        // Toggle expanded state
        this.setAttribute('aria-expanded', !isExpanded);

        // Show/hide content panel
        if (isExpanded) {
          content.setAttribute('hidden', '');
          this.querySelector('.accordion-icon').textContent = '+';
        } else {
          content.removeAttribute('hidden');
          this.querySelector('.accordion-icon').textContent = '−';
        }
      });

      // Keyboard support - allow Enter and Space to toggle accordion
      trigger.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.click();
        }
      });
    });
  }

  /**
   * ========================================
   * ACTIVE NAVIGATION HIGHLIGHTING
   * ========================================
   * Updates which navigation item appears active based on scroll position
   */

  /**
   * Update active navigation item based on current scroll position
   * Uses Intersection Observer API for efficient scroll detection
   */
  function initActiveNavigation() {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    // Guard clause
    if (navLinks.length === 0 || sections.length === 0) {
      return;
    }

    /**
     * Intersection Observer options
     * rootMargin accounts for header height
     * threshold determines how much of section needs to be visible
     */
    const observerOptions = {
      root: null,  // Use viewport as root
      rootMargin: '-80px 0px -80% 0px',  // Account for header and focus on top section
      threshold: 0
    };

    /**
     * Callback function for Intersection Observer
     * Updates aria-current attribute on navigation links
     */
    function handleIntersection(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          
          // Remove aria-current from all nav links
          navLinks.forEach(function(link) {
            link.removeAttribute('aria-current');
          });

          // Add aria-current to the corresponding nav link
          const activeLink = document.querySelector('.nav-list a[href="#' + sectionId + '"]');
          if (activeLink) {
            activeLink.setAttribute('aria-current', 'page');
          }
        }
      });
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all sections
    sections.forEach(function(section) {
      observer.observe(section);
    });
  }

  /**
   * ========================================
   * HEADER SCROLL EFFECT
   * ========================================
   * Adds shadow to header when scrolling down for better visual separation
   */

  /**
   * Initialize header scroll effect
   * Adds/removes class based on scroll position
   */
  function initHeaderScrollEffect() {
    const header = document.querySelector('.site-header');
    
    if (!header) {
      return;
    }

    /**
     * Handle scroll events
     * Adds 'scrolled' class when page is scrolled down
     */
    function handleScroll() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Use throttle to limit how often the function runs (performance optimization)
    let ticking = false;
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * ========================================
   * LAZY LOADING FOR IMAGES
   * ========================================
   * Improves page load performance by loading images only when needed
   */

  /**
   * Initialize lazy loading for images
   * Uses Intersection Observer to load images as they come into viewport
   */
  function initLazyLoading() {
    // Get all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');

    if (lazyImages.length === 0 || !('IntersectionObserver' in window)) {
      return;  // Exit if no lazy images or browser doesn't support IntersectionObserver
    }

    /**
     * Intersection Observer for lazy loading
     */
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Replace src with data-src to trigger image load
          img.src = img.dataset.src;
          
          // Remove data-src attribute
          img.removeAttribute('data-src');
          
          // Add loaded class for CSS transitions
          img.classList.add('loaded');
          
          // Stop observing this image
          observer.unobserve(img);
        }
      });
    });

    // Observe all lazy images
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  /**
   * ========================================
   * FORM VALIDATION (if forms are added later)
   * ========================================
   * Basic client-side form validation
   */

  /**
   * Initialize form validation
   * This is a placeholder for future form implementation
   */
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');

    if (forms.length === 0) {
      return;
    }

    forms.forEach(function(form) {
      form.addEventListener('submit', function(event) {
        // Get all required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        // Clear previous error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(function(msg) {
          msg.remove();
        });

        // Validate each required field
        requiredFields.forEach(function(field) {
          if (!field.value.trim()) {
            isValid = false;
            
            // Add error styling
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');

            // Create error message
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'This field is required';
            errorMsg.setAttribute('role', 'alert');
            
            // Insert error message after field
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
          } else {
            // Remove error styling if field is now valid
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
          }
        });

        // Prevent form submission if validation fails
        if (!isValid) {
          event.preventDefault();
          
          // Focus first invalid field
          const firstInvalid = form.querySelector('.error');
          if (firstInvalid) {
            firstInvalid.focus();
          }
        }
      });

      // Remove error styling on input
      const inputs = form.querySelectorAll('[required]');
      inputs.forEach(function(input) {
        input.addEventListener('input', function() {
          if (this.value.trim()) {
            this.classList.remove('error');
            this.setAttribute('aria-invalid', 'false');
            
            // Remove error message
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
              errorMsg.remove();
            }
          }
        });
      });
    });
  }

  /**
   * ========================================
   * SCROLL TO TOP BUTTON
   * ========================================
   * Shows a button to quickly return to top of page when scrolled down
   */

  /**
   * Initialize scroll to top button
   * Creates and manages the scroll-to-top button
   */
  function initScrollToTop() {
    // Create button element
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.innerHTML = '↑';
    scrollButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--color-primary);
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: var(--shadow-lg);
      z-index: 999;
    `;

    document.body.appendChild(scrollButton);

    /**
     * Show/hide button based on scroll position
     */
    function toggleScrollButton() {
      if (window.scrollY > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.visibility = 'visible';
      } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.visibility = 'hidden';
      }
    }

    /**
     * Scroll to top when button is clicked
     */
    scrollButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Show/hide button on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          toggleScrollButton();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * ========================================
   * ACCESSIBILITY: FOCUS TRAP
   * ========================================
   * Keeps keyboard focus within mobile menu when open
   */

  /**
   * Initialize focus trap for mobile menu
   * Ensures keyboard navigation stays within menu when open
   */
  function initFocusTrap() {
    const mainNav = document.querySelector('.main-nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

    if (!mainNav || !mobileMenuToggle) {
      return;
    }

    /**
     * Handle Tab key press to trap focus within menu
     */
    mainNav.addEventListener('keydown', function(event) {
      // Only trap focus if menu is active (mobile)
      if (!this.classList.contains('active')) {
        return;
      }

      // Get all focusable elements within menu
      const focusableElements = this.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      // Handle Tab key
      if (event.key === 'Tab') {
        // Shift+Tab on first element - go to last
        if (event.shiftKey && document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
        // Tab on last element - go to first
        else if (!event.shiftKey && document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }

  /**
   * ========================================
   * PRINT STYLES HELPER
   * ========================================
   * Prepares page for printing by adjusting layout
   */

  /**
   * Initialize print preparation
   * Ensures page looks good when printed
   */
  function initPrintHelper() {
    // Listen for before print event
    window.addEventListener('beforeprint', function() {
      // Close mobile menu if open
      const mainNav = document.querySelector('.main-nav');
      if (mainNav && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      }

      // Expand all accordion items for printing
      const accordionTriggers = document.querySelectorAll('.accordion-trigger');
      accordionTriggers.forEach(function(trigger) {
        const contentId = trigger.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        if (content) {
          content.removeAttribute('hidden');
        }
      });
    });
  }

  /**
   * ========================================
   * INITIALIZATION
   * ========================================
   * Execute all initialization functions when DOM is ready
   */

  /**
   * Main initialization function
   * Called when DOM is fully loaded
   */
  function init() {
    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initAccordion();
    initActiveNavigation();
    initHeaderScrollEffect();
    initLazyLoading();
    initFormValidation();
    initScrollToTop();
    initFocusTrap();
    initPrintHelper();

    // Log to console for debugging (can be removed in production)
    console.log('MMBC website initialized successfully');
  }

  /**
   * Wait for DOM to be fully loaded before initializing
   * Ensures all elements are available for manipulation
   */
  if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already loaded, initialize immediately
    init();
  }

  /**
   * ========================================
   * UTILITY FUNCTIONS
   * ========================================
   * Helper functions that can be used throughout the script
   */

  /**
   * Throttle function - limits how often a function can be called
   * Useful for scroll and resize event handlers
   * 
   * @param {Function} func - Function to throttle
   * @param {number} wait - Minimum time between function calls in milliseconds
   * @returns {Function} Throttled function
   */
  function throttle(func, wait) {
    let timeout;
    let previous = 0;
    
    return function() {
      const now = Date.now();
      const remaining = wait - (now - previous);
      const context = this;
      const args = arguments;
      
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(function() {
          previous = Date.now();
          timeout = null;
          func.apply(context, args);
        }, remaining);
      }
    };
  }

  /**
   * Debounce function - delays function execution until after wait time
   * Useful for input handlers where you only want to act after user stops typing
   * 
   * @param {Function} func - Function to debounce
   * @param {number} wait - Time to wait in milliseconds
   * @returns {Function} Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    
    return function() {
      const context = this;
      const args = arguments;
      
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  /**
   * Check if element is in viewport
   * Useful for lazy loading and animations
   * 
   * @param {Element} element - DOM element to check
   * @returns {boolean} True if element is in viewport
   */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Make utility functions available globally if needed
  // (Uncomment if you need to use these functions elsewhere)
  // window.MMBC = {
  //   throttle: throttle,
  //   debounce: debounce,
  //   isInViewport: isInViewport
  // };

})();

/**
 * ========================================
 * END OF SCRIPT
 * ========================================
 * 
 * This script provides:
 * ✓ Mobile navigation with hamburger menu
 * ✓ Smooth scrolling to page sections
 * ✓ Accordion functionality for collapsible content
 * ✓ Active navigation highlighting on scroll
 * ✓ Header scroll effects
 * ✓ Lazy loading for images (when implemented)
 * ✓ Form validation (placeholder for future forms)
 * ✓ Scroll-to-top button
 * ✓ Focus trap for accessibility
 * ✓ Print preparation
 * ✓ Utility functions for performance optimization
 * 
 * All features include:
 * - Full accessibility support (ARIA attributes, keyboard navigation)
 * - Mobile-friendly interactions
 * - Performance optimizations
 * - Graceful degradation for older browsers
 */

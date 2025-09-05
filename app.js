// Stasis Carbon Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initAnimations();
    initAccessibility();
    initPerformanceOptimizations();
    initModalFunctionality();
    initFormHandling();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Reset hamburger menu
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Reset hamburger menu
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for sticky header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Modal Functionality
function initModalFunctionality() {
    const modal = document.getElementById('contact-modal');
    
    if (modal) {
        // Close modal when clicking on backdrop
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideContactForm();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                hideContactForm();
            }
        });
    }
}

// Show Contact Form Modal
function showContactForm() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus the first input field
        const firstInput = modal.querySelector('input[type="text"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

// Hide Contact Form Modal
function hideContactForm() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Download Resources Function
function downloadResources() {
    // Create a notification for the download action
    showNotification('Resource download initiated! PDF guides will be available shortly.', 'success');
    
    // Simulate resource download (in a real app, this would trigger actual downloads)
    const resources = [
        'Stasis Carbon - Implementation Guide.pdf',
        'BCR Technology Overview.pdf',
        'ERW Solutions Handbook.pdf',
        'Global South Case Studies.pdf'
    ];
    
    // Create download links (simulated)
    resources.forEach((resource, index) => {
        setTimeout(() => {
            console.log(`Downloading: ${resource}`);
            // In a real application, you would create actual download links here
            // For demonstration, we'll just log the action
        }, index * 500);
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }
}

function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Hide modal
        hideContactForm();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="hideNotification(this.parentElement.parentElement)">&times;</button>
        </div>
    `;
    
    // Add styles for notification if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                max-width: 400px;
                padding: 16px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10001;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                font-family: var(--font-family-base);
            }
            .notification--success {
                background: rgba(var(--color-success-rgb), 0.1);
                border: 1px solid rgba(var(--color-success-rgb), 0.2);
                color: var(--color-success);
            }
            .notification--error {
                background: rgba(var(--color-error-rgb), 0.1);
                border: 1px solid rgba(var(--color-error-rgb), 0.2);
                color: var(--color-error);
            }
            .notification--info {
                background: rgba(var(--color-info-rgb), 0.1);
                border: 1px solid rgba(var(--color-info-rgb), 0.2);
                color: var(--color-info);
            }
            .notification-content {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 12px;
            }
            .notification-message {
                flex: 1;
                line-height: 1.4;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: inherit;
                opacity: 0.7;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            .notification-close:hover {
                opacity: 1;
                background: rgba(0, 0, 0, 0.1);
            }
            .notification.show {
                transform: translateX(0);
            }
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    if (notification && notification.classList) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Scroll Effects and Animations
function initScrollEffects() {
    // Add scroll progress indicator
    addScrollProgressIndicator();
    
    // Initialize intersection observer for animations
    initIntersectionObserver();
    
    // Add parallax effect for background images (on desktop)
    if (window.innerWidth > 768) {
        initParallaxEffect();
    }
    
    // Add navbar background on scroll
    initNavbarScrollEffect();
}

function addScrollProgressIndicator() {
    // Create scroll progress indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-progress-indicator';
    scrollIndicator.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    // Add styles
    const styles = `
        .scroll-progress-indicator {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(0, 0, 0, 0.1);
            z-index: 9999;
            pointer-events: none;
        }
        .scroll-progress-bar {
            height: 100%;
            background: var(--color-primary);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    
    if (!document.querySelector('#scroll-progress-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'scroll-progress-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(scrollIndicator);
    
    const progressBar = scrollIndicator.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    }, 16));
}

function initIntersectionObserver() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.benefit-card, .technology-item, .finding-category');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
            observer.observe(element);
        });
    }
}

function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero, .benefits-section, .findings-section');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.backgroundPosition = `center ${rate}px`;
        });
    }, 16));
}

function initNavbarScrollEffect() {
    const navbar = document.querySelector('.nav-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(19, 52, 59, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--color-slate-900)';
            navbar.style.backdropFilter = 'none';
        }
        
        // Hide/show navbar on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, 16));
    
    // Add transition for smooth hide/show
    navbar.style.transition = 'transform 0.3s ease, background 0.3s ease';
}

// Animation Initialization
function initAnimations() {
    // Add stagger animation delays to grid items
    const benefitCards = document.querySelectorAll('.benefit-card');
    const findingCategories = document.querySelectorAll('.finding-category');
    
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    findingCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover effects for cards
    const interactiveCards = document.querySelectorAll('.benefit-card, .technology-item, .finding-category');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Accessibility Enhancements
function initAccessibility() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.benefit-card, .technology-item, .finding-category');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'article');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Focus next element or trigger action
                const nextElement = getNextFocusableElement(this);
                if (nextElement) {
                    nextElement.focus();
                }
            }
        });
    });
    
    // Add skip navigation link
    addSkipNavigation();
    
    // Improve focus visibility
    enhanceFocusVisibility();
    
    // Add ARIA labels where needed
    addAriaLabels();
}

function addSkipNavigation() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
        font-weight: 500;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }
}

function enhanceFocusVisibility() {
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

function addAriaLabels() {
    // Add aria labels to navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `Navigate to ${link.textContent.trim()}`);
        }
    });
    
    // Add aria labels to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Add aria labels to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (!section.getAttribute('aria-label')) {
            const heading = section.querySelector('h2, h3');
            if (heading) {
                section.setAttribute('aria-label', heading.textContent.trim());
            } else {
                section.setAttribute('aria-label', `Section ${index + 1}`);
            }
        }
    });
}

function getNextFocusableElement(currentElement) {
    const focusableElements = Array.from(document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])'));
    const currentIndex = focusableElements.indexOf(currentElement);
    return focusableElements[currentIndex + 1] || focusableElements[0];
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load background images
    initLazyBackgroundLoading();
    
    // Optimize scroll listeners
    optimizeScrollListeners();
    
    // Preload critical resources
    preloadCriticalResources();
}

function initLazyBackgroundLoading() {
    const backgroundElements = document.querySelectorAll('[style*="background-image"]');
    
    if ('IntersectionObserver' in window) {
        const bgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('bg-loaded');
                    bgObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '50px' });
        
        backgroundElements.forEach(element => {
            bgObserver.observe(element);
        });
    }
}

function optimizeScrollListeners() {
    // Use passive listeners where possible
    const scrollElements = document.querySelectorAll('*');
    scrollElements.forEach(element => {
        if (element.onscroll) {
            element.addEventListener('scroll', element.onscroll, { passive: true });
            element.onscroll = null;
        }
    });
}

function preloadCriticalResources() {
    // Preload hero background image
    const heroImage = new Image();
    heroImage.src = 'https://pplx-res.cloudinary.com/image/upload/v1755672265/pplx_project_search_images/0163cf741e95b9a130af9d64d8a9de3815a8c283.png';
}

// Utility Functions
function throttle(func, limit) {
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

function debounce(func, wait) {
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

// Responsive behavior
function handleResize() {
    const mobileBreakpoint = 768;
    const isMobile = window.innerWidth <= mobileBreakpoint;
    
    // Adjust mobile menu behavior
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!isMobile && navLinks) {
        navLinks.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.classList.remove('active');
            // Reset hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Disable parallax on mobile for performance
    const parallaxElements = document.querySelectorAll('.hero, .benefits-section, .findings-section');
    if (isMobile) {
        parallaxElements.forEach(element => {
            element.style.backgroundAttachment = 'scroll';
        });
    } else {
        parallaxElements.forEach(element => {
            element.style.backgroundAttachment = 'fixed';
        });
    }
}

// Add resize listener with debounce
window.addEventListener('resize', debounce(handleResize, 250));

// Error handling for failed resource loads
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        // Handle image load errors gracefully
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Analytics and interaction tracking
function trackInteraction(action, element) {
    // This would integrate with analytics service
    console.log(`User interaction: ${action} on ${element}`);
    
    // Example: Google Analytics 4 event
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'engagement',
            'event_label': element,
            'event_callback': function() {
                console.log('Event tracked:', action);
            }
        });
    }
}

// Add click tracking to important elements
document.addEventListener('click', function(e) {
    // Track button clicks
    if (e.target.classList.contains('btn')) {
        trackInteraction('button_click', e.target.textContent.trim());
    }
    
    // Track navigation clicks
    if (e.target.classList.contains('nav-link')) {
        trackInteraction('nav_click', e.target.textContent.trim());
    }
    
    // Track card interactions
    if (e.target.closest('.benefit-card')) {
        const cardTitle = e.target.closest('.benefit-card').querySelector('h3');
        if (cardTitle) {
            trackInteraction('card_click', cardTitle.textContent.trim());
        }
    }
});

// Initialize smooth reveal animations
function initSmoothReveal() {
    const revealElements = document.querySelectorAll('.hero-content > *, .solutions-content > *, .cta-content > *');
    
    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s forwards`;
    });
}

// Call smooth reveal after DOM is loaded
initSmoothReveal();

// Add custom cursor effect for interactive elements (optional enhancement)
function initCustomCursor() {
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .benefit-card, .technology-item, .finding-category');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });
}

initCustomCursor();

// Make functions globally available
window.showContactForm = showContactForm;
window.hideContactForm = hideContactForm;
window.downloadResources = downloadResources;
window.hideNotification = hideNotification;

// Export functions for potential external use
window.StasisCarbon = {
    showContactForm,
    hideContactForm,
    downloadResources,
    showNotification,
    hideNotification,
    trackInteraction,
    throttle,
    debounce,
    handleResize
};
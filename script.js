// ============================================
// DGTL SOLUTIONS - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.boxShadow = '0 4px 0 rgba(0, 0, 0, 1)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.client-card, .project-card, .service-card, .step'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Staggered animation for grid items
    const staggerElements = (selector, delay = 100) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.transitionDelay = `${index * delay}ms`;
        });
    };

    staggerElements('.client-card', 80);
    staggerElements('.service-card', 100);

    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            console.log('Form submitted:', data);

            // Show success message (you can replace this with actual submission logic)
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Gesendet!';
            submitBtn.style.background = '#00ff88';
            submitBtn.style.borderColor = '#00ff88';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // Parallax effect for hero decoration
    const heroDecoration = document.querySelector('.hero-decoration');
    if (heroDecoration) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroDecoration.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }

    // Random glitch effect on project numbers
    const projectNumbers = document.querySelectorAll('.project-number');
    projectNumbers.forEach(num => {
        num.addEventListener('mouseenter', () => {
            const originalText = num.textContent;
            let glitchCount = 0;
            const glitchInterval = setInterval(() => {
                num.textContent = Math.random().toString(36).substring(2, 4).toUpperCase();
                glitchCount++;
                if (glitchCount > 5) {
                    clearInterval(glitchInterval);
                    num.textContent = originalText;
                }
            }, 50);
        });
    });

    // Mouse follower effect (optional - can be disabled for performance)
    let mouseFollower = null;

    const createMouseFollower = () => {
        mouseFollower = document.createElement('div');
        mouseFollower.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 3px solid #ff3d00;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(mouseFollower);
    };

    // Only on desktop
    if (window.innerWidth > 1024) {
        createMouseFollower();

        document.addEventListener('mousemove', (e) => {
            if (mouseFollower) {
                mouseFollower.style.left = e.clientX - 10 + 'px';
                mouseFollower.style.top = e.clientY - 10 + 'px';
            }
        });

        // Grow on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .client-card, .project-card, .service-card, .step');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (mouseFollower) {
                    mouseFollower.style.transform = 'scale(2)';
                }
            });
            el.addEventListener('mouseleave', () => {
                if (mouseFollower) {
                    mouseFollower.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Easter egg: Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.style.animation = 'hueRotate 2s infinite';
                const konamiStyle = document.createElement('style');
                konamiStyle.textContent = `
                    @keyframes hueRotate {
                        from { filter: hue-rotate(0deg); }
                        to { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(konamiStyle);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    console.log('%c DGTL Solutions ', 'background: #ff3d00; color: white; font-size: 24px; font-weight: bold; padding: 10px;');
    console.log('%c Wir setzen Ihre Vision um. ', 'color: #000; font-size: 14px;');
});

// ============================================
// DGTL SOLUTIONS - NEO-BRUTALIST INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // MOBILE MENU
    // ========================================
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========================================
    // SMOOTH SCROLL
    // ========================================
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

    // ========================================
    // NAVBAR SCROLL BEHAVIOR
    // ========================================
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    let ticking = false;

    const updateNav = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    });

    // ========================================
    // INTERSECTION OBSERVER - SCROLL ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.client-card, .project-card-compact, .service-card, .step'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Add staggered delay
        const parentClass = el.classList.contains('client-card') ? 'client' :
                           el.classList.contains('service-card') ? 'service' :
                           el.classList.contains('step') ? 'step' : 'project';

        const siblings = document.querySelectorAll(`.${parentClass}-card, .${parentClass}`);
        const siblingIndex = Array.from(siblings).indexOf(el);
        el.dataset.delay = siblingIndex * 80;

        animateOnScroll.observe(el);
    });

    // ========================================
    // MAGNETIC BUTTONS
    // ========================================
    const magneticButtons = document.querySelectorAll('.btn-brutal');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ========================================
    // FORM HANDLING (Mailto)
    // ========================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const company = contactForm.querySelector('#company').value.trim();
            const person = contactForm.querySelector('#contact-person').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const phone = contactForm.querySelector('#phone').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            const subject = `Anfrage von ${company}`;
            const body = `Unternehmen: ${company}
Ansprechpartner: ${person}
E-Mail: ${email}
Telefon: ${phone || 'Nicht angegeben'}

Nachricht:
${message}`;

            const mailtoLink = `mailto:info@dgtl24.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;
        });

        // Input focus effects
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }

    // ========================================
    // PARALLAX DECORATIONS
    // ========================================
    const heroDecoration = document.querySelector('.hero-decoration');
    const heroBgText = document.querySelector('.hero-bg-text');

    if (heroDecoration || heroBgText) {
        let rafId = null;

        window.addEventListener('scroll', () => {
            if (rafId) return;

            rafId = requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                if (heroDecoration) {
                    heroDecoration.style.transform = `translateY(${scrolled * 0.2}px)`;
                }

                if (heroBgText) {
                    heroBgText.style.transform = `translateY(calc(-50% + ${scrolled * 0.1}px))`;
                }

                rafId = null;
            });
        });
    }


    // ========================================
    // TEXT REVEAL ANIMATION FOR HEADERS
    // ========================================
    const revealHeaders = document.querySelectorAll('.section-header h2, .clients-header h2, .process-header h2, .contact-header h2');

    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        headerObserver.observe(header);
    });

    // ========================================
    // EASTER EGG: KONAMI CODE
    // ========================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Activate party mode
                document.body.style.animation = 'partyMode 0.5s infinite';
                const partyStyle = document.createElement('style');
                partyStyle.textContent = `
                    @keyframes partyMode {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(partyStyle);

                // Show message
                const msg = document.createElement('div');
                msg.textContent = 'PARTY MODE ACTIVATED!';
                msg.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 3rem;
                    font-weight: 900;
                    color: white;
                    text-shadow: 0 0 20px rgba(0,0,0,0.5);
                    z-index: 100000;
                    animation: fadeInOut 3s forwards;
                `;
                const fadeStyle = document.createElement('style');
                fadeStyle.textContent = `
                    @keyframes fadeInOut {
                        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    }
                `;
                document.head.appendChild(fadeStyle);
                document.body.appendChild(msg);

                setTimeout(() => {
                    msg.remove();
                    document.body.style.animation = '';
                }, 5000);

                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // ========================================
    // CONSOLE BRANDING
    // ========================================
    console.log(
        '%c DGTL Solutions ',
        'background: linear-gradient(135deg, #ff4d00, #cc3d00); color: white; font-size: 24px; font-weight: 900; padding: 20px 40px; border-radius: 0;'
    );
    console.log(
        '%c Gemeinsam. Strategisch. Nach vorne. ',
        'color: #0a0a0a; font-size: 14px; font-weight: 500;'
    );
    console.log(
        '%c Website by DGTL Solutions - Professional IT Services ',
        'color: #7a7a7a; font-size: 11px;'
    );
});

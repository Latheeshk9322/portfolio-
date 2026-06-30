/* -------------------------------------------------------------
   Latheesh K. - GSAP & Parallax Animation Engine
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded. Activating robust fallback engine.');
        runNoGSAPFallback();
        return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Run Animation Modules
    initPreloader();
    initCustomCursor();
    initTypewriter();
    initNavbarScroll();
    initScrollReveals();
    initAchievementsCounter();
    initTimelineScrollProgress();
    initCard3DTilt();
    initThemeTransition();
});

/* ==========================================================================
   Fallback Engine (Runs when GSAP is blocked or offline)
   ========================================================================== */
function runNoGSAPFallback() {
    // 1. Dismiss Preloader
    document.body.classList.remove('preloader-active');
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        preloader.style.opacity = '0';
        preloader.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }

    // 2. Initialize Base Layout Logics (Navbar Scroll & Theme Mode)
    initNavbarScroll();
    initThemeTransition();
    
    // 3. Run Typewriter Cycling Role
    initTypewriter();

    // 4. Fill Skill Bars immediately
    const skillBars = document.querySelectorAll('.skill-bar-inner');
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });

    // 5. Populate Achievements target values
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
        const target = counter.getAttribute('data-target');
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        counter.textContent = target + suffix;
    });

    // 6. Simple CSS-based scroll trigger indicators for Timeline Items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // 7. Make all interactive elements use native pointers
    document.body.style.cursor = 'default';
    const dot = document.getElementById('cc-dot');
    const follower = document.getElementById('cc-follower');
    if (dot) dot.style.display = 'none';
    if (follower) follower.style.display = 'none';
}

/* ==========================================================================
   1. Page Entrance Preloader Animation
   ========================================================================== */
function initPreloader() {
    document.body.classList.add('preloader-active');
    
    const tl = gsap.timeline({
        onComplete: () => {
            document.body.classList.remove('preloader-active');
            const preloader = document.querySelector('.preloader');
            if (preloader) preloader.style.display = 'none';
            
            // Trigger entry animation of hero section
            triggerHeroEntrance();
        }
    });

    // Animate loader circles & initials
    tl.to('.preloader-circle', {
        duration: 0.8,
        opacity: 0,
        scale: 0.8,
        ease: 'power3.in',
        delay: 2.2 // Let logo pulse a couple of times
    })
    .to('.preloader-logo', {
        duration: 0.6,
        y: -30,
        opacity: 0,
        ease: 'power3.in'
    }, '-=0.4')
    .to('.preloader', {
        duration: 0.8,
        yPercent: -100,
        ease: 'power4.inOut'
    }, '-=0.2');
}

function triggerHeroEntrance() {
    const tl = gsap.timeline();

    tl.fromTo('.navbar-header', 
        { y: -50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.hero-intro', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 
        '-=0.4'
    )
    .fromTo('.hero-name', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 
        '-=0.5'
    )
    .fromTo('.hero-role-wrapper', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 
        '-=0.5'
    )
    .fromTo('.hero-bio', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 
        '-=0.5'
    )
    .fromTo('.hero-profile-container', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' }, 
        '-=0.6'
    )
    .fromTo('.hero-cta .btn', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power3.out' }, 
        '-=0.6'
    )
    .fromTo('.hero-socials .social-icon', 
        { scale: 0.5, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' }, 
        '-=0.4'
    );
}

/* ==========================================================================
   2. High-performance Custom Cursor Follower
   ========================================================================== */
function initCustomCursor() {
    const cursorDot = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');

    if (!cursorDot || !cursorFollower) return;

    // Use gsap quickTo for optimal performance
    const xToDot = gsap.quickTo(cursorDot, "x", { duration: 0.05, ease: "power3.out" });
    const yToDot = gsap.quickTo(cursorDot, "y", { duration: 0.05, ease: "power3.out" });
    
    const xToFollower = gsap.quickTo(cursorFollower, "x", { duration: 0.25, ease: "power3.out" });
    const yToFollower = gsap.quickTo(cursorFollower, "y", { duration: 0.25, ease: "power3.out" });

    window.addEventListener("mousemove", (e) => {
        xToDot(e.clientX);
        yToDot(e.clientY);
        
        xToFollower(e.clientX);
        yToFollower(e.clientY);
    });

    // Make interactive elements trigger scale-up on cursor
    const interactiveSelectors = 'a, button, .btn, .filter-btn, .project-card, .cert-card, .social-icon, .profile-uploader, input, textarea, select';
    const interactiveElements = document.querySelectorAll(interactiveSelectors);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

/* ==========================================================================
   3. Typewriter Role Cycle Animation
   ========================================================================== */
function initTypewriter() {
    const element = document.querySelector('.hero-role');
    if (!element) return;

    const roles = ["MCA Graduate", "Web Developer", "IT Support Specialist", "ML Enthusiast", "Software Engineer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            charIndex--;
            typeSpeed = 50; // Deletes faster
        } else {
            charIndex++;
            typeSpeed = 120; // Typing speed
        }

        element.textContent = currentRole.substring(0, charIndex);

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

function fallbackTypewriter() {
    initTypewriter();
}

/* ==========================================================================
   4. Glassmorphism Sticky Navbar Transition
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-header');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Menu toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.navbar-links');
    const links = document.querySelectorAll('.navbar-links a');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ScrollSpy active state highlight logic
    const sections = document.querySelectorAll('section[id]');
    
    function scrollSpy() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // sticky navbar offset
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.navbar-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    links.forEach(l => l.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', scrollSpy);
    // Trigger scrollSpy initially
    scrollSpy();
}

/* ==========================================================================
   5. ScrollTrigger Reveals (Fade up / Slide in)
   ========================================================================== */
function initScrollReveals() {
    // Fade reveal titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, 
            { y: 40, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%'
                }
            }
        );
    });

    // Reveal about box
    if (document.querySelector('.about-intro-box')) {
        gsap.fromTo('.about-intro-box',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-intro-box',
                    start: 'top 85%'
                }
            }
        );
    }

    // Timeline item reveals (staggered left/right slides)
    gsap.utils.toArray('.timeline-item').forEach(item => {
        const isLeft = item.classList.contains('timeline-left') || item.matches(':nth-child(odd)');
        const xOffset = isLeft ? -50 : 50;

        gsap.fromTo(item.querySelector('.timeline-content'),
            { x: xOffset, opacity: 0, scale: 0.95 },
            {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    onEnter: () => item.classList.add('active'),
                    onLeaveBack: () => item.classList.remove('active')
                }
            }
        );
    });

    // Skills fill progress triggers
    gsap.utils.toArray('.skills-category').forEach(cat => {
        gsap.fromTo(cat, 
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cat,
                    start: 'top 85%'
                },
                onComplete: () => {
                    // Trigger the inner skill bars once container is revealed
                    const bars = cat.querySelectorAll('.skill-bar-inner');
                    bars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        gsap.to(bar, { width: targetWidth, duration: 1.2, ease: 'power2.out' });
                    });
                }
            }
        );
    });

    // NOTE: Project card reveal is handled by CSS @keyframes (cardFadeUp)
    // No JS/GSAP needed — this avoids inline style conflicts with the filter.

    // Certificates Grid reveal
    if (document.querySelector('.cert-gallery-grid')) {
        gsap.fromTo('.cert-card', 
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'back.out(1.1)',
                scrollTrigger: {
                    trigger: '.cert-gallery-grid',
                    start: 'top 85%'
                }
            }
        );
    }
}

/* ==========================================================================
   6. Achievements Counter Staged Increments
   ========================================================================== */
function initAchievementsCounter() {
    const cards = gsap.utils.toArray('.counter-card');
    if (cards.length === 0) return;

    gsap.fromTo(cards, 
        { y: 30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.counters-grid',
                start: 'top 85%'
            },
            onComplete: () => {
                // Perform numbers animations
                const counters = document.querySelectorAll('.counter-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'), 10);
                    const suffix = counter.textContent.replace(/[0-9]/g, ''); // Extract +/wins suffix
                    const obj = { value: 0 };
                    
                    gsap.to(obj, {
                        value: target,
                        duration: 2,
                        ease: 'power3.out',
                        onUpdate: () => {
                            counter.textContent = Math.floor(obj.value) + suffix;
                        }
                    });
                });
            }
        }
    );
}

/* ==========================================================================
   7. Scroll-linked Vertical Timeline Progress Line Fill
   ========================================================================== */
function initTimelineScrollProgress() {
    const timeline = document.querySelector('.timeline-container');
    const progressBar = document.querySelector('.timeline-line-progress');
    
    if (!timeline || !progressBar) return;

    // Use ScrollTrigger to bind progress line height directly to timeline scroll bounds
    gsap.to(progressBar, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: timeline,
            start: 'top 30%', // Starts filling when top of timeline hits 30% viewport height
            end: 'bottom 70%', // Reaches 100% when bottom of timeline hits 70% viewport
            scrub: true // Linked to scroll speed
        }
    });
}

/* ==========================================================================
   8. 3D Mouse Parallax Hover Tilt
   ========================================================================== */
function initCard3DTilt() {
    // Avoid applying tilt on touch screen devices to prevent scrolling bugs
    if (window.matchMedia("(hover: none)").matches) return;

    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Mouse coords relative to card origin
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Normalize coordinate system between -0.5 and 0.5
            const normX = (x / rect.width) - 0.5;
            const normY = (y / rect.height) - 0.5;

            // Maximum rotation degree coefficients
            const maxRot = 12;

            // Rotate inverse values to align direction tilt
            const rotX = -normY * maxRot;
            const rotY = normX * maxRot;

            gsap.to(card, {
                rotateX: rotX,
                rotateY: rotY,
                transformPerspective: 800,
                duration: 0.25,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });

        card.addEventListener('mouseleave', () => {
            // Reset to flat rotation state
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: 'elastic.out(1.1, 0.4)',
                overwrite: 'auto'
            });
        });
    });
}

/* ==========================================================================
   9. Smooth Theme Transitions Handler
   ========================================================================== */
function initThemeTransition() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    // Load saved or system default theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = 'dark'; // Dark theme default
    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (!prefersDark) {
        currentTheme = 'light';
    }

    document.documentElement.setAttribute('data-theme', currentTheme);

    themeBtn.addEventListener('click', () => {
        let newTheme = 'dark';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            newTheme = 'light';
        }

        // Apply page-wide transition delay class if we want to block fast layout shift flashes
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });
}

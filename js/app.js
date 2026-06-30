/* -------------------------------------------------------------
   Latheesh K. - Main Application Engine & Interactive Widgets
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initProfileUploader();
    initProjectFilter();
    initCertificateLightbox();
    initTestimonialsCarousel();
    initContactFormValidation();
    initFAQChatbot();
});

/* ==========================================================================
   1. Profile Picture Hover Effect
   ========================================================================== */
function initProfileUploader() {
    const picture = document.querySelector('.profile-picture');
    if (!picture) return;

    // Add a subtle hover overlay element for the glow pulse effect
    const overlay = document.createElement('div');
    overlay.className = 'profile-overlay';
    overlay.innerHTML = `<i class="fa-solid fa-user"></i><span>Latheesh K.</span>`;
    picture.appendChild(overlay);
}

/* ==========================================================================
   2. Interactive Project Filtering Grid
   ========================================================================== */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards  = document.querySelectorAll('.project-card-wrapper');

    if (!filterButtons.length || !projectCards.length) return;

    // Ensure all cards start fully visible (clear any residual GSAP/animation inline styles)
    projectCards.forEach(wrapper => {
        const card = wrapper.querySelector('.project-card');
        if (card) {
            card.style.cssText += '; opacity:1 !important; visibility:visible !important;';
        }
        wrapper.style.display = '';
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Show / hide each card
            projectCards.forEach(wrapper => {
                const cat = wrapper.getAttribute('data-category');
                if (category === 'all' || cat === category) {
                    // Force fully visible
                    wrapper.style.setProperty('display', '', 'important');
                    const inner = wrapper.querySelector('.project-card');
                    if (inner) {
                        inner.style.setProperty('opacity', '1', 'important');
                        inner.style.setProperty('visibility', 'visible', 'important');
                        inner.style.setProperty('transform', 'none', 'important');
                    }
                } else {
                    wrapper.style.setProperty('display', 'none', 'important');
                }
            });
        });
    });
}


/* ==========================================================================
   3. Certificate Gallery Lightbox Modal
   ========================================================================== */
function initCertificateLightbox() {
    const galleryItems = document.querySelectorAll('.cert-card');
    const lightbox = document.getElementById('cert-lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const imageContainer = lightbox.querySelector('.lightbox-image-container');
    const caption = lightbox.querySelector('.lightbox-caption');

    if (galleryItems.length === 0 || !lightbox) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const certTitle = item.querySelector('h4').textContent;
            const certSub = item.querySelector('p').textContent;
            const isPlaceholder = item.classList.contains('cert-card-soon');

            imageContainer.innerHTML = ''; // Reset container

            if (isPlaceholder) {
                // Render visual SVG block inside lightbox
                const wrapper = document.createElement('div');
                wrapper.className = 'lightbox-placeholder-preview';
                wrapper.innerHTML = `
                    <i class="fa-solid fa-graduation-cap"></i>
                    <h3>Coming Soon</h3>
                    <p>This certificate is being validated or processed. Check back soon!</p>
                `;
                imageContainer.appendChild(wrapper);
            } else {
                // Look for static certificate image if available, else render beautiful vector placeholder frame
                const mockImage = document.createElement('div');
                mockImage.className = 'lightbox-placeholder-preview';
                mockImage.innerHTML = `
                    <i class="fa-solid fa-file-contract" style="color: var(--accent-secondary)"></i>
                    <h3>${certTitle}</h3>
                    <p style="margin-top: 10px; max-width: 400px; font-size: 0.95rem;">${certSub}</p>
                    <span style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 30px; border: 1px dashed var(--border-color); padding: 5px 12px; border-radius: 4px;">Verified Certificate Asset</span>
                `;
                imageContainer.appendChild(mockImage);
            }

            caption.textContent = `${certTitle} | ${certSub}`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop scroll
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeLightbox);
    // Close when clicking the dark backdrop (not the content panel itself)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/* ==========================================================================
   4. Testimonials Auto-sliding Carousel
   ========================================================================== */
function initTestimonialsCarousel() {
    const track = document.querySelector('.testimonials-track');
    const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const dotsContainer = document.querySelector('.slider-control-dots');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let slideTimer = null;
    const intervalTime = 6000; // 6 seconds

    // Render dot indicators dynamically
    slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
        dotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
            goToSlide(idx);
            resetTimer();
        });
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.slider-dot'));

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots state
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        let targetIndex = currentIndex + 1;
        if (targetIndex >= slides.length) {
            targetIndex = 0;
        }
        goToSlide(targetIndex);
    }

    function startTimer() {
        slideTimer = setInterval(nextSlide, intervalTime);
    }

    function resetTimer() {
        clearInterval(slideTimer);
        startTimer();
    }

    // Touch Swipe Support for Mobile
    let startX = 0;
    let isSwiping = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        clearInterval(slideTimer);
    });

    track.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        const diffX = e.touches[0].clientX - startX;
        
        if (Math.abs(diffX) > 50) { // Threshold
            if (diffX > 0) {
                // Swipe right -> previous slide
                let prevIdx = currentIndex - 1;
                if (prevIdx < 0) prevIdx = slides.length - 1;
                goToSlide(prevIdx);
            } else {
                // Swipe left -> next slide
                nextSlide();
            }
            isSwiping = false;
        }
    });

    track.addEventListener('touchend', () => {
        isSwiping = false;
        startTimer();
    });

    startTimer();
}

/* ==========================================================================
   5. Interactive Contact Form Validation & Canvas Confetti
   ========================================================================== */
function initContactFormValidation() {
    const form = document.getElementById('portfolio-contact-form');
    if (!form) return;

    const fields = [
        { id: 'contact-name', required: true, pattern: /^[A-Za-z\s]{3,50}$/, errorMsg: 'Please enter a valid name (min 3 chars, letters only).' },
        { id: 'contact-email', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMsg: 'Please enter a valid email address.' },
        { id: 'contact-subject', required: true, pattern: /^.{4,100}$/, errorMsg: 'Subject must be between 4 and 100 characters.' },
        { id: 'contact-message', required: true, pattern: /^.{10,500}$/, errorMsg: 'Message must be between 10 and 500 characters.' }
    ];

    fields.forEach(fieldInfo => {
        const input = document.getElementById(fieldInfo.id);
        if (!input) return;

        // Keyup/Blur live styling validation
        const validateField = () => {
            const val = input.value.trim();
            const group = input.parentElement;
            
            if (val === '') {
                if (fieldInfo.required) {
                    setFieldStatus(group, 'invalid', 'This field is required.');
                    return false;
                } else {
                    setFieldStatus(group, 'neutral', '');
                    return true;
                }
            }

            if (!fieldInfo.pattern.test(val)) {
                setFieldStatus(group, 'invalid', fieldInfo.errorMsg);
                return false;
            }

            setFieldStatus(group, 'valid', '');
            return true;
        };

        input.addEventListener('keyup', validateField);
        input.addEventListener('blur', validateField);
    });

    function setFieldStatus(groupElement, status, message) {
        const msgSpan = groupElement.querySelector('.validation-msg');
        groupElement.classList.remove('valid', 'invalid');
        
        if (status === 'valid') {
            groupElement.classList.add('valid');
        } else if (status === 'invalid') {
            groupElement.classList.add('invalid');
            if (msgSpan) msgSpan.textContent = message;
        } else {
            if (msgSpan) msgSpan.textContent = '';
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        fields.forEach(fieldInfo => {
            const input = document.getElementById(fieldInfo.id);
            const group = input.parentElement;
            const val = input.value.trim();

            if (val === '' && fieldInfo.required) {
                setFieldStatus(group, 'invalid', 'This field is required.');
                isFormValid = false;
            } else if (val !== '' && !fieldInfo.pattern.test(val)) {
                setFieldStatus(group, 'invalid', fieldInfo.errorMsg);
                isFormValid = false;
            }
        });

        if (isFormValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const spinner = submitBtn.querySelector('.btn-submit-spinner');
            const btnText = submitBtn.querySelector('.btn-text');

            // Set loading spinner state
            submitBtn.disabled = true;
            if (spinner) spinner.style.display = 'inline-block';
            if (btnText) btnText.textContent = 'Sending Message...';

            // Simulate server network request delay
            setTimeout(() => {
                // Show success screen
                const successOverlay = document.querySelector('.form-success-overlay');
                successOverlay.classList.add('active');
                
                // Trigger canvas confetti explosion
                triggerConfettiExplosion('confetti-canvas');

                // Reset form elements
                form.reset();
                fields.forEach(f => {
                    const input = document.getElementById(f.id);
                    setFieldStatus(input.parentElement, 'neutral', '');
                });

                submitBtn.disabled = false;
                if (spinner) spinner.style.display = 'none';
                if (btnText) btnText.textContent = 'Send Message';

                // Close success screen button listener
                const dismissBtn = document.getElementById('success-dismiss-btn');
                const dismissAction = () => {
                    successOverlay.classList.remove('active');
                    dismissBtn.removeEventListener('click', dismissAction);
                };
                dismissBtn.addEventListener('click', dismissAction);

            }, 2000);
        }
    });
}

// Lightweight HTML5 Canvas Confetti Emitter
function triggerConfettiExplosion(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const particles = [];
    const colors = ['#6366f1', '#06b6d4', '#ea580c', '#10b981', '#facc15', '#ec4899'];
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2 + 100, // Starts near the bottom center button area
            radius: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 0.8) * 18 - 5,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1
        });
    }

    let animationFrame;
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let activeParticles = 0;

        particles.forEach(p => {
            if (p.opacity <= 0) return;
            
            activeParticles++;

            // Physics dynamics
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35; // Gravity
            p.vx *= 0.98; // Drag
            p.rotation += p.rotationSpeed;
            p.opacity -= 0.012; // Fade

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;

            // Draw rectangle/ribbon style confetti shapes
            ctx.beginPath();
            ctx.rect(-p.radius, -p.radius / 2, p.radius * 2, p.radius);
            ctx.fill();
            ctx.restore();
        });

        if (activeParticles > 0) {
            animationFrame = requestAnimationFrame(drawConfetti);
        } else {
            cancelAnimationFrame(animationFrame);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    drawConfetti();
}

/* ==========================================================================
   6. FAQ Chatbot Assistant Widget ("Ask About Me")
   ========================================================================== */
function initFAQChatbot() {
    const botBtn = document.getElementById('faq-bot-btn');
    const botContainer = document.getElementById('faq-bot-container');
    const msgList = botContainer.querySelector('.chatbot-messages');
    const suggestionContainer = botContainer.querySelector('.chatbot-suggestions');

    if (!botBtn || !botContainer) return;

    // Toggle Chat Panel
    botBtn.addEventListener('click', () => {
        botBtn.classList.toggle('active');
        botContainer.classList.toggle('active');
        
        // Scroll to bottom on open
        if (botContainer.classList.contains('active')) {
            msgList.scrollTop = msgList.scrollHeight;
        }
    });

    const qaData = {
        skills: {
            question: "What are your skills?",
            answer: "I specialize in <strong>Web Development</strong> (HTML, CSS, JavaScript, React.js, PHP) and <strong>IT Support</strong> (System Troubleshooting, Networking, Software Installation). I also work with databases like MySQL, PostgreSQL, and MongoDB, and have experience in <strong>AI/ML algorithms</strong> (Python)."
        },
        education: {
            question: "Where did you study?",
            answer: "I recently completed my <strong>Master of Computer Applications (MCA)</strong> (2023–2025) and my <strong>BCA</strong> (2020–2023) at Vivekananda College of Engineering and Technology, Puttur. Both courses gave me hands-on practice in software engineering and web application architectures."
        },
        projects: {
            question: "Show me your projects.",
            answer: "I have built several projects! Some highlights include:<br>• <strong>Cricket Score Prediction</strong> (Machine Learning / Python)<br>• <strong>Travel Expense Splitter</strong> (Winner: CODE-A-THON)<br>• <strong>PPE Safety Surveillance Cam</strong> (IoT, selected for KSCST demonstration). Check out the Projects section on my page for filter details!"
        },
        internship: {
            question: "Tell me about your internship.",
            answer: "I completed a <strong>3-Month AI & ML internship</strong> at Zephyr Technologies in Mangalore (Nov 2024 - Jan 2025). During this role, I built ML-based predictions, prepared datasets, trained modeling structures, and handled workflow architectures."
        },
        contact: {
            question: "How can I contact you?",
            answer: "You can write me a direct message through the form on this page, or reach me at:<br>📧 <strong>latheeshacharya6456@gmail.com</strong><br>📞 <strong>+91-7736989322</strong>. Let's collaborate!"
        }
    };

    // Render suggestion chips dynamically
    Object.keys(qaData).forEach(key => {
        const chip = document.createElement('button');
        chip.className = 'suggestion-chip';
        chip.textContent = qaData[key].question;
        chip.setAttribute('data-key', key);
        suggestionContainer.appendChild(chip);

        chip.addEventListener('click', () => {
            handleUserQuestion(key);
        });
    });

    function appendMessage(text, sender) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}`;
        bubble.innerHTML = text;
        msgList.appendChild(bubble);
        
        // Scroll down
        msgList.scrollTop = msgList.scrollHeight;
    }

    function handleUserQuestion(key) {
        const data = qaData[key];
        if (!data) return;

        // Post User message
        appendMessage(data.question, 'user');

        // Render Bot Typing Indicator Bubble
        const typingBubble = document.createElement('div');
        typingBubble.className = 'chat-bubble bot typing';
        typingBubble.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        msgList.appendChild(typingBubble);
        msgList.scrollTop = msgList.scrollHeight;

        // Simulated processing reply delay
        setTimeout(() => {
            typingBubble.remove();
            appendMessage(data.answer, 'bot');
        }, 1200);
    }
}

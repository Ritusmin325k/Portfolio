// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    setupThemeToggle();
    setupScrollProgress();
    setupBackToTop();
    setupNavigation();
    setupContactForm();
    setupProjectFilters();
    setupTypingAnimation();
    setupAOS();
    checkPrivacyPolicy();
    setupNavbarScroll();
    setupSmoothScroll();
    initTheme();
    setupScrollAnimations();
    setupParallax();
    setupCursorTrail();
});

// ===== THEME SYSTEM =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('light-mode');
    }
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isDark = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== SMOOTH SCROLL FOR KEYBOARD =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== SCROLL PROGRESS =====
function setupScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// ===== BACK TO TOP =====
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== NAVIGATION HIGHLIGHTING =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.focus();
        }
    });

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// ===== TYPING ANIMATION =====
function setupTypingAnimation() {
    const typingTexts = [
        'Python Developer',
        'Linux Enthusiast',
        'Security Researcher'
    ];
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;
    const typingElement = document.querySelector('.typing-text');

    if (!typingElement) return;

    function type() {
        const currentText = typingTexts[currentIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % typingTexts.length;
            typeSpeed = 500;
        }

        typingTimeout = setTimeout(type, typeSpeed);
    }

    type();
}

// ===== CONTACT FORM =====
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector('.form-submit');
        const formMessage = document.getElementById('formMessage');
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
            formMessage.textContent = 'Please fill in all fields';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formMessage.textContent = '';

        fetch('https://formspree.io/f/xyzpqkqp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, subject, message })
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

            if (data.ok) {
                formMessage.classList.add('success');
                formMessage.classList.remove('error');
                formMessage.textContent = 'Message sent successfully! I\'ll reply soon.';
                form.reset();
                setTimeout(() => {
                    formMessage.classList.remove('success');
                }, 5000);
            } else {
                sendViaMailto(name, email, subject, message);
            }
        })
        .catch(error => {
            console.error('Formspree error, trying mailto:', error);
            sendViaMailto(name, email, subject, message);
        });
    });
}

function sendViaMailto(name, email, subject, message) {
    const submitBtn = document.querySelector('.form-submit');
    const formMessage = document.getElementById('formMessage');
    
    const mailtoLink = `mailto:ritusminwebsite@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;
    
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    formMessage.classList.add('success');
    formMessage.classList.remove('error');
    formMessage.textContent = 'Opening email client... Please send the email!';
    
    document.getElementById('contactForm').reset();
    setTimeout(() => {
        formMessage.classList.remove('success');
    }, 5000);
}

// ===== PROJECT FILTERING =====
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== PROJECT MODALS =====
function openProjectModal(projectId) {
    const modalMap = {
        'phantom': 'phantomModal',
        'ipchanger': 'ipchangerModal',
        'fasteditor': 'fasteditorModal',
        'filemanager': 'filemanagerModal'
    };
    
    const modalId = modalMap[projectId];
    if (modalId) {
        document.getElementById(modalId).style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal(projectId) {
    const modalMap = {
        'phantom': 'phantomModal',
        'ipchanger': 'ipchangerModal',
        'fasteditor': 'fasteditorModal',
        'filemanager': 'filemanagerModal'
    };
    
    const modalId = modalMap[projectId];
    if (modalId) {
        document.getElementById(modalId).style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// ===== AOS SETUP =====
function setupAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
}

// ===== ANIMATE PROGRESS BARS ON SCROLL =====
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
});

// ===== COUNTER ANIMATION FOR STATS =====
const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = parseInt(stat.textContent);
                const isPlus = stat.textContent.includes('+');
                let currentValue = 0;
                const increment = Math.ceil(finalValue / 40);
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = finalValue + (isPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = currentValue + (isPlus ? '+' : '');
                    }
                }, 30);
                entry.target.classList.add('animated');
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.stats-grid').forEach(grid => {
    statObserver.observe(grid);
});

// ===== PRIVACY POLICY =====
function checkPrivacyPolicy() {
    const privacyAccepted = localStorage.getItem('privacyPolicyAccepted');
    if (!privacyAccepted) {
        setTimeout(() => showPrivacyBanner(), 2000);
    }
}

function showPrivacyBanner() {
    const banner = document.getElementById('privacyBanner');
    if (banner) {
        banner.classList.add('show');
    }
}

function hidePrivacyBanner() {
    const banner = document.getElementById('privacyBanner');
    if (banner) {
        banner.classList.remove('show');
    }
}

function acceptPrivacy() {
    localStorage.setItem('privacyPolicyAccepted', 'true');
    hidePrivacyBanner();
    logVisitorIP();
}

function declinePrivacy() {
    localStorage.setItem('privacyPolicyAccepted', 'declined');
    hidePrivacyBanner();
}

function showFullPrivacy(e) {
    e.preventDefault();
    hidePrivacyBanner();
    const modal = document.getElementById('privacyPolicyModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeFullPrivacy() {
    const modal = document.getElementById('privacyPolicyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== IP LOGGING FOR NETLIFY =====
function logVisitorIP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const visitorIP = data.ip;
            const timestamp = new Date().toISOString();
            const pageURL = window.location.href;
            
            const logData = {
                ip: visitorIP,
                timestamp: timestamp,
                url: pageURL,
                userAgent: navigator.userAgent
            };
            
            fetch('/.netlify/functions/log-visitor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logData)
            }).catch(err => {
                console.log('IP logging not available');
            });
        })
        .catch(err => console.log('IP logging error:', err));
}

// ===== SCROLL-LINKED ANIMATIONS =====
function setupScrollAnimations() {
    const scrollAnimOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollAnimObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, scrollAnimOptions);

    document.querySelectorAll('.timeline-item, .project-card, .skill-category, .achievement-card, .stat-box').forEach(el => {
        scrollAnimObserver.observe(el);
    });
}

// ===== PARALLAX EFFECT =====
function setupParallax() {
    const shapes = document.querySelectorAll('.morph-bg-1, .morph-bg-2, .hero-shape-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== CUSTOM CURSOR TRAIL =====
function setupCursorTrail() {
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);

        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        document.body.appendChild(cursorTrail);

        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animate() {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            
            requestAnimationFrame(animate);
        }
        animate();

        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorTrail.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorTrail.style.opacity = '0.5';
        });
    }
}

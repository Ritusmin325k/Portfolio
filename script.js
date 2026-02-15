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
});

// ===== THEME TOGGLE =====
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
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
    const sections = document.querySelectorAll('section');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return;

    // Hamburger menu toggle
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Scroll highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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
        'Cybersecurity Learner'
    ];
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
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

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % typingTexts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
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

        // Basic validation
        if (!name || !email || !subject || !message) {
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
            formMessage.textContent = '❌ Please fill in all fields';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formMessage.textContent = '';

        // Send to Formspree
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
            submitBtn.textContent = 'Send Message';

            if (data.ok) {
                formMessage.classList.add('success');
                formMessage.classList.remove('error');
                formMessage.textContent = '✅ Message sent successfully! I\'ll reply soon.';
                form.reset();
                setTimeout(() => {
                    formMessage.classList.remove('success');
                }, 5000);
            } else {
                formMessage.classList.add('error');
                formMessage.classList.remove('success');
                formMessage.textContent = '❌ ' + (data.error || 'Failed to send message');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
            formMessage.textContent = '❌ Network error. Please try again or email directly.';
        });
    });
}

// ===== PROJECT FILTERING =====
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
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
            card.style.display = 'block';
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
    }
}

// CLOSE MODAL WHEN CLICKING OUTSIDE
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// ===== AOS SETUP =====
function setupAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: false,
            offset: 100
        });
    }
}

// ===== UTILITY: Animate Progress Bars on Scroll =====
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.classList.add('animated');
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 50);
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
                const increment = Math.ceil(finalValue / 50);
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = finalValue + (isPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = currentValue + (isPlus ? '+' : '');
                    }
                }, 20);
                stat.classList.add('animated');
            });
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-grid').forEach(grid => {
    statObserver.observe(grid);
});

// ===== PRIVACY POLICY =====
function checkPrivacyPolicy() {
    const privacyAccepted = localStorage.getItem('privacyPolicyAccepted');
    if (!privacyAccepted) {
        setTimeout(() => showPrivacyPopup(), 500);
    }
}

function showPrivacyPopup() {
    const popup = document.getElementById('privacyPolicyPopup');
    if (popup) {
        popup.style.display = 'flex';
        popup.classList.add('show');
    }
}

function closePrivacyPopup() {
    const popup = document.getElementById('privacyPolicyPopup');
    if (popup) {
        popup.style.display = 'none';
        popup.classList.remove('show');
    }
}

function showFullPrivacy(e) {
    e.preventDefault();
    closePrivacyPopup();
    const modal = document.getElementById('privacyPolicyModal');
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('show');
    }
}

function closeFullPrivacy() {
    const modal = document.getElementById('privacyPolicyModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
    }
}

function acceptPrivacyPolicy() {
    localStorage.setItem('privacyPolicyAccepted', 'true');
    closeFullPrivacy();
    closePrivacyPopup();
    logVisitorIP();
}

// ===== IP LOGGING FOR NETLIFY =====
function logVisitorIP() {
    // Get visitor IP
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const visitorIP = data.ip;
            const timestamp = new Date().toISOString();
            const pageURL = window.location.href;
            
            // Log to Netlify function
            const logData = {
                ip: visitorIP,
                timestamp: timestamp,
                url: pageURL,
                userAgent: navigator.userAgent
            };
            
            // Send to Netlify function
            fetch('/.netlify/functions/log-visitor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logData)
            }).catch(err => {
                // Fallback: store in localStorage if function unavailable
                let visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
                visitors.push(logData);
                localStorage.setItem('visitors', JSON.stringify(visitors));
            });
        })
        .catch(err => console.log('IP logging error:', err));
}

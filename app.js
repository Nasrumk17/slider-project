// Carousel functionality (unchanged from original)
var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning');

let timeRunning = 3000;
let timeAutoNext = 7000;

nextBtn.onclick = function(){
    showSlider('next');
}

prevBtn.onclick = function(){
    showSlider('prev');
}

let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext);

function resetTimeAnimation() {
    runningTime.style.animation = 'none';
    runningTime.offsetHeight; /* trigger reflow */
    runningTime.style.animation = null;
    runningTime.style.animation = 'runningTime 7s linear 1 forwards';
}

function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0]);
        carousel.classList.add('next');
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);
    
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);
    
    resetTimeAnimation();
}

// Start the initial animation 
resetTimeAnimation();

// DOM Content Loaded - New functionality
document.addEventListener('DOMContentLoaded', function() {
    
     
    // Scroll Progress Indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.prepend(scrollIndicator);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.width = scrolled + "%";
    });
    
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Trigger specific animations for each section
                const sectionId = entry.target.getAttribute('id');
                animateSection(sectionId);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Section-specific animations
    function animateSection(sectionId) {
        switch(sectionId) {
            case 'about':
                animateAboutSection();
                break;
            case 'portfolio':
                animatePortfolioSection();
                break;
            case 'services':
                animateServicesSection();
                break;
            case 'connect':
                animateConnectSection();
                break;
        }
    }
    
    function animateAboutSection() {
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
        });
    }
    
    function animatePortfolioSection() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 300);
        });
    }
    
    function animateServicesSection() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateY(0deg)';
            }, index * 250);
        });
    }
    
    function animateConnectSection() {
        const socialCards = document.querySelectorAll('.social-card');
        const particles = document.querySelectorAll('.particle');
        
        socialCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        });
        
        particles.forEach((particle, index) => {
            setTimeout(() => {
                particle.style.opacity = '1';
            }, index * 200);
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        // Handle home section (carousel)
        if (scrollPosition < document.getElementById('about').offsetTop) {
            updateActiveNav('');
        } else {
            document.querySelectorAll('section[id]').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    updateActiveNav(`#${sectionId}`);
                }
            });
        }
    });
    
    function updateActiveNav(activeHref) {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeHref || 
                (activeHref === '' && link.getAttribute('href') === '')) {
                link.classList.add('active');
            }
        });
    }
    
    // Enhanced hover effects for portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg) rotateY(5deg)';
            this.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
        });
        
        // Add tilt effect based on mouse position
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    // Service card enhanced interactions
    document.querySelectorAll('.service-card').forEach(card => {
        let isFlipped = false;
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const cardInner = this.querySelector('.card-inner');
            
            if (!isFlipped) {
                cardInner.style.transform = 'rotateY(180deg)';
                isFlipped = true;
            } else {
                cardInner.style.transform = 'rotateY(0deg)';
                isFlipped = false;
            }
        });
        
        // Auto-flip back after some time
        card.addEventListener('mouseleave', function() {
            setTimeout(() => {
                if (isFlipped) {
                    const cardInner = this.querySelector('.card-inner');
                    cardInner.style.transform = 'rotateY(0deg)';
                    isFlipped = false;
                }
            }, 3000);
        });
    });
    
    // Dynamic particle animation
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 6 + 4}px;
            height: ${Math.random() * 6 + 4}px;
            background: rgba(108, 99, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}vw;
            top: 100vh;
        `;
        
        document.body.appendChild(particle);
        
        const duration = Math.random() * 3000 + 2000;
        const drift = Math.random() * 100 - 50;
        
        particle.animate([
            {
                transform: `translateY(0px) translateX(0px)`,
                opacity: 0
            },
            {
                transform: `translateY(-100vh) translateX(${drift}px)`,
                opacity: 1
            },
            {
                transform: `translateY(-120vh) translateX(${drift * 1.2}px)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'linear'
        }).addEventListener('finish', () => {
            particle.remove();
        });
    }
    
    // Create floating particles periodically
    setInterval(createFloatingParticle, 500);
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.carousel .item');
        
        parallaxElements.forEach((element, index) => {
            if (index < 2) { // Only apply to first two items (visible ones)
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });
    
    // Enhanced button interactions
    document.querySelectorAll('button, .neon-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
    });
    
    // Text animation for descriptions
    function animateText(element) {
    const text = element.textContent;
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        
        // FIX: Handle spaces properly
        if (text[i] === ' ') {
            span.style.display = 'inline';
            span.style.width = '0.3em'; // Ensure space has proper width
        } else {
            span.style.display = 'inline-block';
        }
        
        span.style.transition = `all 0.3s ease ${i * 0.02}s`;
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, i * 20);
    }
}
    
    // Apply text animation to descriptions when they come into view
    const textElements = document.querySelectorAll('.content .des, .about-text p');
    const textObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateText(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(element => {
        textObserver.observe(element);
    });
    
    // Easter egg - Konami code
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Activate special mode
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 3000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Performance optimization - pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        const animations = document.querySelectorAll('*');
        if (document.hidden) {
            animations.forEach(el => {
                if (el.style.animationPlayState !== 'paused') {
                    el.style.animationPlayState = 'paused';
                }
            });
        } else {
            animations.forEach(el => {
                if (el.style.animationPlayState === 'paused') {
                    el.style.animationPlayState = 'running';
                }
            });
        }
    });
    
});

// Resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate positions and animations on resize
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.transform = 'translateY(0)';
        section.style.opacity = '1';
    });
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Initialize tooltips for social links
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = `Visit my ${this.querySelector('span').textContent}`;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            z-index: 1000;
        `;
        this.style.position = 'relative';
        this.appendChild(tooltip);
    });
    
    card.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});
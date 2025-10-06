// ===========================
// Navigation Functionality
// ===========================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 255, 200, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
});

// ===========================
// FAQ Accordion
// ===========================
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.service-card, .value-card, .team-card, .pricing-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ===========================
// Counter Animation for Stats
// ===========================
const animateCounter = (element, target, suffix = '') => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.includes('+') ? '+' : text.includes('%') ? '%' : '';

            animateCounter(statNumber, number, suffix);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item, .stat-box').forEach(stat => {
    statsObserver.observe(stat);
});

// ===========================
// Form Handling
// ===========================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to your backend
        console.log('Form submitted:', data);

        // Show success message
        alert('Thank you for your message! We will get back to you within 4 hours.');
        contactForm.reset();
    });
}

// ===========================
// Scroll to Top Button
// ===========================
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===========================
// Particle Animation for Hero
// ===========================
function createNetworkAnimation() {
    const container = document.getElementById('networkCanvas');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        initNodes();
    }
    
    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 3 + 2;
            this.originalRadius = this.radius;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }
        
        update() {
            // Mouse interaction - nodes avoid cursor
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius && mouse.x !== null) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                
                this.x -= forceDirectionX * force * 3;
                this.y -= forceDirectionY * force * 3;
            }
            
            // Normal movement
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Keep within bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
            
            // Pulse effect
            this.pulsePhase += 0.05;
            this.radius = this.originalRadius + Math.sin(this.pulsePhase) * 1;
        }
        
        draw() {
            // Outer glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius * 3
            );
            gradient.addColorStop(0, 'rgba(0, 255, 200, 0.8)');
            gradient.addColorStop(0.5, 'rgba(0, 255, 200, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 255, 200, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Core node
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 200, 1)';
            ctx.fill();
        }
    }
    
    function initNodes() {
        nodes = [];
        const nodeCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node());
        }
    }
    
    function connectNodes() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    
                    const opacity = (1 - distance / 150) * 0.5;
                    const lineWidth = (1 - distance / 150) * 2;
                    
                    ctx.strokeStyle = `rgba(0, 255, 200, ${opacity})`;
                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
                }
            }
        }
    }
    
    function drawDataFlow() {
        // Flowing data particles along connections
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(otherNode => {
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const progress = (Date.now() % 2000) / 2000;
                    const x = node.x + (otherNode.x - node.x) * progress;
                    const y = node.y + (otherNode.y - node.y) * progress;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(0, 255, 200, 0.6)';
                    ctx.fill();
                }
            });
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw all nodes
        nodes.forEach(node => {
            node.update();
            node.draw();
        });
        
        // Draw connections between nodes
        connectNodes();
        
        // Draw flowing data particles
        drawDataFlow();
        
        requestAnimationFrame(animate);
    }
    
    // Mouse/Touch interaction
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        mouse.x = touch.clientX - rect.left;
        mouse.y = touch.clientY - rect.top;
    });
    
    canvas.addEventListener('touchend', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createNetworkAnimation);
} else {
    createNetworkAnimation();
}

// Initialize particle animation after DOM is loaded
document.addEventListener('DOMContentLoaded', createParticleAnimation);

// ===========================
// Typing Animation for Hero Title
// ===========================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing animation
// const heroGradientText = document.querySelector('.hero-title .gradient-text');
// if (heroGradientText) {
//     const originalText = heroGradientText.textContent;
//     typeWriter(heroGradientText, originalText, 80);
// }

// ===========================
// Service Card Hover Effect
// ===========================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary-cyan)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--card-border)';
    });
});

// ===========================
// Lazy Loading Images
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Console Welcome Message
// ===========================
console.log(
    '%cLumin Sphere Tech',
    'font-size: 24px; font-weight: bold; color: #00ffc8; text-shadow: 2px 2px 4px rgba(0, 255, 200, 0.3);'
);
console.log(
    '%cWe specialize in MLOps, Agentic AI, and AgentOps',
    'font-size: 14px; color: #8b8b8b;'
);
console.log(
    '%cInterested in joining our team? Email us at hello@luminspheretec.com',
    'font-size: 12px; color: #00ffc8;'
);

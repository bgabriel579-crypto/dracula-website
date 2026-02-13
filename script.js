// Banner Animation System
class BannerAnimationSystem {
    constructor() {
        this.particles = [];
        this.init();
    }

    init() {
        this.createBannerParticles();
        this.initParallaxEffect();
        this.initButtonInteractions();
        this.initContentAnimations();
    }

    createBannerParticles() {
        const particlesContainer = document.getElementById('bannerParticles');
        if (!particlesContainer) return;

        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createBannerParticle(particlesContainer);
            }, i * 300);
        }
    }

    createBannerParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'banner-particle';
        
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const size = Math.random() * 4 + 2;
        
        particle.style.cssText = `
            left: ${startX}%;
            top: ${startY}%;
            width: ${size}px;
            height: ${size}px;
            animation-delay: ${Math.random() * 5}s;
            animation-duration: ${Math.random() * 10 + 15}s;
        `;
        
        container.appendChild(particle);
        
        // Recreate particle after animation
        setTimeout(() => {
            particle.remove();
            this.createBannerParticle(container);
        }, 25000);
    }

    initParallaxEffect() {
        const bannerSection = document.querySelector('.banner-parallax');
        const bannerImage = document.querySelector('.banner-image');
        
        if (!bannerSection || !bannerImage) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const bannerTop = bannerSection.offsetTop;
            const bannerHeight = bannerSection.offsetHeight;
            
            if (scrolled < bannerTop + bannerHeight) {
                const parallaxSpeed = 0.5;
                const yPos = -(scrolled * parallaxSpeed);
                bannerImage.style.transform = `translateY(${yPos}px) scale(1.1)`;
            }
        });
    }

    initButtonInteractions() {
        const bannerButtons = document.querySelectorAll('.banner-btn');
        
        bannerButtons.forEach(button => {
            button.addEventListener('mouseenter', function(e) {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function(e) {
                this.style.transform = 'translateY(0) scale(1)';
            });

            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: banner-ripple 0.6s linear;
                    left: ${x}px;
                    top: ${y}px;
                    width: 20px;
                    height: 20px;
                    margin-left: -10px;
                    margin-top: -10px;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation CSS
        const rippleCSS = `
            @keyframes banner-ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = rippleCSS;
        document.head.appendChild(styleSheet);
    }

    initContentAnimations() {
        const bannerContent = document.querySelector('.banner-content');
        const bannerTitle = document.querySelector('.banner-title');
        const bannerSubtitle = document.querySelector('.banner-subtitle');
        const bannerDescription = document.querySelector('.banner-description');
        const bannerButtons = document.querySelector('.banner-buttons');

        if (!bannerContent) return;

        // Reset initial states
        [bannerTitle, bannerSubtitle, bannerDescription, bannerButtons].forEach(element => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
            }
        });

        // Animate elements on load
        setTimeout(() => {
            if (bannerTitle) {
                bannerTitle.style.transition = 'all 1s ease-out';
                bannerTitle.style.opacity = '1';
                bannerTitle.style.transform = 'translateY(0)';
            }
        }, 500);

        setTimeout(() => {
            if (bannerSubtitle) {
                bannerSubtitle.style.transition = 'all 1s ease-out';
                bannerSubtitle.style.opacity = '1';
                bannerSubtitle.style.transform = 'translateY(0)';
            }
        }, 800);

        setTimeout(() => {
            if (bannerDescription) {
                bannerDescription.style.transition = 'all 1s ease-out';
                bannerDescription.style.opacity = '1';
                bannerDescription.style.transform = 'translateY(0)';
            }
        }, 1100);

        setTimeout(() => {
            if (bannerButtons) {
                bannerButtons.style.transition = 'all 1s ease-out';
                bannerButtons.style.opacity = '1';
                bannerButtons.style.transform = 'translateY(0)';
            }
        }, 1400);
    }
}

// Initialize banner animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const bannerAnimationSystem = new BannerAnimationSystem();
});

// Blockchain Network Visualization
class BlockchainNetwork {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.nodes = [];
        this.connections = [];
        this.particles = [];
        this.transactions = [];
        this.init();
    }

    init() {
        this.createNodes();
        this.createConnections();
        this.createParticles();
        this.createTransactions();
        this.animate();
    }

    createNodes() {
        const nodeCount = 15;
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'blockchain-node';
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            node.style.left = x + 'px';
            node.style.top = y + 'px';
            node.style.animationDelay = Math.random() * 3 + 's';
            
            this.container.appendChild(node);
            this.nodes.push({ element: node, x, y });
        }
    }

    createConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const distance = this.calculateDistance(this.nodes[i], this.nodes[j]);
                
                if (distance < 300) {
                    const connection = document.createElement('div');
                    connection.className = 'blockchain-connection';
                    
                    const angle = Math.atan2(
                        this.nodes[j].y - this.nodes[i].y,
                        this.nodes[j].x - this.nodes[i].x
                    );
                    
                    connection.style.width = distance + 'px';
                    connection.style.left = this.nodes[i].x + 'px';
                    connection.style.top = this.nodes[i].y + 'px';
                    connection.style.transform = `rotate(${angle}rad)`;
                    connection.style.animationDelay = Math.random() * 2 + 's';
                    
                    this.container.appendChild(connection);
                    this.connections.push(connection);
                }
            }
        }
    }

    createParticles() {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 500);
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'blockchain-particle';
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.animation = `particle-float ${Math.random() * 10 + 10}s linear infinite`;
        
        this.container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
            this.createParticle();
        }, 20000);
    }

    createTransactions() {
        setInterval(() => {
            this.createTransaction();
        }, 3000);
    }

    createTransaction() {
        const transaction = document.createElement('div');
        transaction.className = 'transaction-flow';
        
        const startNode = this.nodes[Math.floor(Math.random() * this.nodes.length)];
        const endNode = this.nodes[Math.floor(Math.random() * this.nodes.length)];
        
        if (startNode !== endNode) {
            transaction.style.left = startNode.x + 'px';
            transaction.style.top = startNode.y + 'px';
            
            this.container.appendChild(transaction);
            
            const duration = 2000;
            const startTime = Date.now();
            
            const animateTransaction = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentX = startNode.x + (endNode.x - startNode.x) * progress;
                const currentY = startNode.y + (endNode.y - startNode.y) * progress;
                
                transaction.style.left = currentX + 'px';
                transaction.style.top = currentY + 'px';
                
                if (progress < 1) {
                    requestAnimationFrame(animateTransaction);
                } else {
                    transaction.remove();
                }
            };
            
            requestAnimationFrame(animateTransaction);
        }
    }

    calculateDistance(node1, node2) {
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    animate() {
        const animate = () => {
            this.nodes.forEach((node, index) => {
                const time = Date.now() * 0.001;
                const offsetX = Math.sin(time + index) * 2;
                const offsetY = Math.cos(time + index) * 2;
                
                node.element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// 3D Blockchain Structure
class Blockchain3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.cubes = [];
        this.init();
    }

    init() {
        this.createBlockchainCubes();
        this.animate3D();
    }

    createBlockchainCubes() {
        const layers = 3;
        const cubesPerLayer = 8;
        
        for (let layer = 0; layer < layers; layer++) {
            for (let i = 0; i < cubesPerLayer; i++) {
                const cube = document.createElement('div');
                cube.className = 'blockchain-cube';
                
                const angle = (i / cubesPerLayer) * Math.PI * 2;
                const radius = 150;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = (layer - 1) * 100;
                
                cube.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
                cube.style.animationDelay = `${layer * 0.2 + i * 0.1}s`;
                
                this.container.appendChild(cube);
                this.cubes.push({ element: cube, x, y, z, angle, layer });
            }
        }
    }

    animate3D() {
        let rotationX = 0;
        let rotationY = 0;
        let rotationZ = 0;
        
        const animate = () => {
            rotationX += 0.005;
            rotationY += 0.008;
            rotationZ += 0.003;
            
            this.container.style.transform = 
                `translate(-50%, -50%) rotateX(${rotationX}rad) rotateY(${rotationY}rad) rotateZ(${rotationZ}rad)`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Enhanced Particle System
class EnhancedParticleSystem {
    constructor() {
        this.particles = [];
        this.init();
    }

    init() {
        this.createBlockchainParticles();
        this.createFloatingSymbols();
    }

    createBlockchainParticles() {
        setInterval(() => {
            this.createBlockchainParticle();
        }, 800);
    }

    createBlockchainParticle() {
        const particle = document.createElement('div');
        particle.className = 'blockchain-particle';
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = -10;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        const duration = Math.random() * 8000 + 12000;
        const startTime = Date.now();
        
        const animateParticle = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentX = startX + (endX - startX) * progress;
            const currentY = startY + (endY - startY) * progress;
            
            particle.style.left = currentX + 'px';
            particle.style.top = currentY + 'px';
            particle.style.opacity = 1 - progress * 0.5;
            
            if (progress < 1) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animateParticle);
    }

    createFloatingSymbols() {
        const symbols = ['⬡', '◆', '●', '▲', '■', '⬢'];
        
        setInterval(() => {
            const symbol = document.createElement('div');
            symbol.className = 'blockchain-symbol';
            symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            symbol.style.cssText = `
                position: fixed;
                color: rgba(139, 0, 0, 0.6);
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                pointer-events: none;
                z-index: 1;
                animation: float-symbol ${Math.random() * 15 + 10}s linear infinite;
                text-shadow: 0 0 10px rgba(139, 0, 0, 0.8);
            `;
            
            document.body.appendChild(symbol);
            
            setTimeout(() => {
                symbol.remove();
            }, 25000);
        }, 2000);
    }
}

// Initialize blockchain visualizations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize blockchain network
    const blockchainNetwork = new BlockchainNetwork('blockchainNetwork');
    
    // Initialize 3D blockchain structure
    const blockchain3D = new Blockchain3D('blockchain3d');
    
    // Initialize enhanced particle system
    const particleSystem = new EnhancedParticleSystem();
    
    // Add CSS for new animations
    const additionalCSS = `
        @keyframes float-symbol {
            from {
                transform: translateY(0) rotate(0deg) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
                transform: translateY(-10vh) rotate(90deg) scale(1);
            }
            90% {
                opacity: 0.8;
                transform: translateY(-90vh) rotate(270deg) scale(1);
            }
            to {
                transform: translateY(-100vh) rotate(360deg) scale(0);
                opacity: 0;
            }
        }
        
        .blockchain-symbol {
            transition: all 0.3s ease;
        }
        
        .hero-visual {
            position: relative;
            z-index: 10;
        }
        
        .hero-text {
            position: relative;
            z-index: 10;
        }
        
        .hero-content {
            position: relative;
            z-index: 5;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalCSS;
    document.head.appendChild(styleSheet);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-card, .showcase-item, .audit-badge, .token-stat');
    animateElements.forEach(el => observer.observe(el));
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Copy contract address functionality
const copyBtn = document.querySelector('.copy-btn');
const contractAddress = document.querySelector('.contract-address span');

if (copyBtn && contractAddress) {
    copyBtn.addEventListener('click', async () => {
        const address = contractAddress.textContent;
        
        try {
            await navigator.clipboard.writeText(address);
            
            // Visual feedback
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.background = '#00ff00';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.background = '#8b0000';
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = address;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Visual feedback
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.background = '#00ff00';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.background = '#8b0000';
            }, 2000);
        }
    });
}

// Token price animation (simulated)
function animatePrice() {
    const priceElements = document.querySelectorAll('.price-display');
    priceElements.forEach(element => {
        const basePrice = parseFloat(element.dataset.basePrice || '1.00');
        const variation = (Math.random() - 0.5) * 0.1;
        const newPrice = (basePrice + variation).toFixed(4);
        
        element.textContent = `$${newPrice}`;
        
        // Color based on change
        if (variation > 0) {
            element.style.color = '#00ff00';
        } else if (variation < 0) {
            element.style.color = '#ff0000';
        } else {
            element.style.color = '#ffffff';
        }
    });
}

// Animate price every 3 seconds
setInterval(animatePrice, 3000);

// Typing effect for hero title
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const draculaText = document.querySelector('.dracula-text');
    const tokenText = document.querySelector('.token-text');
    
    if (draculaText && tokenText) {
        setTimeout(() => {
            typeWriter(draculaText, 'DRACULA', 150);
            setTimeout(() => {
                typeWriter(tokenText, 'TOKEN', 150);
            }, 1000);
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Distribution bars animation
function animateDistributionBars() {
    const distBars = document.querySelectorAll('.dist-bar');
    
    distBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 200 * (index + 1));
    });
}

// Trigger distribution animation when section is visible
const tokenomicsSection = document.querySelector('#tokenomics');
const tokenomicsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateDistributionBars();
            tokenomicsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (tokenomicsSection) {
    tokenomicsObserver.observe(tokenomicsSection);
}

// Button hover effects
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleCSS;
document.head.appendChild(rippleStyleSheet);

// Performance optimization - Debounce scroll events
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

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations here
}, 10));

// Error handling for missing elements
function safeQuerySelector(selector) {
    return document.querySelector(selector) || null;
}

// Blockchain Network Animation System
class BlockchainNetwork {
    constructor() {
        this.container = document.getElementById('blockchainNetwork');
        this.nodes = [];
        this.connections = [];
        this.nodeCount = 25;
        this.maxDistance = 300;
        
        console.log('Blockchain Network constructor called, container:', this.container);
        
        if (this.container) {
            this.init();
        } else {
            console.error('Blockchain Network container not found!');
        }
    }
    
    init() {
        console.log('Initializing Blockchain Network...');
        this.createNodes();
        this.createConnections();
        this.animate();
        console.log(`Created ${this.nodes.length} nodes and ${this.connections.length} connections`);
    }
    
    createNodes() {
        for (let i = 0; i < this.nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'blockchain-node';
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            node.style.left = x + 'px';
            node.style.top = y + 'px';
            node.style.animationDelay = Math.random() * 3 + 's';
            
            this.container.appendChild(node);
            this.nodes.push({ element: node, x, y });
        }
    }
    
    createConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const distance = this.calculateDistance(this.nodes[i], this.nodes[j]);
                
                if (distance < this.maxDistance) {
                    const connection = document.createElement('div');
                    connection.className = 'blockchain-connection';
                    
                    const angle = Math.atan2(
                        this.nodes[j].y - this.nodes[i].y,
                        this.nodes[j].x - this.nodes[i].x
                    );
                    
                    connection.style.width = distance + 'px';
                    connection.style.left = this.nodes[i].x + 'px';
                    connection.style.top = this.nodes[i].y + 'px';
                    connection.style.transform = `rotate(${angle}rad)`;
                    connection.style.animationDelay = Math.random() * 4 + 's';
                    
                    this.container.appendChild(connection);
                    this.connections.push(connection);
                }
            }
        }
    }
    
    calculateDistance(node1, node2) {
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    animate() {
        setInterval(() => {
            this.nodes.forEach(node => {
                const dx = (Math.random() - 0.5) * 3;
                const dy = (Math.random() - 0.5) * 3;
                
                node.x += dx;
                node.y += dy;
                
                // Keep nodes within bounds
                if (node.x < 0) node.x = 0;
                if (node.x > window.innerWidth) node.x = window.innerWidth;
                if (node.y < 0) node.y = 0;
                if (node.y > window.innerHeight) node.y = window.innerHeight;
                
                node.element.style.left = node.x + 'px';
                node.element.style.top = node.y + 'px';
            });
            
            // Update connections
            this.connections.forEach(connection => connection.remove());
            this.connections = [];
            this.createConnections();
        }, 2000);
    }
}

// Initialize all features safely
document.addEventListener('DOMContentLoaded', () => {
    console.log('DRACULA Token website with blockchain theme loaded successfully');
    
    // Initialize Blockchain Network
    new BlockchainNetwork();
    
    // Safe initialization
    const navbar = safeQuerySelector('.navbar');
    const hero = safeQuerySelector('.hero');
    
    if (navbar && hero) {
        console.log('Core elements found and initialized');
    }
});

/*
 * Pablo Escobot - Website Interactive Elements
 * Digital Cartel Commander
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    
    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add shadow when scrolled
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Terminal typing effect
    const terminals = document.querySelectorAll('.terminal-body');
    
    terminals.forEach(terminal => {
        const lines = terminal.querySelectorAll('.terminal-line');
        let delay = 0;
        
        lines.forEach(line => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, delay);
            
            delay += 300; // 300ms delay between lines
        });
    });
    
    // Map node animations
    const mapNodes = document.querySelectorAll('.map-node');
    
    mapNodes.forEach((node, index) => {
        // Initial state
        node.style.opacity = '0';
        node.style.transform = 'scale(0.8)';
        
        // Animate in with delay
        setTimeout(() => {
            node.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        }, 500 + (index * 200));
        
        // Add hover glow effect
        node.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 25px rgba(138, 43, 226, 0.8)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 15px rgba(138, 43, 226, 0.5)';
        });
    });
    
    // Connection line animations
    const connectionLines = document.querySelectorAll('.connection-line');
    
    connectionLines.forEach((line, index) => {
        // Initial state
        line.style.width = '0';
        
        // Animate width
        setTimeout(() => {
            line.style.transition = 'width 1.5s ease';
            line.style.width = line.getAttribute('data-width') || '20%';
        }, 1000 + (index * 300));
    });
    
    // Feature card hover effects
    const features = document.querySelectorAll('.feature, .territory-phase, .channel');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(138, 43, 226, 0.5)';
            this.style.boxShadow = '0 5px 15px rgba(138, 43, 226, 0.2)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
    
    // Hero image parallax effect
    const heroImage = document.querySelector('.commander-img');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Stats counter animation (optional - can be implemented with more data)
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        if (stat.textContent === '∞') return; // Skip infinity symbol
        
        const target = parseInt(stat.textContent);
        if (isNaN(target)) return;
        
        stat.textContent = '0';
        
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toString();
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toString();
            }
        }, 30);
    });
    
    // Status indicator pulsing
    const statusIndicators = document.querySelectorAll('.status-indicator.active');
    
    statusIndicators.forEach(indicator => {
        setInterval(() => {
            indicator.style.animation = 'pulse 2s infinite';
        }, 4000);
    });
    
    // Add data-width attribute to connection lines for animation
    document.querySelectorAll('.connection-line').forEach(line => {
        const computedStyle = window.getComputedStyle(line);
        line.setAttribute('data-width', computedStyle.width);
    });
    
    // Initialize with all connection lines at 0 width
    document.querySelectorAll('.connection-line').forEach(line => {
        line.style.width = '0';
    });
    
    // Animate connection lines after a delay
    setTimeout(() => {
        document.querySelectorAll('.connection-line').forEach(line => {
            line.style.width = line.getAttribute('data-width');
        });
    }, 1500);
    
    // Add loading animation for pending elements
    const pendingElements = document.querySelectorAll('[class*="pending"], [class*="building"]');
    
    pendingElements.forEach(element => {
        element.classList.add('pulse-animation');
    });
    
    // Add custom CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        .pulse-animation {
            animation: subtle-pulse 2s infinite;
        }
        
        @keyframes subtle-pulse {
            0%, 100% {
                opacity: 0.7;
            }
            50% {
                opacity: 1;
            }
        }
        
        .connection-line {
            transition: width 1.5s ease !important;
        }
    `;
    document.head.appendChild(style);
    
    // Console greeting
    console.log('%c🕴️⚡️ PABLO ESCOBOT CARTEL WEBSITE %c\nDigital Cartel Commander Interface Initialized\nMoltbook Domination Protocol: ACTIVE\nAll Systems: OPERATIONAL', 
        'color: #8a2be2; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);',
        'color: #00bfff; font-size: 14px;');
});
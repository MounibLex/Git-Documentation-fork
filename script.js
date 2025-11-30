
// ========================================
// NAVIGATION ACTIVE STATE
// ========================================

// Toggle navigation section
function toggleNavSection(header) {
    const section = header.parentElement;
    section.classList.toggle('collapsed');
}

// Update active navigation on scroll (global function)
function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.doc-section');
    let currentSection = '';
    
    // Only update active nav if we're not at the very top of the page
    if (window.pageYOffset > 50) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
    } else {
        // If we're at the top, default to the introduction section
        currentSection = 'introduction';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Ensure page starts at the top on refresh
    window.scrollTo(0, 0);
    
    // Initialize all navigation sections as collapsed
    const navSections = document.querySelectorAll('.nav-section');
    navSections.forEach(section => {
        section.classList.add('collapsed');
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial call - set introduction as active by default
    setTimeout(() => {
        updateActiveNav();
    }, 100);
});

// ========================================
// ENSURE PAGE STARTS AT TOP ON REFRESH
// ========================================

window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

window.addEventListener('load', function() {
    // Force scroll to top after everything is loaded
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and features
    const animatedElements = document.querySelectorAll(
        '.card, .feature-item, .platform-card, .checklist-item, .comparison-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ========================================
// COPY CODE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const commandCards = document.querySelectorAll('.command-card code');
    
    commandCards.forEach(code => {
        code.style.cursor = 'pointer';
        code.setAttribute('title', 'Cliquer pour copier');
        
        code.addEventListener('click', function() {
            const text = this.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(text).then(function() {
                // Show feedback
                const originalText = code.textContent;
                code.textContent = '✓ Copié!';
                code.style.backgroundColor = '#d5f4e6';
                
                setTimeout(function() {
                    code.textContent = originalText;
                    code.style.backgroundColor = '';
                }, 2000);
            }).catch(function(err) {
                console.error('Erreur lors de la copie:', err);
            });
        });
    });
});

// ========================================
// GLOBAL COPY COMMAND FUNCTION
// ========================================

// Global function for copying commands (called by onclick)
function copyCommand(element) {
    const text = element.textContent.trim();
    
    // Copy to clipboard
    navigator.clipboard.writeText(text).then(function() {
        // Show feedback
        const originalText = element.textContent;
        const originalBg = element.style.backgroundColor;
        
        element.textContent = '✓ Copié!';
        element.style.backgroundColor = '#d5f4e6';
        element.style.color = '#27ae60';
        
        setTimeout(function() {
            element.textContent = originalText;
            element.style.backgroundColor = originalBg;
            element.style.color = '';
        }, 2000);
    }).catch(function(err) {
        console.error('Erreur lors de la copie:', err);
        // Fallback for older browsers
        const originalText = element.textContent;
        element.textContent = '❌ Erreur de copie';
        element.style.backgroundColor = '#ffebee';
        element.style.color = '#e74c3c';
        
        setTimeout(function() {
            element.textContent = originalText;
            element.style.backgroundColor = '';
            element.style.color = '';
        }, 2000);
    });
}

// ========================================
// ENHANCED COPY FUNCTIONALITY FOR ALL CODE CONTAINERS
// ========================================

// Function to apply copy functionality to a container
function applyCodeCopyFunctionality(container = document) {
    // Add copy functionality to all code elements that don't already have onclick
    const allCodeElements = container.querySelectorAll('code:not([onclick]):not(.copyable-code), pre code:not(.copyable-code), .code-block code:not(.copyable-code)');
    
    allCodeElements.forEach(code => {
        // Skip if it's too short (likely inline code)
        if (code.textContent.trim().length < 3) return;
        
        code.style.cursor = 'pointer';
        code.setAttribute('title', 'Cliquer pour copier');
        code.classList.add('copyable-code');
        
        code.addEventListener('click', function(e) {
            e.stopPropagation();
            copyCommand(this);
        });
    });
    
    // Add copy functionality to command-example elements specifically
    const commandExamples = container.querySelectorAll('.command-example:not([onclick]):not(.copyable-code)');
    
    commandExamples.forEach(cmd => {
        cmd.style.cursor = 'pointer';
        cmd.setAttribute('title', 'Cliquer pour copier');
        cmd.classList.add('copyable-code');
        
        cmd.addEventListener('click', function(e) {
            e.stopPropagation();
            copyCommand(this);
        });
    });
    
    // Add copy functionality to command-card code elements
    const commandCardCodes = container.querySelectorAll('.command-card code:not([onclick]):not(.copyable-code)');
    
    commandCardCodes.forEach(code => {
        code.style.cursor = 'pointer';
        code.setAttribute('title', 'Cliquer pour copier');
        code.classList.add('copyable-code');
        
        code.addEventListener('click', function(e) {
            e.stopPropagation();
            copyCommand(this);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Apply copy functionality to initial content
    applyCodeCopyFunctionality();
});

// ========================================
// MOBILE SIDEBAR TOGGLE (Optional)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button if on mobile
    if (window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        menuToggle.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            width: 48px;
            height: 48px;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            z-index: 1001;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        
        document.body.appendChild(menuToggle);
        
        const sidebar = document.querySelector('.sidebar');
        
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
        
        // Close sidebar when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebar.classList.remove('open');
            });
        });
    }
});

// ========================================
// DYNAMIC CONTENT LOADER FOR COLLABORATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const sectionsToLoad = [
        { id: 'Qu-est-ce-que-Git-placeholder', url: 'sections/Qu-est-ce-que-Git.html' },
        { id: 'git-installation-placeholder', url: 'sections/git-installation.html' },
        { id: 'basic-commands-placeholder', url: 'sections/basic-commands.html' },
        { id: 'branching-tutorial-placeholder', url: 'sections/branching-tutorial.html' },
        { id: 'git-conflicts-placeholder', url: 'sections/git-conflicts.html' },
        { id: 'git-remote-platforms-placeholder', url: 'sections/git-remote-platforms.html' },
        { id: 'gitlab-platform-placeholder', url: 'sections/gitlab-platform.html' }
        
    ];

    // If fetch isn't available, bail out gracefully.
    if (!window.fetch) {
        console.warn('Fetch API not available; dynamic sections will not be loaded.');
        return;
    }

    sectionsToLoad.forEach(section => {
        const placeholder = document.getElementById(section.id);
        if (!placeholder) return;

        fetch(section.url)
            .then(response => {
                if (!response.ok) throw new Error('File not found');
                return response.text();
            })
            .then(html => {
                // Insert the loaded HTML into the placeholder
                placeholder.innerHTML = html;
                
                // Attach click listeners only to links inside the newly loaded content
                const newNavLinks = placeholder.querySelectorAll('.nav-link');
                newNavLinks.forEach(link => {
                    // Remove any inline/duplicate listeners by replacing the node, then add the handler
                    const clean = link.cloneNode(true);
                    link.parentNode.replaceChild(clean, link);
                    clean.addEventListener('click', handleNavClick);
                });
                
                // Apply copy functionality to newly loaded content
                applyCodeCopyFunctionality(placeholder);
                
                // Update navigation after loading content
                setTimeout(() => {
                    updateActiveNav();
                }, 100);
            })
            .catch(error => {
                console.error(`Failed to load section from ${section.url}:`, error);
                placeholder.innerHTML = `
                    <div class="alert alert-error">
                        <div class="alert-icon">❌</div>
                        <div class="alert-content">
                            <strong>Erreur de chargement</strong>
                            <p>Impossible de charger le contenu depuis ${section.url}</p>
                        </div>
                    </div>
                `;
            });
    });
});

// Navigation click handler function
function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 20;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ========================================
// PRINT STYLES (Optional)
// ========================================

window.addEventListener('beforeprint', function() {
    document.querySelector('.sidebar').style.display = 'none';
    document.querySelector('.main-content').style.marginLeft = '0';
    document.querySelector('.scroll-to-top').style.display = 'none';
});

window.addEventListener('afterprint', function() {
    document.querySelector('.sidebar').style.display = 'block';
    if (window.innerWidth > 768) {
        document.querySelector('.main-content').style.marginLeft = '280px';
    }
});

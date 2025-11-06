// ========================================
// NAVIGATION ACTIVE STATE
// ========================================

// Toggle navigation section
function toggleNavSection(header) {
    const section = header.parentElement;
    section.classList.toggle('collapsed');
}

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.doc-section');
    
    // Update active navigation on scroll
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial call
    updateActiveNav();
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
        { id: 'git-installation-placeholder', url: 'sections/git-installation.html' },
        { id: 'basic-commands-placeholder', url: 'sections/basic-commands.html' },
        { id: 'branching-tutorial-placeholder', url: 'sections/branching-tutorial.html' }
    ];

    sectionsToLoad.forEach(section => {
        const placeholder = document.getElementById(section.id);
        if (placeholder) {
            fetch(section.url)
                .then(response => response.ok ? response.text() : Promise.reject('File not found'))
                .then(html => {
                    placeholder.innerHTML = html;
                    
                    // Update navigation after loading content
                    updateActiveNav();
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
        }
    });
});

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

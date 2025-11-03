// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Navbar current page effect
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Select both desktop and mobile links
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu ul li a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (href === "index.html" && currentPage === "")) {
      link.classList.add("active");
    }
  });
});

// Mobile Menu Toggle - Enhanced
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (mobileMenuToggle && mobileMenu) {
        // Toggle menu
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking a link (but NOT for submenu parent)
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't close menu if this is the "About Us" parent link
                if (link.classList.contains('about-link')) {
                    return; // Let the submenu toggle handler deal with it
                }
                
                // Close menu for all other links
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu on window resize if it's open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
});

// Mobile submenu toggle for "About Us"
document.addEventListener('DOMContentLoaded', () => {
  // Handle mobile menu submenu
  const mobileAboutLink = document.querySelector('.mobile-menu .about-link');
  if (mobileAboutLink) {
    const mobileSubmenuParent = mobileAboutLink.closest('.has-submenu');
    
    mobileAboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileSubmenuParent.classList.toggle('active');
    });
    
    // Close mobile submenu when clicking any submenu item
    const mobileSubmenuLinks = mobileSubmenuParent.querySelectorAll('.submenu a');
    mobileSubmenuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileSubmenuParent.classList.remove('active');
      });
    });
  }

  // Handle desktop menu submenu
  const desktopAboutLink = document.querySelector('.nav-links .about-link');
  if (desktopAboutLink) {
    const desktopSubmenuParent = desktopAboutLink.closest('.has-submenu');
    
    desktopAboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      desktopSubmenuParent.classList.toggle('active');
    });

    // Close desktop submenu when clicking any submenu item
    const desktopSubmenuLinks = desktopSubmenuParent.querySelectorAll('.submenu a');
    desktopSubmenuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        desktopSubmenuParent.classList.remove('active');
      });
    });

    // Close submenu when clicking outside
    document.addEventListener('click', (e) => {
      if (!desktopSubmenuParent.contains(e.target)) {
        desktopSubmenuParent.classList.remove('active');
      }
    });
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Accordion functionality
document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // Close all accordions
    document.querySelectorAll('.acc-btn').forEach(b => { 
      b.setAttribute('aria-expanded','false'); 
      b.nextElementSibling.hidden = true; 
    });
    // Open clicked accordion if it was closed
    if(!expanded){
      btn.setAttribute('aria-expanded','true');
      btn.nextElementSibling.hidden = false;
    }
  });
});

// Team bio toggle
function toggleBio(card) {
    const bio = card.querySelector('.team-bio');
    bio.classList.toggle('show-bio');
}
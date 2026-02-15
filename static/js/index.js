/**
 * Index Page Scripts
 */

// Reveal animations on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;

  reveals.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    const revealPoint = 50;

    if (cardTop < windowHeight - revealPoint) {
      setTimeout(() => {
        card.classList.add('active');
      }, index * 70);
    }
  });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const path = window.location.pathname;
  
  // Remove all active classes initially
  navLinks.forEach(link => link.classList.remove('active'));
  
  // Set active based on current page/path
  if (path === '/' || path.indexOf('index') !== -1) {
    navLinks[0]?.classList.add('active');
    setupScrollNavUpdate();
  }
}

function setupScrollNavUpdate() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const destinations = document.getElementById('destinations');
  const about = document.getElementById('about');
  
  if (!destinations || !about) return;
  
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const destPos = destinations.offsetTop - 200;
    const aboutPos = about.offsetTop - 200;
    
    navLinks.forEach(l => l.classList.remove('active'));
    
    if (scrollPos >= aboutPos) {
      navLinks[3]?.classList.add('active'); // About
    } else if (scrollPos >= destPos) {
      navLinks[1]?.classList.add('active'); // Destinations
    } else {
      navLinks[0]?.classList.add('active'); // Home
    }
  });
}

// About section "Learn More" toggle
function initAboutToggle() {
  const btn = document.getElementById('learnMoreBtn');
  const more = document.getElementById('aboutMore');
  
  if (btn && more) {
    btn.addEventListener('click', () => {
      more.classList.toggle('about-more-open');
      btn.textContent = more.classList.contains('about-more-open') ? 'Show Less' : 'Learn More';
    });
  }
}

// Newsletter form submission
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('newsletterEmail').value;
      const btn = document.getElementById('newsletterBtn');
      const originalText = btn.textContent;
      
      btn.disabled = true;
      btn.textContent = 'Subscribing...';
      
      fetch('/newsletter', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'email=' + encodeURIComponent(email)
      })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          if (typeof showSuccessBar === 'function') {
            showSuccessBar(data.message || 'Successfully subscribed to newsletter!');
          } else if (typeof showToast === 'function') {
            showToast(data.message || 'Successfully subscribed to newsletter!', 'success');
          }
          form.reset();
        } else {
          if (typeof showSuccessBar === 'function') {
            showSuccessBar(data.message || 'Error subscribing. Please try again.', 3000);
          } else if (typeof showToast === 'function') {
            showToast(data.message || 'Error subscribing. Please try again.', 'error');
          }
        }
        btn.textContent = originalText;
        btn.disabled = false;
      })
      .catch(err => {
        console.error('Newsletter error:', err);
        if (typeof showSuccessBar === 'function') {
          showSuccessBar('Error subscribing. Please try again.', 3000);
        } else if (typeof showToast === 'function') {
          showToast('Error subscribing. Please try again.', 'error');
        }
        btn.textContent = originalText;
        btn.disabled = false;
      });
    });
  }
}

// Initialize all index page functionality
function initIndexPage() {
  updateActiveNavLink();
  initAboutToggle();
  initNewsletterForm();
  revealOnScroll();
}

// Event listeners
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIndexPage);
} else {
  initIndexPage();
}

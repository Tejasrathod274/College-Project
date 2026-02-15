/**
 * Common JavaScript Functions
 * Shared across all pages
 */

// Dropdown toggle function
function toggleDropdown() {
  const dd = document.getElementById("profileDropdown");
  const ddNav = document.querySelector('.dropdown-nav');
  
  if (ddNav) {
    ddNav.classList.toggle("show");
  }
  if (dd) {
    dd.classList.toggle("show");
  }
}

// Toast notification system
function showToast(message, type = 'success') {
  type = type || 'success';
  
  // Create toast container if it doesn't exist
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
  toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
  
  container.appendChild(toast);
  
  // Remove toast after 4 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.user-profile') && !e.target.closest('.user-profile-nav') && !e.target.closest('[data-dropdown-toggle]')) {
    const dd = document.getElementById("profileDropdown");
    const ddNav = document.querySelector('.dropdown-nav');
    if (dd) dd.classList.remove("show");
    if (ddNav) ddNav.classList.remove("show");
  }
});

// Toggle menu for mobile - using event delegation
function initMenuToggle() {
  const menuToggles = document.querySelectorAll('[data-menu-toggle], .menu-toggle');
  menuToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const navLinks = document.querySelector(".nav-links");
      if (navLinks) {
        navLinks.classList.toggle("active");
      }
    });
  });
}

// Initialize dropdown toggles
function initDropdownToggles() {
  const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDropdown();
    });
  });
}

// Navbar: fetch current user and show profile
function updateNavAuth() {
  const navLogin = document.getElementById('navLogin');
  const mobileNavLogin = document.getElementById('mobileNavLogin');
  const userProfile = document.getElementById('userProfile');
  
  // Set initial visibility
  if (navLogin) navLogin.style.display = 'inline-block';
  if (mobileNavLogin) mobileNavLogin.style.display = 'block';
  if (userProfile) userProfile.style.display = 'none';
  
  fetch('/api/current_user', { credentials: 'same-origin' })
    .then(res => res.json())
    .then(data => {
      if (!data || !data.logged_in) {
        // NOT LOGGED IN
        if (navLogin) navLogin.style.display = 'inline-block';
        if (mobileNavLogin) mobileNavLogin.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
        return;
      }
      
      // LOGGED IN
      if (navLogin) navLogin.style.display = 'none';
      if (mobileNavLogin) mobileNavLogin.style.display = 'none';
      if (userProfile) {
        userProfile.style.display = 'block';
        
        // Update avatar if uploaded
        if (data.avatar) {
          const existingImg = userProfile.querySelector('img');
          if (!existingImg) {
            const avatarHtml = '<img src="'+data.avatar+'" alt="profile" class="nav-avatar">';
            const dropdownHtml = '<div class="dropdown" id="profileDropdown"><a href="/profile">My Account</a><a href="#" class="logout-trigger">Logout</a></div>';
            userProfile.innerHTML = avatarHtml + dropdownHtml;
          }
        }
      }
    })
    .catch(err => {
      console.error('Auth check failed:', err);
      if (navLogin) navLogin.style.display = 'inline-block';
      if (userProfile) userProfile.style.display = 'none';
    });
}

// Flash message close handlers
function initFlashMessages() {
  const closeButtons = document.querySelectorAll('[data-dismiss="flash"]');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const flashMsg = this.closest('.flash-message');
      if (flashMsg) {
        flashMsg.style.opacity = '0';
        setTimeout(() => flashMsg.remove(), 300);
      }
    });
  });
}

// Initialize all common functionality
function initCommon() {
  updateNavAuth();
  initMenuToggle();
  initDropdownToggles();
  initFlashMessages();
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommon);
} else {
  initCommon();
}

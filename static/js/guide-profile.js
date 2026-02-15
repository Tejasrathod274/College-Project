
// Phone validation - shared across forms
const phoneInput = document.getElementById('phoneInput');
const phoneError = document.getElementById('phoneError');

if (phoneInput) {
  // Allow only numbers
  phoneInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Clear error when user types
    if (phoneError) phoneError.textContent = '';
  });

  // Validate on blur
  phoneInput.addEventListener('blur', function() {
    validatePhone();
  });

  // Validate on form submission
  const form = phoneInput.closest('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      if (phoneInput.value && !validatePhone()) {
        e.preventDefault();
        return false;
      }
    });
  }
}

function validatePhone() {
  const phone = phoneInput?.value?.trim();
  
  if (!phone) {
    return true; // Allow empty if not required
  }
  
  if (!/^[0-9]{10}$/.test(phone)) {
    if (phoneError) phoneError.textContent = 'Phone must be exactly 10 digits';
    return false;
  }
  
  if (phoneError) phoneError.textContent = '';
  return true;
}

/**
 * Guide Profile Page Tab Navigation
 */
function initGuideProfileTabs() {
  const menuButtons = document.querySelectorAll('.menu-btn[data-tab]');
  
  menuButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Skip if it's a logout button
      if (this.classList.contains('logout') || this.classList.contains('logout-trigger')) {
        return;
      }
      
      // Remove active class from all buttons and cards
      menuButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding card
      const tabId = this.getAttribute('data-tab');
      const targetCard = document.getElementById(tabId);
      if (targetCard) {
        targetCard.classList.add('active');
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initGuideProfileTabs);
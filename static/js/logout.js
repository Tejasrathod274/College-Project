/**
 * Centralized Logout Modal Handler
 * Handles all logout confirmations across the application
 */

(function() {
    'use strict';
    
    const modal = document.getElementById('logoutModal');
    let logoutUrl = '/logout';
    
    // Show modal function
    function showLogoutModal(url) {
        logoutUrl = url || '/logout';
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Hide modal function
    function hideLogoutModal() {
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
    
    // Handle logout confirmation
    function confirmLogout() {
        hideLogoutModal();
        
        // Show loading message if available
        if (typeof showToast === 'function') {
            showToast('Logging out...', 'success');
        }
        
        // Redirect after short delay
        setTimeout(() => {
            window.location.href = logoutUrl;
        }, 300);
    }
    
    // Attach event listeners when DOM is ready
    function initLogoutHandlers() {
        // All logout triggers (navbar, sidebar, mobile, etc.)
        const logoutTriggers = document.querySelectorAll('.logout-trigger, [data-logout]');
        logoutTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const url = this.getAttribute('href') || this.dataset.logout || '/logout';
                showLogoutModal(url);
            });
        });
        
        // Modal close buttons
        const closeButtons = document.querySelectorAll('[data-modal-close]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', hideLogoutModal);
        });
        
        // Modal confirm button
        const confirmButton = document.querySelector('[data-modal-confirm]');
        if (confirmButton) {
            confirmButton.addEventListener('click', confirmLogout);
        }
        
        // Close modal when clicking overlay
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    hideLogoutModal();
                }
            });
        }
        
        // Close modal on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
                hideLogoutModal();
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLogoutHandlers);
    } else {
        initLogoutHandlers();
    }
    
    // Expose functions globally if needed
    window.showLogoutModal = showLogoutModal;
    window.hideLogoutModal = hideLogoutModal;
    
})();

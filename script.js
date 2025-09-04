// Certificate of Occupancy Portal JavaScript

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Payment portal function
function openPaymentPortal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close payment modal function
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Process payment function
function processPayment() {
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        propertyAddress: document.getElementById('propertyAddress').value,
        landSize: document.getElementById('landSize').value
    };
    
    // Validate form
    const validation = validateApplicationForm(formData);
    if (!validation.isValid) {
        alert('Please fill in all required fields:\n' + validation.errors.join('\n'));
        return;
    }
    
    // In a real implementation, this would integrate with a payment gateway
    alert('Payment Processing...\n\nApplication submitted successfully!\n\nYou will receive a confirmation email shortly.\nApplication ID: C-O-O-' + Date.now());
    
    // Close modal after successful submission
    closePaymentModal();
    
    // Reset form
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('propertyAddress').value = '';
    document.getElementById('landSize').value = '';
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    
    if (window.scrollY > 50) {
        navContainer.style.background = 'rgba(255, 255, 255, 0.98)';
        navContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    } else {
        navContainer.style.background = 'rgba(255, 255, 255, 0.95)';
        navContainer.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// Add hover effects for better interactivity
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Form validation for future implementation
function validateApplicationForm(formData) {
    const requiredFields = ['fullName', 'email', 'phone', 'propertyAddress', 'landSize'];
    const errors = [];
    
    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            errors.push(`${fieldName} is required`);
        }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation (basic)
    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Utility function for formatting currency (for payment display)
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    }).format(amount);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        closePaymentModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePaymentModal();
    }
});

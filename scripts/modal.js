window.initModal = function(){};

function openPaymentPortal() {
	const modal = document.getElementById('paymentModal');
	// Close mobile drawer if open
	const drawer = document.getElementById('mobile-menu');
	const backdrop = document.getElementById('drawer-backdrop');
	if (drawer && drawer.classList.contains('open')) {
		drawer.classList.remove('open');
		if (backdrop) backdrop.classList.remove('visible');
	}
	if (modal) {
		modal.classList.add('active');
		document.body.style.overflow = 'hidden';
	}
}

function closePaymentModal() {
	const modal = document.getElementById('paymentModal');
	if (modal) {
		modal.classList.remove('active');
		document.body.style.overflow = 'auto';
	}
}

function validateApplicationForm(formData) {
	const requiredFields = ['fullName', 'email', 'phone', 'propertyAddress', 'landSize'];
	const errors = [];
	
	requiredFields.forEach(field => {
		if (!formData[field] || formData[field].trim() === '') {
			const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
			errors.push(`${fieldName} is required`);
		}
	});
	
	if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
		errors.push('Please enter a valid email address');
	}
	
	if (formData.phone && /^[\+]?\d[\d\s\-\(\)]{9,}$/.test(formData.phone) === false) {
		errors.push('Please enter a valid phone number');
	}
	
	return { isValid: errors.length === 0, errors };
}

function processPayment() {
	const formData = {
		fullName: document.getElementById('fullName')?.value || '',
		email: document.getElementById('email')?.value || '',
		phone: document.getElementById('phone')?.value || '',
		propertyAddress: document.getElementById('propertyAddress')?.value || '',
		landSize: document.getElementById('landSize')?.value || ''
	};
	
	const validation = validateApplicationForm(formData);
	if (!validation.isValid) {
		alert('Please fill in all required fields:\n' + validation.errors.join('\n'));
		return;
	}
	
	alert('Payment Processing...\n\nApplication submitted successfully!\n\nYou will receive a confirmation email shortly.\nApplication ID: C-O-O-' + Date.now());
	closePaymentModal();
	
	['fullName','email','phone','propertyAddress','landSize'].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.value = '';
	});
}

function formatCurrency(amount) {
	return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
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


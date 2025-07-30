// Professional Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('successMessage');
        this.btnText = document.querySelector('.btn-text');
        this.btnLoading = document.querySelector('.btn-loading');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.addFormValidation();
        this.addInputAnimations();
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        this.setLoadingState(true);

        try {
            const formData = this.getFormData();
            await this.sendEmail(formData);
            this.showSuccess();
        } catch (error) {
            console.error('Error sending email:', error);
            this.showError();
        } finally {
            this.setLoadingState(false);
        }
    }

    getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
    }

    async sendEmail(formData) {
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: 'Md Abdullah Al Mubin'
        };

        return emailjs.send('service_0jgffj7', 'template_89vfg5n', templateParams);
    }

    validateForm() {
        const requiredFields = ['name', 'email', 'subject', 'message'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const value = field.value.trim();
            
            if (!value) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else if (fieldId === 'email' && !this.isValidEmail(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        // Remove existing error
        this.clearFieldError(field);
        
        // Add error styling
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: fadeInUp 0.3s ease;
        `;
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        // Reset field styling
        field.style.borderColor = '#e1e5e9';
        field.style.boxShadow = '';
        
        // Remove error message
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    setLoadingState(loading) {
        this.submitBtn.disabled = loading;
        
        if (loading) {
            this.btnText.style.display = 'none';
            this.btnLoading.style.display = 'inline';
        } else {
            this.btnText.style.display = 'inline';
            this.btnLoading.style.display = 'none';
        }
    }

    showSuccess() {
        this.form.style.display = 'none';
        this.successMessage.classList.add('show');
        
        // Add celebration animation
        this.addCelebrationEffect();
    }

    showError() {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        errorDiv.textContent = 'Failed to send message. Please try again.';
        
        document.body.appendChild(errorDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => errorDiv.remove(), 300);
        }, 5000);
    }

    addCelebrationEffect() {
        // Create confetti effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 20);
        }
    }

    createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${this.getRandomColor()};
            top: -10px;
            left: ${Math.random() * 100}vw;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => confetti.remove(), 5000);
    }

    getRandomColor() {
        const colors = ['#667eea', '#764ba2', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    addFormValidation() {
        // Real-time validation
        const fields = ['name', 'email', 'subject', 'message'];
        
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            
            field.addEventListener('blur', () => {
                if (field.value.trim()) {
                    this.clearFieldError(field);
                    
                    if (fieldId === 'email' && !this.isValidEmail(field.value.trim())) {
                        this.showFieldError(field, 'Please enter a valid email address');
                    }
                }
            });
            
            field.addEventListener('input', () => {
                if (field.parentNode.querySelector('.field-error')) {
                    this.clearFieldError(field);
                }
            });
        });
    }

    addInputAnimations() {
        // Add focus animations to form inputs
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentNode.style.transform = 'translateY(-2px)';
                input.parentNode.style.transition = 'transform 0.2s ease';
            });
            
            input.addEventListener('blur', () => {
                input.parentNode.style.transform = 'translateY(0)';
            });
        });
    }
}

// Reset form function
function resetForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    contactForm.reset();
    contactForm.style.display = 'block';
    successMessage.classList.remove('show');
    
    // Clear any existing errors
    document.querySelectorAll('.field-error').forEach(error => error.remove());
    document.querySelectorAll('input, textarea').forEach(field => {
        field.style.borderColor = '#e1e5e9';
        field.style.boxShadow = '';
    });
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});

// ================================
// SMOOTH SCROLL
// ================================
// Select every anchor link on the page that points to an internal section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ================================
// CONTACT FORM VALIDATION
// ================================
const form = document.querySelector('.contact-form');

if (form) {
  const fields = {
    name: {
      element: document.getElementById('name'),
      validate: value => value.trim().length >= 2,
      message: 'Please enter your name (at least 2 characters)'
    },
    email: {
      element: document.getElementById('email'),
      validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email address'
    },
    subject: {
      element: document.getElementById('subject'),
      validate: value => value.trim().length >= 3,
      message: 'Please enter a subject (at least 3 characters)'
    },
    message: {
      element: document.getElementById('message'),
      validate: value => value.trim().length >= 20,
      message: 'Please enter a message (at least 20 characters)'
    }
  };

  // Show error on a field
  function showError(field, message) {
    field.element.classList.add('input-error');
    let error = field.element.parentNode.querySelector('.error-message');
    if (!error) {
      error = document.createElement('p');
      error.classList.add('error-message');
      field.element.parentNode.appendChild(error);
    }
    error.textContent = message;
  }

  // Clear error on a field
  function clearError(field) {
    field.element.classList.remove('input-error');
    const error = field.element.parentNode.querySelector('.error-message');
    if (error) error.remove();
  }

  // Validate on blur (when user leaves a field)
  Object.values(fields).forEach(field => {
    field.element.addEventListener('blur', () => {
      if (!field.validate(field.element.value)) {
        showError(field, field.message);
      } else {
        clearError(field);
      }
    });

    // Clear error as user types
    field.element.addEventListener('input', () => {
      if (field.validate(field.element.value)) {
        clearError(field);
      }
    });
  });

  // Validate on submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    Object.values(fields).forEach(field => {
      if (!field.validate(field.element.value)) {
        showError(field, field.message);
        isValid = false;
      } else {
        clearError(field);
      }
    });

    if (isValid) {
      showSuccess();
    }
  });

  // Show success message
  function showSuccess() {
    form.innerHTML = `
      <div class="form-success">
        <h3>Message sent!</h3>
        <p>Thanks for getting in touch. I'll get back to you within a day or two.</p>
      </div>
    `;
  }
}
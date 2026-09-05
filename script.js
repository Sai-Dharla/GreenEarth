// ==========================================================================
// GreenEarth - Interactive Client-Side JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Sticky Header Elevation on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          const icon = mobileToggle.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars';
        }
      });
    });
  }

  // 4. Active Navigation Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const currentNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (currentNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          currentNavLink.classList.add('active');
        } else {
          currentNavLink.classList.remove('active');
        }
      }
    });
  });

  // 5. Connect "How You Can Help" Buttons directly into Contact Subject Selector
  const helpActionButtons = document.querySelectorAll('.help-action-btn');
  const subjectSelect = document.getElementById('subject');

  helpActionButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const action = btn.getAttribute('data-action');
      if (action && subjectSelect) {
        for (let i = 0; i < subjectSelect.options.length; i++) {
          if (subjectSelect.options[i].value === action) {
            subjectSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // 6. Contact Form Validation & Interactive Feedback
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submitBtn');
  const formFeedback = document.getElementById('formFeedback');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const clearErrors = () => {
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formFeedback.className = 'form-feedback';
    formFeedback.textContent = '';
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your full name.';
        isValid = false;
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please write a brief message.';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Your message should be at least 10 characters.';
        isValid = false;
      }

      if (!isValid) return;

      // Simulate sending state
      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Message...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
        
        formFeedback.classList.add('success');
        formFeedback.innerHTML = `🎉 Thank you, <strong>${nameInput.value.trim()}</strong>! Your message has been received. Our team will reach out to you shortly.`;

        contactForm.reset();

        // Clear feedback message after 6 seconds
        setTimeout(() => {
          formFeedback.className = 'form-feedback';
          formFeedback.textContent = '';
        }, 6000);
      }, 1000);
    });
  }
});


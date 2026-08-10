document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      
      // Accessibility states
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
    });
  }

  // Active Link Indicator
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  const currentFilename = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentFilename || (currentFilename === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Contact Form Validation and Submission
  const contactForm = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMsg');
  const errorMsg = document.getElementById('errorMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';

      // Capture values
      const name = document.getElementById('clientName')?.value.trim();
      const email = document.getElementById('clientEmail')?.value.trim();
      const company = document.getElementById('clientCompany')?.value.trim();
      const message = document.getElementById('clientMessage')?.value.trim();
      const inquiryType = document.getElementById('inquiryType')?.value;

      // Basic validation
      if (!name || !email || !message) {
        showFeedback(errorMsg, 'Please fill in all required fields (Name, Email, Message).');
        return;
      }

      if (!validateEmail(email)) {
        showFeedback(errorMsg, 'Please enter a valid email address.');
        return;
      }

      // Simulate API submit
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showFeedback(successMsg, `Thank you, ${name}. Your inquiry regarding "${inquiryType}" has been sent successfully. We will contact you shortly.`);
        contactForm.reset();
      }, 1200);
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showFeedback(element, text) {
    if (element) {
      element.innerHTML = text;
      element.style.display = 'block';
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

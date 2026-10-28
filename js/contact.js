/* ==========================================
   MANOJ X STUDIO — Contact JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const projectType = document.getElementById('projectType').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.style.color = '#ff6b6b';
      return;
    }

    // Construct honest static mailto fallback
    const subject = encodeURIComponent(`Portfolio Inquiry: ${projectType} from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`);
    
    window.location.href = `mailto:itsmanuskr@gmail.com?subject=${subject}&body=${body}`;
    
    formStatus.textContent = 'Opening your email client to send the message...';
    formStatus.style.color = 'var(--accent)';
    
    setTimeout(() => {
      contactForm.reset();
    }, 2000);
  });
});
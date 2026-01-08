document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Language Detection
    function getLang() {
      return document.documentElement.lang || 
             localStorage.getItem('language') || 
             'fr';
    }
    
    // Messages according to the language
    const messages = {
      en: {
        fillAll: 'Please fill in all required fields.',
        sent: 'Message sent successfully!'
      },
      fr: {
        fillAll: 'Veuillez remplir tous les champs obligatoires.',
        sent: 'Message envoyé avec succès !'
      }
    };
    
    contactForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const lang = getLang();
      
      // Validation
      const inputs = contactForm.querySelectorAll('[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ff4757';
        }
      });
      
      if (!isValid) {
        alert(messages[lang]?.fillAll || messages.en.fillAll);
        return;
      }
      
      // Sending...
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = lang === 'fr' ? 'Envoi...' : 'Sending...';
      submitBtn.disabled = true;
      
      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          submitBtn.textContent = lang === 'fr' ? '✓ Envoyé !' : '✓ Sent!';
          contactForm.reset();
          
          setTimeout(() => {
            alert(messages[lang]?.sent || messages.en.sent);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 1000);
        }
      } catch (error) {
        submitBtn.textContent = lang === 'fr' ? 'Erreur' : 'Error';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  });
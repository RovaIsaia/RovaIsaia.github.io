// assets/js/language-switcher.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('LANGUAGE SWITCHER - Loaded');
    
    // SIMPLE function to switch links
    function switchLinks(lang) {
      console.log('Switching links for:', lang);
      
      // 1. EMAIL LINKS
      const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
      console.log('Email links found:', emailLinks.length);
      
      emailLinks.forEach(link => {
        // Hide all first
        link.style.display = 'none';
        link.style.visibility = 'hidden';
        
        // Show only the one in the correct language
        if (lang === 'fr' && link.href.includes('Proposition%20de%20collaboration')) {
          link.style.display = 'flex';
          link.style.visibility = 'visible';
          console.log('Email FR visible');
        } 
        else if (lang === 'en' && link.href.includes('Collaboration%20Proposal')) {
          link.style.display = 'flex';
          link.style.visibility = 'visible';
          console.log('Email EN visible');
        }
      });
      
      // 2. CV LINKS
      const cvLinks = document.querySelectorAll('a[href*="CV_"]');
      console.log('CV links found:', cvLinks.length);
      
      cvLinks.forEach(link => {
        // Hide all first
        link.style.display = 'none';
        link.style.visibility = 'hidden';
        
        // Show only the one in the correct language
        if (lang === 'fr' && link.href.includes('Rova_Isaia_Andriamamy_CV_Fr.pdf')) {
          link.style.display = 'inline-block';
          link.style.visibility = 'visible';
          console.log('CV FR visible');
        } 
        else if (lang === 'en' && link.href.includes('Rova_Isaia_Andriamamy_CV_En.pdf')) {
          link.style.display = 'inline-block';
          link.style.visibility = 'visible';
          console.log('CV EN visible');
        }
      });
      
      console.log('Links updated');
    }
    
    // Initialize with current language
    setTimeout(() => {
      const currentLang = localStorage.getItem('language') || 'fr';
      console.log('Initial language:', currentLang);
      switchLinks(currentLang);
    }, 300);
    
    // Listen for language changes
    document.addEventListener('languageChanged', function(e) {
      console.log('Language changed event:', e.detail.lang);
      setTimeout(() => {
        switchLinks(e.detail.lang);
      }, 100);
    });
    
    // Listen for clicks on FR/EN buttons
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('lang-btn')) {
        const lang = e.target.getAttribute('data-lang');
        setTimeout(() => {
          switchLinks(lang);
        }, 200);
      }
    });
    
    // Expose for debug
    window.switchLinks = switchLinks;
    
    console.log('Language Switcher ready');
  });
// assets/js/translation-manager.js
document.addEventListener('DOMContentLoaded', function() {
  console.log('TRANSLATION MANAGER');
  
  let currentLang = localStorage.getItem('language') || 'en';
  
  // HELPER FUNCTION
  function applyElementTranslation(element, translation) {
    // CASE 1: INPUT/TEXTAREA WITH PLACEHOLDER
    if (element.placeholder !== undefined) {
      element.placeholder = translation;
      return;
    }
    
    // CASE 2: BUTTONS
    if (element.tagName === 'BUTTON') {
      element.textContent = translation;
      return;
    }
    
    // CASE 3: REGULAR TEXT ELEMENTS
    if (translation.includes('<')) {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
  }
  
  // FORCE IMMEDIATE TRANSLATION
  function forceTranslation(lang) {
    console.log('FORCE TRANSLATION to:', lang);
    
    // Save
    localStorage.setItem('language', lang);
    currentLang = lang;
    
    // Update page lang attribute
    document.documentElement.lang = lang;
    
    // Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // PROTECT DYNAMIC LINKS (email & CV)
    const protectedLinks = {
      email: document.getElementById('email-link'),
      cv: document.getElementById('cv-link')
    };
    const savedHref = { email: protectedLinks.email?.href, cv: protectedLinks.cv?.href };
    const savedDownload = protectedLinks.cv?.download;
    
    // STEP 1: Translate EVERYTHING with data-translate
    console.log('Step 1: data-translate translation...');
    const allElements = document.querySelectorAll('[data-translate]');
    console.log('Elements found:', allElements.length);
    
    allElements.forEach((el, i) => {
      const key = el.getAttribute('data-translate');
      const translation = translations[lang] ? translations[lang][key] : null;
      
      if (!translation) {
        console.warn(`[${i}] MISSING TRANSLATION: ${key} for ${lang}`);
        // Fallback to English if translation missing
        if (lang !== 'en' && translations.en && translations.en[key]) {
          applyElementTranslation(el, translations.en[key]);
          console.log(`[${i}] Fallback EN: ${key}`);
        }
        return;
      }
      
      // APPLY TRANSLATION BASED ON ELEMENT TYPE
      applyElementTranslation(el, translation);
      console.log(`[${i}] ${key} → ${translation.substring(0, 30)}...`);
    });
    
    // RESTORE PROTECTED LINKS (if modified)
    if (protectedLinks.email && savedHref.email) protectedLinks.email.href = savedHref.email;
    if (protectedLinks.cv && savedHref.cv) protectedLinks.cv.href = savedHref.cv;
    if (protectedLinks.cv && savedDownload) protectedLinks.cv.download = savedDownload;
    
    // STEP 2: Section titles
    console.log('Step 2: Section titles...');
    document.querySelectorAll('.section-title').forEach(title => {
      const section = title.closest('section');
      if (section && section.id) {
        const sectionKey = `section-${section.id}`;
        const dataTitleKey = `data-title-${section.id}`;
        
        if (translations[lang] && translations[lang][sectionKey]) {
          applyElementTranslation(title, translations[lang][sectionKey]);
        }
        
        if (translations[lang] && translations[lang][dataTitleKey]) {
          title.setAttribute('data-title', translations[lang][dataTitleKey]);
        }
      }
    });
    
    // STEP 3: Update page title
    updatePageTitle(lang);
    
    // CSS class for animations
    document.body.classList.remove('lang-en', 'lang-fr');
    document.body.classList.add(`lang-${lang}`);
    
    // Transition animation
    document.body.classList.add('translating');
    setTimeout(() => {
      document.body.classList.remove('translating');
    }, 300);
    
    console.log('Forced translation completed');
    
    // Trigger event for typewriter AND dynamic links
    const event = new CustomEvent('languageChanged', { detail: { lang } });
    document.dispatchEvent(event);
  }
  
  // Function to update page title
  function updatePageTitle(lang) {
    if (lang === 'fr') {
      document.title = 'Rova Isaia | Astrophysique & Data Science';
    } else {
      document.title = 'Rova Isaia | Astrophysics & Data Science';
    }
  }
  
  // Automatic language detection
  function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('fr') ? 'fr' : 'en';
  }
  
  // Initialize
  function initTranslation() {
    // If no saved language, detect
    if (!localStorage.getItem('language')) {
      const detectedLang = detectBrowserLanguage();
      localStorage.setItem('language', detectedLang);
      currentLang = detectedLang;
      console.log(`Language detected: ${detectedLang}`);
    }
    
    // Initialize buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        console.log(`Language change: ${lang}`);
        forceTranslation(lang);
        
        // Button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
      });
    });
    
    // Apply initial language
    setTimeout(() => {
      console.log(`Initial language: ${currentLang}`);
      forceTranslation(currentLang);
    }, 50);
    
    // Debug: show all keys
    console.log('Keys available in French:', Object.keys(translations.fr || {}).length);
    console.log('Keys available in English:', Object.keys(translations.en || {}).length);
  }
  
  // Start
  initTranslation();
  
  // Expose for debug
  window.forceTranslation = forceTranslation;
  window.currentLang = currentLang;
});
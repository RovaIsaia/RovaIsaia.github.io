/*=============== WAIT FOR TRANSLATIONS ===============*/
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    document.body.classList.add('js-loaded');
    console.log('Page loaded with translations');
  }, 100);
});

/*=============== GLOBAL VARIABLES ===============*/
const styleSwitcher = document.getElementById('style-switcher');
const navMenu = document.getElementById('nav-menu');

/*=============== MENU ===============*/
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle && navMenu && navClose) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
    document.body.style.overflow = 'hidden';
  });

  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = '';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    });
  });
}

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.querySelector('.header');
  if (header && this.scrollY >= 50) {
    header.classList.add('scrolled');
  } else if (header) {
    header.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', scrollHeader);

/*=============== STYLE SWITCHER ===============*/
const switcherToggle = document.getElementById('switcher-toggle');
const switcherClose = document.getElementById('switcher-close');

if (switcherToggle && styleSwitcher) {
  switcherToggle.addEventListener('click', () => {
    styleSwitcher.classList.add('show-switcher');
  });
}

if (switcherClose && styleSwitcher) {
  switcherClose.addEventListener('click', () => {
    styleSwitcher.classList.remove('show-switcher');
  });
}

/*=============== THEME COLORS ===============*/
function initThemeColors() {
  const colors = document.querySelectorAll('.style-switcher-color');
  
  colors.forEach((color) => {
    color.addEventListener('click', function() {
      const styleAttr = this.getAttribute('style');
      let activeColor = '200';
      
      if (styleAttr && styleAttr.includes('--hue:')) {
        const parts = styleAttr.split('--hue:');
        if (parts.length > 1) {
          activeColor = parts[1].trim().split(';')[0].trim();
        }
      }
      
      console.log('Changing color to:', activeColor);

      // Remove active from all colors
      colors.forEach((c) => {
        c.classList.remove('active-color');
      });
      
      // Add active to clicked color
      this.classList.add('active-color');

      // Apply color to document
      document.documentElement.style.setProperty('--hue', activeColor);
      
      // Save color preference
      localStorage.setItem('hue', activeColor);
      
      // Close automatically
      closeAllModals();
    });
  });
}

/*=============== LIGHT/DARK MODE ===============*/
let currentTheme = localStorage.getItem('theme') || 'light';
document.body.className = currentTheme;

document.querySelectorAll('input[name="body-theme"]').forEach((input) => {
  if (input.value === currentTheme) {
    input.checked = true;
  }
  
  input.addEventListener('change', () => {
    currentTheme = input.value;
    document.body.className = currentTheme;
    localStorage.setItem('theme', currentTheme);
    closeAllModals();
  });
});

/*=============== LOAD SAVED THEME ===============*/
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const savedHue = localStorage.getItem('hue');
  
  console.log('Loading theme:', { savedTheme, savedHue });
  
  if (savedTheme) {
    document.body.className = savedTheme;
    document.querySelectorAll('input[name="body-theme"]').forEach(input => {
      input.checked = input.value === savedTheme;
    });
  }
  
  if (savedHue) {
    // Apply saved color
    document.documentElement.style.setProperty('--hue', savedHue);
    
    // Mark correct color as active
    const colors = document.querySelectorAll('.style-switcher-color');
    colors.forEach(color => {
      const styleAttr = color.getAttribute('style');
      if (styleAttr && styleAttr.includes('--hue:')) {
        const parts = styleAttr.split('--hue:');
        if (parts.length > 1) {
          const hueValue = parts[1].trim().split(';')[0].trim();
          if (hueValue === savedHue) {
            color.classList.add('active-color');
            console.log('Active color:', hueValue);
          }
        }
      }
    });
  } else {
    // Activate first color
    const colors = document.querySelectorAll('.style-switcher-color');
    if (colors.length > 0) {
      const firstColor = colors[0];
      const styleAttr = firstColor.getAttribute('style');
      if (styleAttr && styleAttr.includes('--hue:')) {
        const parts = styleAttr.split('--hue:');
        if (parts.length > 1) {
          const defaultHue = parts[1].trim().split(';')[0].trim();
          firstColor.classList.add('active-color');
          localStorage.setItem('hue', defaultHue);
          document.documentElement.style.setProperty('--hue', defaultHue);
          console.log('Default color:', defaultHue);
        }
      }
    }
  }
}

/*=============== CLOSE MODALS ON ESCAPE KEY ===============*/
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals();
  }
});

/*=============== INITIALISATION ===============*/
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initialisation...');
  
  // Load saved theme
  loadSavedTheme();
  
  // Initialize colors
  initThemeColors();
  
  // Other initializations
  console.log('Initialization complete');
});

/*=============== SMOOTH SCROLL ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

/*=============== Accordion for Education section ===============*/
document.addEventListener('DOMContentLoaded', function() {
  const resumeItems = document.querySelectorAll('.resume-item');
  
  resumeItems.forEach(item => {
    const header = item.querySelector('.resume-header');
    const icon = item.querySelector('.resume-icon i');
    
    header.addEventListener('click', () => {
      // Close all other items
      resumeItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('accordion-open')) {
          otherItem.classList.remove('accordion-open');
          const otherIcon = otherItem.querySelector('.resume-icon i');
          otherIcon.classList.remove('ri-close-line');
          otherIcon.classList.add('ri-add-line');
        }
      });
      
      // Toggle current item
      item.classList.toggle('accordion-open');
      
      // Change icon
      if (item.classList.contains('accordion-open')) {
        icon.classList.remove('ri-add-line');
        icon.classList.add('ri-close-line');
      } else {
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-add-line');
      }
    });
  });
});

/*=============== TYPEWRITER EFFECT ===============*/
function initTypewriter() {
  const jobTitle = document.querySelector('.home-job');
  if (!jobTitle) return;
  
  // Define texts in two languages
  const texts = {
    en: [
      'Astrophysics & Data Science Student',
      'Artificial Intelligence Enthusiast',
      'Python Developer',
      'Data Analyst'
    ],
    fr: [
      'Étudiant en Astrophysique & Science des Données',
      'Passionné d\'Intelligence Artificielle',
      'Développeur Python',
      'Analyste de Données'
    ]
  };
  
  // Current language
  let currentLang = localStorage.getItem('language') || 'fr';
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;
  let timeoutId = null;
  
  // Main function
  function type() {
    const currentTexts = texts[currentLang];
    if (!currentTexts || currentTexts.length === 0) return;
    
    const currentText = currentTexts[textIndex];
    
    if (isDeleting) {
      jobTitle.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      jobTitle.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isEnd = true;
      isDeleting = true;
      timeoutId = setTimeout(type, 2000); // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      isEnd = false;
      textIndex = (textIndex + 1) % currentTexts.length;
      timeoutId = setTimeout(type, 500); // Pause before next word
    } else {
      const speed = isDeleting ? 50 : 100;
      timeoutId = setTimeout(type, speed);
    }
  }
  
  // Stop existing effect
  function stopTypewriter() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }
  
  // Start effect after 1 second
  setTimeout(() => {
    stopTypewriter();
    type();
  }, 1000);
  
  // Listen for language changes
  document.addEventListener('languageChanged', function(e) {
    currentLang = e.detail.lang;
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    isEnd = false;
    
    // Stop existing timeouts
    stopTypewriter();
    
    // Restart with new language after short delay
    setTimeout(() => {
      type();
    }, 300);
  });
}

// Initialize typewriter when page loads
document.addEventListener('DOMContentLoaded', initTypewriter);

/*=============== COUNTER ANIMATION ===============*/
function animateCounter(counter, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    counter.textContent = Math.floor(start) + '+';
    
    if (start >= target) {
      counter.textContent = target + '+';
      clearInterval(timer);
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.home-data-no');
  const experienceSection = document.querySelector('.home-data-one');
  
  if (!experienceSection || counters.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const target = parseInt(counter.textContent);
          animateCounter(counter, target, 2000);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(experienceSection);
}

// Initialize counters when page loads
document.addEventListener('DOMContentLoaded', initCounters);

/*=============== NAV LOGO ON MOBILE ===============*/
function adjustNavLogo() {
  const navLogo = document.querySelector('.nav-logo');
  const nav = document.querySelector('.nav');
  
  if (!navLogo || !nav) return;
  
  const navWidth = nav.offsetWidth;
  
  if (navWidth < 400) {
    // Short version on mobile
    navLogo.textContent = 'Rova Isaia A.';
  } else if (navWidth < 500) {
    // Medium version
    navLogo.textContent = 'Rova Isaia ANDRIAMAMY';
  } else {
    // Full version
    navLogo.textContent = 'Rova Isaia ANDRIAMAMY';
  }
}

// Execute on load and resize
window.addEventListener('load', adjustNavLogo);
window.addEventListener('resize', adjustNavLogo);

/*=============== PREVENT ZOOM ON MOBILE ===============*/
function preventZoom() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    document.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, { passive: false });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }
}

/*=============== SCROLL TO SECTION ===============*/
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    if (navMenu && navMenu.classList.contains('show-menu')) {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    }
    
    // Smooth scroll to section
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
    
    // Visual feedback
    const clickedElement = event.currentTarget;
    clickedElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
      clickedElement.style.transform = '';
    }, 200);
  }
}

/*=============== CLOSE ALL MODALS FUNCTION ===============*/
function closeAllModals() {
  // Close menu
  if (navMenu && navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
  }
  
  // Close style switcher
  if (styleSwitcher && styleSwitcher.classList.contains('show-switcher')) {
    styleSwitcher.classList.remove('show-switcher');
  }
  
  // Re-enable scroll
  document.body.style.overflow = '';
}

/*=============== CLOSE MODALS WHEN CLICKING OUTSIDE ===============*/
document.addEventListener('click', (e) => {
  const navToggle = document.getElementById('nav-toggle');
  const switcherToggle = document.getElementById('switcher-toggle');
  
  // Check if menu should be closed
  const shouldCloseMenu = navMenu && 
                          navMenu.classList.contains('show-menu') &&
                          !navMenu.contains(e.target) &&
                          e.target !== navToggle &&
                          !(navToggle && navToggle.contains(e.target));
  
  // Check if style switcher should be closed
  const shouldCloseSwitcher = styleSwitcher &&
                              styleSwitcher.classList.contains('show-switcher') &&
                              !styleSwitcher.contains(e.target) &&
                              e.target !== switcherToggle &&
                              !(switcherToggle && switcherToggle.contains(e.target));
  
  if (shouldCloseMenu || shouldCloseSwitcher) {
    closeAllModals();
  }
});

/*=============== PROJECTS FILTER ===============*/
var mixer = mixitup('.work-container', {
  selectors: {
    target: '.mix'
  },
  animation: {
    duration: 300
  }
});

/* Active project filter */
const linkWork = document.querySelectorAll('.work-item');

function activeWork() {
  linkWork.forEach((a) => {
    a.classList.remove('active-work');
  });

  this.classList.add('active-work');
}

linkWork.forEach((a) => a.addEventListener('click', activeWork));

/*=============== CLOSE MODALS ON ESCAPE KEY ===============*/
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals();
  }
});

/*=============== CLOSE MODALS ON NAV LINK CLICK ===============*/
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeAllModals);
});

/*=============== CLOSE MODALS ON THEME/COLOR SELECTION ===============*/
// Add to color selection
colors.forEach((color) => {
  color.onclick = () => {
    closeAllModals();
  };
});

// Add to theme selection
document.querySelectorAll('input[name="body-theme"]').forEach((input) => {
  input.addEventListener('change', () => {
    closeAllModals(); 
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Force change after 2 seconds
  setTimeout(() => {
    const lang = localStorage.getItem('language') || 'fr';
    console.log('FINAL FORCING for:', lang);
    
    // Call function if it exists
    if (window.switchLinks) {
      window.switchLinks(lang);
    }
    
    // Manual check
    setTimeout(() => {
      console.log('VERIFICATION:');
      console.log('Email FR:', document.getElementById('email-fr')?.style.display);
      console.log('Email EN:', document.getElementById('email-en')?.style.display);
      console.log('CV FR:', document.getElementById('cv-fr')?.style.display);
      console.log('CV EN:', document.getElementById('cv-en')?.style.display);
    }, 500);
  }, 2000);
});

document.addEventListener('DOMContentLoaded', preventZoom);
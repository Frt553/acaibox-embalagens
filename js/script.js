/**
 * AÇAÍ BOX EMBALAGENS - JavaScript Principal
 * Interatividade, animações e funcionalidades
 */

document.addEventListener('DOMContentLoaded', function() {
  // === HEADER SCROLL EFFECT ===
  const header = document.querySelector('.header');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // === MOBILE MENU ===
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // === SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // === FADE IN ANIMATION ON SCROLL ===
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(el => fadeObserver.observe(el));
  
  // === GALERIA LIGHTBOX EFFECT ===
  const galeriaItems = document.querySelectorAll('.galeria-item');
  
  galeriaItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      const overlayText = this.querySelector('.galeria-overlay span')?.textContent || '';
      
      // Criar lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-overlay">
          <button class="lightbox-close" aria-label="Fechar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <img src="${img.src}" alt="${img.alt}">
          ${overlayText ? `<p class="lightbox-caption">${overlayText}</p>` : ''}
        </div>
      `;
      
      // Estilos do lightbox
      lightbox.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.3s ease;
      `;
      
      const lightboxStyles = document.createElement('style');
      lightboxStyles.textContent = `
        .lightbox-overlay {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
        }
        .lightbox-overlay img {
          max-width: 100%;
          max-height: 85vh;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .lightbox-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 10px;
        }
        .lightbox-close svg {
          width: 32px;
          height: 32px;
        }
        .lightbox-caption {
          color: white;
          text-align: center;
          margin-top: 16px;
          font-size: 1.1rem;
          font-weight: 500;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      
      document.head.appendChild(lightboxStyles);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      // Fechar lightbox
      lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
      });
      
      function closeLightbox() {
        lightbox.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
          lightbox.remove();
          lightboxStyles.remove();
          document.body.style.overflow = '';
        }, 300);
      }
      
      // Fechar com ESC
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', escHandler);
        }
      });
    });
  });
  
  // === WHATSAPP LINK TRACKING ===
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Pode adicionar tracking de analytics aqui
      console.log('WhatsApp click tracked');
    });
  });
  
  // === CURRENT YEAR ===
  const yearElements = document.querySelectorAll('.current-year');
  yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // === ACTIVE NAV LINK ON SCROLL ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();
  
  // === PRODUTO CARD HOVER EFFECT ===
  const produtoCards = document.querySelectorAll('.produto-card');
  
  produtoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// === UTILITY FUNCTIONS ===

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Format number with Brazilian locale
 */
function formatNumber(num) {
  return num.toLocaleString('pt-BR');
}

/**
 * Copy to clipboard
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copiado para a área de transferência!');
  });
}

/**
 * Show toast notification
 */
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--roxo-principal);
    color: white;
    padding: 16px 32px;
    border-radius: 50px;
    font-weight: 600;
    z-index: 10000;
    animation: slideUp 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideDown 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

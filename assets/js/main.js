/**
 * ADWALA EXPERTS — Core JavaScript
 * Handles navigation, video player controls, smooth scrolling, animations & contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY NAVBAR ON SCROLL
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. MOBILE MENU TOGGLE
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
      navToggle.innerHTML = isExpanded 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }

  // 3. ACTIVE NAV LINK ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // 4. VIDEO ELEMENTS SAFE INITIALIZATION
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.play().catch(() => {
      // Autoplay with video file might be pending user video drop; poster fallback displays automatically
    });
  }

  const cinematicVideo = document.getElementById('strategyVideo');
  if (cinematicVideo) {
    cinematicVideo.play().catch(() => {});
  }
  const playBtn = document.getElementById('cinematicPlayBtn');
  const muteBtn = document.getElementById('cinematicMuteBtn');

  if (cinematicVideo && playBtn) {
    playBtn.addEventListener('click', () => {
      if (cinematicVideo.paused) {
        cinematicVideo.play().then(() => {
          playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
          playBtn.setAttribute('title', 'Pause');
        }).catch(() => {});
      } else {
        cinematicVideo.pause();
        playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
        playBtn.setAttribute('title', 'Play');
      }
    });
  }

  if (cinematicVideo && muteBtn) {
    muteBtn.addEventListener('click', () => {
      cinematicVideo.muted = !cinematicVideo.muted;
      muteBtn.innerHTML = cinematicVideo.muted
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      muteBtn.setAttribute('title', cinematicVideo.muted ? 'Unmute' : 'Mute');
    });
  }

  // 5. CONTACT FORM HANDLING
  const contactForm = document.getElementById('agencyContactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const company = document.getElementById('contactCompany')?.value.trim();
      const service = document.getElementById('contactService')?.value;
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill in your name, email, and project message.');
        return;
      }

      // Format WhatsApp message
      const waText = encodeURIComponent(
        `*Adwala Experts Project Inquiry*\n\n` +
        `• *Name:* ${name}\n` +
        `• *Email:* ${email}\n` +
        `• *Company:* ${company || 'N/A'}\n` +
        `• *Service:* ${service || 'General Inquiry'}\n` +
        `• *Message:* ${message}`
      );
      
      // Show clean confirmation status
      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <strong>Thank you, ${name}!</strong> Your inquiry has been prepared.
          <br><span style="font-size:0.84rem;color:#cbd5e1;">Opening direct connection via WhatsApp or email to mshafqat6552@gmail.com...</span>
        `;
        formStatus.style.display = 'block';
      }

      // Reset form
      contactForm.reset();

      // Open WhatsApp inquiry window directly for swift client engagement
      setTimeout(() => {
        window.open(`https://wa.me/923235437518?text=${waText}`, '_blank');
      }, 900);
    });
  }

  // 6. SUBTLE SCROLL REVEAL OBSERVER
  const revealElements = document.querySelectorAll('.service-card, .portfolio-card, .process-card, .pillar-card, .trust-visual-card, .about-image-card, .section-header, .hero-orbit-wrapper');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el, index) => {
      el.classList.add('reveal-fade-up');
      const staggerIndex = (index % 6) + 1;
      el.classList.add(`stagger-${staggerIndex}`);
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
});

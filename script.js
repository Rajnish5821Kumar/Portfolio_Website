/* ══════════════════════════════════════════════
   RAJNISH KUMAR — PORTFOLIO JS
   ══════════════════════════════════════════════ */

'use strict';

/* ─────────────── PRELOADER ─────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 700);
    }
    initAOS();
    animateCounters();
    animateSkillBars();
  }, 1200);
});

/* ─────────────── CUSTOM CURSOR ─────────────── */
const dot     = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (dot) {
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  }
});

function animateCursor() {
  outlineX += (mouseX - outlineX) * 0.18;
  outlineY += (mouseY - outlineY) * 0.18;
  if (outline) {
    outline.style.left = outlineX + 'px';
    outline.style.top  = outlineY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .skill-item, .project-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot?.classList.add('hovered');
    outline?.classList.add('hovered');
    if (outline) { outline.style.width = '56px'; outline.style.height = '56px'; outline.style.borderColor = 'rgba(108,99,255,0.8)'; }
  });
  el.addEventListener('mouseleave', () => {
    dot?.classList.remove('hovered');
    outline?.classList.remove('hovered');
    if (outline) { outline.style.width = '36px'; outline.style.height = '36px'; outline.style.borderColor = 'rgba(108,99,255,0.5)'; }
  });
});

/* ─────────────── THEME TOGGLE ─────────────── */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const htmlEl      = document.documentElement;

function setTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('rk-theme', theme);
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }
}

const savedTheme = localStorage.getItem('rk-theme') || 'dark';
setTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

/* ─────────────── NAVBAR SCROLL ─────────────── */
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Scrolled class
  navbar?.classList.toggle('scrolled', scrollY > 20);

  // Hide/show on scroll direction
  if (scrollY > lastScrollY && scrollY > 100) {
    navbar?.classList.add('nav-hidden');
  } else {
    navbar?.classList.remove('nav-hidden');
  }
  lastScrollY = scrollY;

  // Active nav link
  updateActiveNavLink();

  // Back to top
  const btt = document.getElementById('back-to-top');
  btt?.classList.toggle('visible', scrollY > 400);
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) link.classList.add('active');
  });
}

// Extra navbar CSS for hide
const style = document.createElement('style');
style.textContent = `.nav-hidden { transform: translateY(-100%); }`;
document.head.appendChild(style);

/* ─────────────── MOBILE MENU ─────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu()  { mobileMenu?.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMenu() { mobileMenu?.classList.remove('open'); document.body.style.overflow = ''; }

hamburger?.addEventListener('click', openMenu);
mobileClose?.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', e => {
  if (mobileMenu?.classList.contains('open') && !mobileMenu.contains(e.target) && !hamburger?.contains(e.target)) {
    closeMenu();
  }
});

/* ─────────────── TYPEWRITER ─────────────── */
const phrases = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'Software Engineer',
  'React.js Developer',
  'Python Backend Dev',
  'API Developer',
  'UI/UX Enthusiast',
  'Problem Solver'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  if (!typeEl) return;
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = phrase.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeEl.textContent = phrase.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 1400);

/* ─────────────── PARTICLES ─────────────── */
function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  const count = window.innerWidth > 768 ? 50 : 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    const x    = Math.random() * 100;
    const dur  = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const drift = (Math.random() - 0.5) * 200;
    const colors = ['rgba(108,99,255,0.6)','rgba(0,212,255,0.5)','rgba(244,114,182,0.4)','rgba(74,222,128,0.4)'];
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${dur}s;
      animation-delay:-${delay}s;
      --drift:${drift}px;
      box-shadow: 0 0 ${size*3}px currentColor;
    `;
    container.appendChild(p);
  }
}
initParticles();

/* ─────────────── HERO COUNTER ANIMATION ─────────────── */
function animateCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

/* ─────────────── AOS (Animate on Scroll) ─────────────── */
function initAOS() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.getAttribute('data-aos-delay') || 0);
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

/* ─────────────── SKILL BARS ─────────────── */
function animateSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          setTimeout(() => bar.classList.add('animated'), 300);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-category').forEach(cat => observer.observe(cat));
}

/* ─────────────── PROJECT FILTER ─────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      const show = filter === 'all' || categories.includes(filter);
      card.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
      if (show) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1) translateY(0)';
        card.style.display = 'flex';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9) translateY(10px)';
        setTimeout(() => { if (!categories.includes(filter) && filter !== 'all') card.style.display = 'none'; }, 400);
      }
    });
  });
});

/* ─────────────── CONTACT FORM ─────────────── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');
  const form = document.getElementById('contact-form');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  }

  // Simulate form submission
  setTimeout(() => {
    if (btn)     { btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'; }
    if (success) { success.style.display = 'flex'; }
    setTimeout(() => {
      form?.reset();
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'; }
      if (success) { success.style.display = 'none'; }
    }, 4000);
  }, 1800);
}

/* ─────────────── BACK TO TOP ─────────────── */
document.getElementById('back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─────────────── SMOOTH SCROLL FOR ANCHORS ─────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─────────────── NAVBAR HOVER GLOW ─────────────── */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.textShadow = '0 0 20px rgba(108,99,255,0.5)';
  });
  link.addEventListener('mouseleave', () => {
    link.style.textShadow = '';
  });
});

/* ─────────────── CARD TILT EFFECT ─────────────── */
function addTilt(selector, intensity = 10) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateX(${-dy * intensity * 0.5}deg) rotateY(${dx * intensity * 0.5}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease';
    });
  });
}
addTilt('.service-card', 8);
addTilt('.cert-card', 6);
addTilt('.social-profile-card', 8);

/* ─────────────── TYPING GLOW on PROFILE PHOTO ─────────────── */
const profilePhoto = document.getElementById('profile-photo');
if (profilePhoto) {
  setInterval(() => {
    profilePhoto.style.boxShadow = '0 0 80px rgba(108,99,255,0.5), 0 0 140px rgba(0,212,255,0.2)';
    setTimeout(() => {
      profilePhoto.style.boxShadow = '0 0 60px rgba(108,99,255,0.3), 0 0 120px rgba(0,212,255,0.15)';
    }, 1000);
  }, 2000);
}

/* ─────────────── SCROLL PROGRESS BAR ─────────────── */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
Object.assign(progressBar.style, {
  position: 'fixed', top: '70px', left: '0',
  height: '3px', width: '0%',
  background: 'linear-gradient(90deg, #6c63ff, #00d4ff)',
  zIndex: '9999', transition: 'width 0.1s linear',
  borderRadius: '0 2px 2px 0'
});
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  const pct   = (window.scrollY / total) * 100;
  progressBar.style.width = pct + '%';
});

/* ─────────────── HERO SECTION PARALLAX ─────────────── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero-section');
  if (hero && scrollY < window.innerHeight) {
    const orbs = document.querySelectorAll('.hero-gradient-orb');
    orbs.forEach((orb, i) => {
      const speed = 0.1 + i * 0.05;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }
});

/* ─────────────── SECTION ENTRANCE ANIMATION ─────────────── */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'sectionFadeIn 0.6s ease forwards';
    }
  });
}, { threshold: 0.05 });

const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
  @keyframes sectionFadeIn {
    from { opacity: 0.85; }
    to   { opacity: 1; }
  }
`;
document.head.appendChild(sectionStyle);
document.querySelectorAll('section').forEach(sec => sectionObserver.observe(sec));

/* ─────────────── TECH BADGE HOVER SHUFFLE ─────────────── */
document.querySelectorAll('.tech-badge').forEach((badge, i) => {
  badge.style.animationDelay = `${i * 0.05}s`;
  badge.addEventListener('mouseenter', () => {
    badge.style.background = `rgba(108,99,255,0.15)`;
    badge.style.color       = `#8b83ff`;
    badge.style.borderColor = `rgba(108,99,255,0.5)`;
    badge.style.boxShadow   = `0 0 20px rgba(108,99,255,0.2)`;
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.background  = '';
    badge.style.color       = '';
    badge.style.borderColor = '';
    badge.style.boxShadow   = '';
  });
});

/* ─────────────── NUMBER COUNTER (Intersection) ─────────────── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const step = Math.ceil(target / 50);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 30);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => counterObserver.observe(el));

/* ─────────────── GLITCH EFFECT on LOGO ─────────────── */
const navLogo = document.getElementById('nav-logo-link');
if (navLogo) {
  navLogo.addEventListener('mouseenter', () => {
    navLogo.style.animation = 'glitch 0.4s linear';
    setTimeout(() => navLogo.style.animation = '', 400);
  });
}
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
  @keyframes glitch {
    0%   { transform: translate(0); }
    20%  { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
    40%  { transform: translate(2px, -1px); filter: hue-rotate(-90deg); }
    60%  { transform: translate(-1px, 1px); }
    80%  { transform: translate(1px, -2px); filter: hue-rotate(45deg); }
    100% { transform: translate(0); filter: none; }
  }
`;
document.head.appendChild(glitchStyle);

/* ─────────────── RIPPLE EFFECT on BUTTONS ─────────────── */
function addRipple(selector) {
  document.querySelectorAll(selector).forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY  - rect.top  - size/2}px;
        background:rgba(255,255,255,0.25);
        transform:scale(0); animation:rippleAnim 0.6s linear;
        pointer-events:none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleAnim { to { transform:scale(2.5); opacity:0; } }`;
document.head.appendChild(rippleStyle);
addRipple('.btn-primary, .btn-secondary, .nav-hire-btn, .form-submit-btn, .whatsapp-btn, .email-btn');

/* ─────────────── SCROLL REVEAL for ACHIEVEMENT CARDS ─────────────── */
const achieveObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0) scale(1)';
      achieveObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.achieve-card-custom').forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(40px) scale(0.95)';
  card.style.transition= `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
  achieveObserver.observe(card);
});

/* ─────────────── SCROLL REVEAL for TIMELINE ─────────────── */
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateX(0)';
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.opacity   = '0';
  item.style.transform = 'translateX(-30px)';
  item.style.transition= `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`;
  timelineObserver.observe(item);
});

/* ─────────────── EDU CARD ANIMATION ─────────────── */
const eduObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      eduObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.edu-card').forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition= `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`;
  eduObserver.observe(card);
});

/* ─────────────── SOCIAL PROFILE CARDS HOVER COLOR ─────────────── */
const spHoverMap = {
  github:       ['#f0f6ff','#000'],
  linkedin:     ['rgba(0,119,181,0.08)','#0077b5'],
  freelancer:   ['rgba(41,178,254,0.08)','#29b2fe'],
  upwork:       ['rgba(111,218,68,0.08)','#6fda44'],
  fiverr:       ['rgba(29,191,115,0.08)','#1dbf73'],
  leetcode:     ['rgba(255,161,22,0.08)','#ffa116'],
  hackerrank:   ['rgba(0,234,100,0.08)','#00ea64'],
  codechef:     ['rgba(91,70,56,0.15)','#b0958a'],
  codeforces:   ['rgba(49,140,231,0.08)','#318ce7'],
  stackoverflow:['rgba(244,128,36,0.08)','#f48024'],
};
document.querySelectorAll('.social-profile-card').forEach(card => {
  const iconEl = card.querySelector('.sp-icon');
  if (!iconEl) return;
  const key = [...iconEl.classList].find(c => spHoverMap[c]);
  if (!key) return;
  card.addEventListener('mouseenter', () => {
    card.style.background   = spHoverMap[key][0];
    card.style.borderColor  = spHoverMap[key][1];
  });
  card.addEventListener('mouseleave', () => {
    card.style.background  = '';
    card.style.borderColor = '';
  });
});

/* ─────────────── SECTION LABEL TYPEWRITER ─────────────── */
const labelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el   = entry.target;
      const text = el.textContent;
      el.textContent = '';
      let i = 0;
      const t = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(t);
      }, 40);
      labelObserver.unobserve(el);
    }
  });
}, { threshold: 0.8 });

document.querySelectorAll('.section-label').forEach(el => labelObserver.observe(el));

/* ─────────────── FOOTER YEAR ─────────────── */
document.querySelectorAll('.footer-bottom p').forEach(p => {
  p.innerHTML = p.innerHTML.replace('2025', new Date().getFullYear());
});

/* ─────────────── KEYBOARD NAVIGATION ─────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) closeMenu();
});

/* ─────────────── PERFORMANCE: Lazy Load Images ─────────────── */
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

/* ─────────────── ANIMATE PROJECT CARDS on LOAD ─────────────── */
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
      }, i * 80);
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(40px) scale(0.97)';
  card.style.transition= 'opacity 0.6s ease, transform 0.6s ease';
  projectObserver.observe(card);
});

/* ─────────────── CERT CARD ANIMATION ─────────────── */
const certObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      certObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.cert-card').forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition= `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
  certObserver.observe(card);
});

/* ─────────────── SERVICE CARD STAGGER ─────────────── */
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(30px) scale(0.97)';
  card.style.transition= `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  serviceObserver.observe(card);
});

/* ─────────────── SOCIAL PROFILE STAGGER ─────────────── */
const spObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
      spObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.social-profile-card').forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(25px) scale(0.95)';
  card.style.transition= `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
  spObserver.observe(card);
});

/* ─────────────── CONTACT FORM VALIDATION FEEDBACK ─────────────── */
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
  field.addEventListener('blur', () => {
    if (field.required && !field.value.trim()) {
      field.style.borderColor = '#ff6b6b';
      field.style.boxShadow   = '0 0 0 3px rgba(255,107,107,0.15)';
    } else if (field.value.trim()) {
      field.style.borderColor = '#4ade80';
      field.style.boxShadow   = '0 0 0 3px rgba(74,222,128,0.15)';
    }
  });
  field.addEventListener('focus', () => {
    field.style.borderColor = '';
    field.style.boxShadow   = '';
  });
});

/* ─────────────── INIT: Run all on DOMContentLoaded ─────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Fix for skill fills that may animate before IntersectionObserver fires
  setTimeout(() => animateSkillBars(), 100);
  
  // Ensure profile image has fallback
  const pImg = document.querySelector('.profile-img, .about-img');
  if (pImg) {
    pImg.addEventListener('error', () => {
      pImg.style.background = 'linear-gradient(135deg, #6c63ff, #00d4ff)';
      pImg.style.objectFit  = 'contain';
    });
  }

  console.log('%c👋 Hi there! I\'m Rajnish Kumar — Full Stack Developer', 
    'font-size:16px; color:#6c63ff; font-weight:bold;');
  console.log('%c📧 rk2452003@gmail.com | 📱 +91 6206573293',
    'font-size:13px; color:#00d4ff;');
  console.log('%c🔗 github.com/Rajnish5821Kumar',
    'font-size:13px; color:#4ade80;');
});

/* ─────────────── RESIZE HANDLER ─────────────── */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-init particles on resize
    const container = document.getElementById('particles-container');
    if (container) {
      container.innerHTML = '';
      initParticles();
    }
  }, 300);
});

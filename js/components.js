// ================================
// NAV — ACTIVE LINK + HAMBURGER
// ================================
function initNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('nav-active');
    }
  });

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (!hamburger || !navLinks) {
    console.log('hamburger or navLinks not found');
    return;
  }

  console.log('initNav running, hamburger found');

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('hamburger clicked');
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// ================================
// DARK MODE
// ================================
function initDarkMode() {
  const btn = document.getElementById('dark-mode-btn');
  const html = document.documentElement;

  if (!btn) {
    console.log('dark mode btn not found');
    return;
  }

  console.log('initDarkMode running, btn found');

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    html.setAttribute('data-theme', 'dark');
    btn.textContent = '☀️';
  } else {
    html.removeAttribute('data-theme');
    btn.textContent = '🌙';
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('dark mode clicked');
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      btn.textContent = '🌙';
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      btn.textContent = '☀️';
    }
  });
}

// ================================
// START — try multiple methods
// ================================
function init() {
  console.log('init called, document.readyState:', document.readyState);
  initNav();
  initDarkMode();
}

// Try immediately first
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM already loaded, run immediately
  init();
}
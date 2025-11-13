// Main UI interactions: theme toggle, mobile menu/hamburger animation, slider, forms, toasts, filters
// + ADDED: auto-apply .btn classes, password strength meter, close-on-outside-click for mobile menu

document.addEventListener('DOMContentLoaded', function () {
  // ---------- LOADING OVERLAY ----------
  const loading = document.getElementById('loadingOverlay');
  setTimeout(() => {
    loading?.classList.add('hidden');
    setTimeout(() => loading?.remove(), 500);
  }, 500);

  // ---------- YEAR ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- THEME TOGGLE ----------
  const themeBtn = document.getElementById('themeToggle');
  themeBtn?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    themeBtn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    showToast('Theme changed', 'info');
  });

  // ---------- HAMBURGER / MOBILE MENU ----------
  const mobileBtns = document.querySelectorAll('#mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgers = document.querySelectorAll('.hamburger');

  function toggleMobileMenu() {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.classList.toggle('open');
    hamburgers.forEach(h => h.classList.toggle('open', isOpen));
    if (isOpen) {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 40 + 'px';
    } else {
      mobileMenu.style.maxHeight = '0px';
    }
  }

  mobileBtns.forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); toggleMobileMenu(); }));

  // Close mobile menu when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu) {
      mobileMenu.classList.remove('open');
      mobileMenu.style.maxHeight = null;
      hamburgers.forEach(h => h.classList.remove('open'));
    }
  });

  // ---------- CLOSE ON OUTSIDE CLICK for mobile menu ----------
  document.addEventListener('click', (e) => {
    if (!mobileMenu) return;
    const path = e.composedPath ? e.composedPath() : (e.path || []);
    // if menu is open and click is outside mobileMenu and not on a mobileMenuBtn
    const clickedInsideMenu = path.includes(mobileMenu);
    const clickedHamburger = path.some(el => el && el.id === 'mobileMenuBtn');
    if (mobileMenu.classList.contains('open') && !clickedInsideMenu && !clickedHamburger) {
      mobileMenu.classList.remove('open');
      mobileMenu.style.maxHeight = '0px';
      hamburgers.forEach(h => h.classList.remove('open'));
    }
  });

  // ---------- TOASTS ----------
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message = '', type = 'info', duration = 3500) {
    if (!toastContainer) return;
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<div class="flex items-start gap-3"><div class="flex-1">${message}</div><button class="closeBtn" aria-label="close">&times;</button></div>`;
    toastContainer.appendChild(t);
    t.querySelector('.closeBtn')?.addEventListener('click', () => t.remove());
    setTimeout(() => t.remove(), duration);
  }

  // ---------- AUTO-APPLY .btn CLASSES (best-effort) ----------
  (function applyBtnClasses() {
    // buttons & submit inputs -> primary by default
    const buttons = Array.from(document.querySelectorAll('button, input[type="submit"], input[type="button"]'));
    buttons.forEach(b => {
      if (!b.classList.contains('btn') && !b.hasAttribute('data-no-btn')) {
        b.classList.add('btn');
        // give primary for most buttons unless explicit class/utility present
        if (!b.classList.contains('btn-ghost') && !b.classList.contains('btn-outline')) {
          b.classList.add('btn-primary');
        }
      }
    });

    // anchors that appear to be CTAs (heuristic): contains Tailwind utilities indicating button-like styling
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    anchors.forEach(a => {
      // skip nav links inside nav bars (they often have no padding utilities) — but still a heuristic
      const classes = Array.from(a.classList);
      const hasPrimaryBg = classes.some(c => c.includes('bg-primary') || c.includes('bg-'));
      const hasPadding = classes.some(c => c.startsWith('px-') || c.startsWith('p-') || c.startsWith('py-'));
      const hasTextWhite = classes.some(c => c.includes('text-white'));
      const isBtnLike = hasPrimaryBg || hasPadding || hasTextWhite || a.getAttribute('role') === 'button' || a.classList.contains('cta');

      if (isBtnLike && !a.classList.contains('btn') && !a.hasAttribute('data-no-btn')) {
        a.classList.add('btn');
        // choose style: if text-white or primary background => primary, otherwise ghost
        if (hasPrimaryBg || hasTextWhite) a.classList.add('btn-primary');
        else a.classList.add('btn-ghost');
      }
    });
  })();

  // ---------- SLIDER ----------
  const slides = Array.from(document.querySelectorAll('#slider img'));
  const indicators = document.getElementById('indicators');
  let current = 0;
  let timer;
  function renderIndicators() {
    if (!indicators) return;
    indicators.innerHTML = '';
    slides.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'w-3 h-3 rounded-full bg-white/80 dark:bg-gray-300/80';
      btn.style.opacity = i === current ? '1' : '0.5';
      btn.addEventListener('click', () => goTo(i));
      indicators.appendChild(btn);
    });
  }
  function show(index) {
    slides.forEach((s, i) => {
      s.style.opacity = i === index ? '1' : '0';
      s.style.zIndex = i === index ? 10 : 1;
    });
    const dots = indicators?.children || [];
    Array.from(dots).forEach((d, i) => d.style.opacity = i === index ? '1' : '0.5');
  }
  function goTo(i) { current = (i + slides.length) % slides.length; show(current); resetTimer(); }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function resetTimer() { clearInterval(timer); timer = setInterval(next, 5000); }
  if (slides.length) {
    renderIndicators();
    show(0);
    document.getElementById('nextBtn')?.addEventListener('click', next);
    document.getElementById('prevBtn')?.addEventListener('click', prev);
    resetTimer();
  }

  // ---------- BOOKING FORM FEEDBACK ----------
  const bookingForm = document.getElementById('bookingForm');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('bookingMsg');
    if (msg) {
      msg.textContent = 'Thanks — your booking request has been received. (Demo)';
      msg.className = 'text-green-600 dark:text-green-400';
    }
    showToast('Booking submitted (demo).', 'success');
    bookingForm.reset();
  });

  // ---------- CONTACT FORM FEEDBACK ----------
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Message sent. We will reply soon (demo).', 'success');
    contactForm.reset();
  });

  // ---------- ROOMS FILTERS ----------
  const typeFilter = document.getElementById('typeFilter');
  const priceFilter = document.getElementById('priceFilter');
  const priceLabel = document.getElementById('priceLabel');
  const resetFilters = document.getElementById('resetFilters');
  const roomsGrid = document.getElementById('roomsGrid');
  function applyFilters() {
    const type = typeFilter?.value || 'all';
    const maxPrice = priceFilter ? Number(priceFilter.value) : Infinity;
    if (priceLabel) priceLabel.textContent = `₹${Number(maxPrice).toLocaleString()}`;
    if (!roomsGrid) return;
    const cards = Array.from(roomsGrid.querySelectorAll('article'));
    cards.forEach(card => {
      const price = Number(card.getAttribute('data-price') || 0);
      const cardType = card.getAttribute('data-type') || '';
      const matchesType = (type === 'all') || (cardType === type);
      const matchesPrice = price <= maxPrice;
      if (matchesType && matchesPrice) {
        card.style.display = '';
        card.classList.remove('opacity-0', 'scale-95');
      } else {
        card.style.display = 'none';
      }
    });
  }
  typeFilter?.addEventListener('change', applyFilters);
  priceFilter?.addEventListener('input', applyFilters);
  resetFilters?.addEventListener('click', () => {
    if (typeFilter) typeFilter.value = 'all';
    if (priceFilter) { priceFilter.value = priceFilter.max; }
    applyFilters();
  });
  if (typeFilter || priceFilter) {
    if (priceLabel && priceFilter) priceLabel.textContent = `₹${Number(priceFilter.value).toLocaleString()}`;
    applyFilters();
  }

  // ---------- PASSWORD STRENGTH METER (signup page) ----------
  const signupForm = document.getElementById('signupForm');
  const pwdInput = signupForm?.querySelector('input[name="password"]');
  const pwdConfirm = signupForm?.querySelector('input[name="confirmPassword"]');
  const pwdMsg = document.getElementById('signupMsg');

  function scorePassword(pw) {
    let score = 0;
    if (!pw) return 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[a-z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score; // 0..5
  }

  function updatePwdMeter() {
    const meter = document.querySelector('.pwd-bar > i');
    const text = document.querySelector('.pwd-text');
    if (!pwdInput || !meter || !text) return;
    const val = pwdInput.value || '';
    const score = scorePassword(val);
    const percent = Math.min(100, Math.round((score / 5) * 100));
    meter.style.width = percent + '%';

    // color & text
    if (score <= 2) {
      meter.style.background = 'linear-gradient(90deg,#ef4444,#f97316)';
      text.textContent = 'Weak password';
      text.className = 'pwd-text weak';
    } else if (score === 3 || score === 4) {
      meter.style.background = 'linear-gradient(90deg,#f59e0b,#f97316)';
      text.textContent = 'Medium strength';
      text.className = 'pwd-text medium';
    } else {
      meter.style.background = 'linear-gradient(90deg,#10b981,#06b6d4)';
      text.textContent = 'Strong password';
      text.className = 'pwd-text strong';
    }
  }

  if (pwdInput) {
    // ensure meter exists (if markup was added)
    pwdInput.addEventListener('input', updatePwdMeter);
  }

  // if signup form present, hook submit to validate password strength & match
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pw = pwdInput?.value || '';
      const conf = pwdConfirm?.value || '';
      const score = scorePassword(pw);
      if (score < 3) {
        showToast('Please use a stronger password (min: 8 chars + mixture of letters / numbers).', 'error');
        return;
      }
      if (pw !== conf) {
        showToast('Passwords do not match.', 'error');
        return;
      }
      // demo success
      showToast('Account created (demo). Welcome!', 'success');
      signupForm.reset();
      // reset meter visually
      updatePwdMeter();
    });
  }

  // optional: keyboard accessibility: close mobile on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileMenu.style.maxHeight = '0px';
        hamburgers.forEach(h => h.classList.remove('open'));
      }
    }
  });

});

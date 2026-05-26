/* ==========================================================================
   AstraNova Space Administration — Main JavaScript
   ========================================================================== */
(function () {
  'use strict';

  /* --- Utility Date --- */
  const utilityDate = document.getElementById('utilityDate');
  if (utilityDate) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    utilityDate.textContent = now.toLocaleDateString('en-US', options);
  }

  /* --- Multi-Page Router --- */
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('[data-page]');

  function navigateTo(hash) {
    const pageId = hash ? hash.replace('#', '') : 'home';
    const target = document.getElementById('page-' + pageId);
    if (!target) return;

    pages.forEach(function (page) {
      page.style.display = 'none';
    });
    target.style.display = 'block';

    /* Update active nav link */
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      }
    });

    /* Scroll to top */
    window.scrollTo(0, 0);
  }

  /* Click handlers for page navigation */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var pageId = this.getAttribute('data-page');
      window.location.hash = pageId;
    });
  });

  /* Handle browser back/forward */
  window.addEventListener('hashchange', function () {
    navigateTo(window.location.hash);
  });

  /* Initial page load */
  navigateTo(window.location.hash);

  /* --- Header Scroll Effect --- */
  var header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* --- Mobile Nav Toggle --- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  var navList = mainNav ? mainNav.querySelector('.nav-list') : null;

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('mobile-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* --- Search Overlay --- */
  var searchToggle = document.getElementById('searchToggle');
  var searchOverlay = document.getElementById('searchOverlay');
  var searchClose = document.getElementById('searchClose');

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', function () {
      searchOverlay.classList.add('active');
      var input = searchOverlay.querySelector('input');
      if (input) input.focus();
    });

    searchClose.addEventListener('click', function () {
      searchOverlay.classList.remove('active');
    });

    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
      }
    });
  }

  /* --- Countdown Timer --- */
  var launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 42);
  launchDate.setHours(14, 0, 0, 0);

  function updateCountdown() {
    var now = new Date();
    var diff = launchDate - now;

    if (diff <= 0) {
      var ids = ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'];
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    var daysEl = document.getElementById('cd-days');
    var hoursEl = document.getElementById('cd-hours');
    var minsEl = document.getElementById('cd-mins');
    var secsEl = document.getElementById('cd-secs');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* --- Mission Filters --- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var tableRows = document.querySelectorAll('.missions-table-row');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      /* Update active button */
      filterBtns.forEach(function (b) {
        b.classList.remove('filter-btn--active');
        b.classList.remove('active');
      });
      btn.classList.add('filter-btn--active');
      btn.classList.add('active');

      var filter = this.getAttribute('data-filter');

      tableRows.forEach(function (row) {
        var status = row.getAttribute('data-status');
        var crewed = row.getAttribute('data-crewed');
        var show = false;

        if (filter === 'all') {
          show = true;
        } else if (filter === 'active' || filter === 'upcoming' || filter === 'completed') {
          show = status === filter;
        } else if (filter === 'crewed') {
          show = crewed === 'true';
        }

        row.style.display = show ? '' : 'none';
      });
    });
  });

  /* --- Contact Form --- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = this.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = 'Message Sent';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';

        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
          contactForm.reset();
        }, 2500);
      }, 1200);
    });
  }

 })();

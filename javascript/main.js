// Mobile nav toggle
var navToggle = document.getElementById('navToggle');
var mainNav = document.getElementById('mainNav');
if (navToggle) {
  navToggle.addEventListener('click', function() {
    mainNav.querySelector('.nav-list').classList.toggle('open');
  });
  mainNav.querySelectorAll('.nav-list a').forEach(function(l) {
    l.addEventListener('click', function() {
      mainNav.querySelector('.nav-list').classList.remove('open');
    });
  });
}

// Header shadow on scroll
var header = document.querySelector('.header');
var ticking = false;
window.addEventListener('scroll', function() {
  if (!ticking) {
    requestAnimationFrame(function() {
      header.classList.toggle('scrolled', window.scrollY > 8);
      ticking = false;
    });
    ticking = true;
  }
});

// Scroll reveal
var reveals = document.querySelectorAll('.card, .number-card, .pillar');
if (reveals.length && 'IntersectionObserver' in window) {
  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          observer.unobserve(en.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach(function(el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Isa iframe — dynamic shrink on scroll up
(function() {
  var wrapper = document.querySelector('.cta-wrapper');
  var iframe = document.querySelector('.isa-iframe');
  var fallback = document.querySelector('.isa-fallback');
  var loading = document.querySelector('.isa-loading');
  if (!wrapper || !iframe) return;

  var minH = 300;      // minimum height when fully scrolled up
  var maxH = Math.max(700, window.innerHeight * 0.75); // start tall (~55-60vh)
  var loaded = false;
  var scrollHandled = false;
  var lastH = -1;      // histerese anti-loop (tremor do iframe)

  iframe.addEventListener('load', function() {
    loaded = true;
    if (loading) loading.style.display = 'none';
  });

  function applyHeight(h) {
    var newH = Math.round(h);
    if (Math.abs(newH - lastH) < 4) return; // histerese: ignora variações sub-pixel
    lastH = newH;
    wrapper.style.height = newH + 'px';
  }

  function updateHeight() {
    var section = wrapper.closest('.cta');
    if (!section) return;

    var rect = section.getBoundingClientRect();
    var viewportH = window.innerHeight;

    // Check if section is visible in viewport
    var sectionVisible = rect.bottom > -100 && rect.top < viewportH + 200;

    if (!sectionVisible) {
      applyHeight(maxH);
      return;
    }

    // Calculate scroll progress through the section
    // When top of section is at viewport bottom: full height
    // When top of section scrolls up past viewport: min height
    var scrollTopIntoSection = Math.max(0, -rect.top);
    var sectionH = rect.height;
    var availableGrow = maxH - minH;
    var progress = Math.min(scrollTopIntoSection / Math.max(1, sectionH), 1);
    var currentH = maxH - (progress * availableGrow);

    applyHeight(Math.max(minH, Math.min(maxH, currentH)));
  }

  // Always set initial full height immediately
  function initHeight() {
    lastH = -1;
    applyHeight(maxH);
  }

  window.addEventListener('scroll', updateHeight, { passive: true });
  window.addEventListener('resize', function() {
    maxH = Math.max(700, window.innerHeight * 0.75); // unificado com o init
    initHeight(); // reseta lastH internamente
  });

  // Initial setup
  requestAnimationFrame(function() {
    initHeight();
    setTimeout(updateHeight, 200);
  });

  // Timeout fallback
  setTimeout(function() {
    if (!loaded) {
      iframe.style.display = 'none';
      if (loading) loading.style.display = 'none';
      fallback.style.display = 'block';
    }
  }, 8000);
})();

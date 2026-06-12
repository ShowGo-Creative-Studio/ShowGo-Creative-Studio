// Language system
var currentLang = localStorage.getItem('lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyLang();
}

function applyLang() {
  var isJP = currentLang === 'jp';

  // Update html lang
  document.documentElement.lang = isJP ? 'ja' : 'en';

  // Update all data-en/data-jp elements
  document.querySelectorAll('[data-en]').forEach(function(el) {
    var text = isJP ? el.getAttribute('data-jp') : el.getAttribute('data-en');
    if (!text) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      // don't touch inputs
    } else if (el.children.length === 0 || el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'LABEL') {
      el.innerHTML = text;
    }
  });

  // Update select options
  document.querySelectorAll('select option[data-en]').forEach(function(opt) {
    opt.text = isJP ? opt.getAttribute('data-jp') : opt.getAttribute('data-en');
  });

  // Update service list if present
  if (typeof listEn !== 'undefined' && typeof listJp !== 'undefined') {
    var ul = document.getElementById('service-list');
    if (ul) {
      var items = isJP ? listJp : listEn;
      ul.innerHTML = items.map(function(item) {
        return '<li>' + item + '</li>';
      }).join('');
    }
  }

  // Toggle lang buttons
  document.querySelectorAll('.lang-toggle a').forEach(function(a) {
    var aLang = a.getAttribute('onclick') && a.getAttribute('onclick').indexOf("'en'") > -1 ? 'en' : 'jp';
    a.classList.toggle('active-lang', aLang === currentLang);
  });
  document.querySelectorAll('#mob-en, #mob-jp').forEach(function(a) {
    var aLang = a.id === 'mob-en' ? 'en' : 'jp';
    a.classList.toggle('active-lang', aLang === currentLang);
  });

  // Japanese font hint
  if (isJP) {
    document.body.style.fontFamily = "'Inter', 'Hiragino Sans', 'Noto Sans JP', sans-serif";
  } else {
    document.body.style.fontFamily = "";
  }
}

// Mobile menu toggle
function toggleMenu() {
  var menu = document.getElementById('mobile-menu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Mark active nav link
(function() {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav .nav-links a:not(.nav-contact-btn):not(.lang-toggle a)').forEach(function(a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
})();

// Apply on load
document.addEventListener('DOMContentLoaded', function() {
  applyLang();
});

(function () {
  var container = document.getElementById('tab-container');
  if (!container) return;

  var tabs = container.querySelectorAll('.etabs .tab a');
  var panels = ['about', 'resume', 'portfolio', 'contact']
    .map(function (id) { return document.getElementById(id); });
  var logo = document.getElementById('logo');

  function animateMeters() {
    document.querySelectorAll('#resume .meter > span').forEach(function (s) {
      var target = s.dataset.width || s.style.width;
      s.dataset.width = target;
      s.style.transition = 'none';
      s.style.width = '0';
      requestAnimationFrame(function () {
        s.style.transition = 'width 1.2s ease-out';
        s.style.width = target;
      });
    });
  }

  function activate(hash) {
    var id = (hash || '').replace('#', '');
    if (!panels.some(function (p) { return p && p.id === id; })) id = 'about';
    panels.forEach(function (p) { if (p) p.hidden = (p.id !== id); });
    tabs.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', on);
      a.parentNode.classList.toggle('active', on);
    });
    if (logo) logo.hidden = (id === 'about');
    if (id === 'resume') animateMeters();
  }

  tabs.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var hash = a.getAttribute('href');
      if (location.hash !== hash) history.pushState(null, '', hash);
      activate(hash);
    });
  });
  window.addEventListener('hashchange', function () { activate(location.hash); });
  activate(location.hash);
})();

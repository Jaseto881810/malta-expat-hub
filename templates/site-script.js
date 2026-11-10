// Malta Expat Guide — small helpers for every page.
// The header, menu, footer and guide links are already in the page HTML
// (made by build.py from the content/ folder). This script only makes the menu open and close.

(function () {
  const start = () => {
    const menu = document.getElementById('site-menu');
    if (!menu) return;
    let opener = null;
    const setOpen = (open) => {
      menu.dataset.open = open;
      document.body.classList.toggle('menu-open', open);
      if (open) menu.querySelector('[data-menu-close]').focus();
      else if (opener) opener.focus();
    };
    document.querySelectorAll('[data-menu-open]').forEach((b) => b.addEventListener('click', () => { opener = b; setOpen(true); }));
    menu.querySelector('[data-menu-close]').addEventListener('click', () => setOpen(false));
    menu.addEventListener('click', (e) => { if (e.target === menu) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.dataset.open === 'true') setOpen(false); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

// Card and tile photos load only when they come near the screen (saves data on long pages).
(function () {
  const show = (el) => { el.style.setProperty('--img', `url("${el.dataset.img}")`); el.removeAttribute('data-img'); };
  const start = () => {
    const els = document.querySelectorAll('[data-img]');
    if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { io.unobserve(e.target); show(e.target); }
    }), { rootMargin: '400px 0px' });
    els.forEach((el) => (el.dataset.img ? io.observe(el) : el.removeAttribute('data-img')));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

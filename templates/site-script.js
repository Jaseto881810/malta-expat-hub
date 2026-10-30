// Malta Expat Guide — shared header, menu, footer and guide navigation.
// The menu is built from the content/ folder (edit it in the admin panel at /admin).

// SECTIONS and TOP_NAV are added above this line by build.py,
// using the sections and guides in the content/ folder.

(function () {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // GitHub Pages serves both /x/index.html and /x/, and /page.html and /page.
  const norm = (p) => p.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  const here = norm(location.pathname);
  const isHere = (href) => norm(href) === here;
  const current = SECTIONS.find((s) => s.id === document.body.dataset.section);

  function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;
    const links = TOP_NAV.map((id) => SECTIONS.find((s) => s.id === id)).map((s) => {
      const cur = current && current.id === s.id ? ' aria-current="page"' : '';
      return `<a class="nav-link" href="${s.href}"${cur}>${esc(s.name.replace(' in Malta', ''))}</a>`;
    }).join('');

    const menuSecs = SECTIONS.map((s) => {
      const guides = (s.guides || []).map((g) =>
        `<li><a href="${g.href}"${isHere(g.href) ? ' aria-current="page"' : ''}>${esc(g.name)}</a></li>`).join('');
      return `<div class="menu-sec" style="--tint:${s.tint}">
          <a class="menu-sec-title" href="${s.href}"><b>${s.n}</b>${esc(s.name)}</a>
          ${guides ? `<ul>${guides}</ul>` : ''}
        </div>`;
    }).join('');

    el.innerHTML = `
      <div class="nav">
        <a class="nav-brand" href="/index.html"><span>Malta</span> Expat Guide</a>
        <nav class="nav-links" aria-label="Main">${links}</nav>
        <button class="btn btn-secondary menu-all" type="button" data-menu-open aria-haspopup="dialog">All sections</button>
        <button class="btn btn-icon btn-secondary menu-icon" type="button" data-menu-open aria-haspopup="dialog" aria-label="Open menu">≡</button>
      </div>
      <div class="menu" id="site-menu" role="dialog" aria-modal="true" aria-label="All sections">
        <div class="menu-panel">
          <div class="menu-head">
            <a class="nav-brand" href="/index.html"><span>Malta</span> Expat Guide</a>
            <button class="btn btn-icon btn-secondary" type="button" data-menu-close aria-label="Close menu">✕</button>
          </div>
          <div class="menu-grid">${menuSecs}</div>
        </div>
      </div>`;

    const menu = el.querySelector('#site-menu');
    let opener = null;
    const setOpen = (open) => {
      menu.dataset.open = open;
      document.body.classList.toggle('menu-open', open);
      if (open) menu.querySelector('[data-menu-close]').focus();
      else if (opener) opener.focus();
    };
    el.querySelectorAll('[data-menu-open]').forEach((b) => b.addEventListener('click', () => { opener = b; setOpen(true); }));
    el.querySelector('[data-menu-close]').addEventListener('click', () => setOpen(false));
    menu.addEventListener('click', (e) => { if (e.target === menu) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.dataset.open === 'true') setOpen(false); });
  }

  function renderFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    const cta = current && current.id === 'getting-started'
      ? { title: 'Ready for the details?', label: 'Browse all sections →', href: '/index.html#explore' }
      : { title: 'Not sure where to begin?', label: 'Read Getting Started →', href: '/getting-started.html' };
    const links = SECTIONS.map((s) => `<a href="${s.href}">${esc(s.name)}</a>`).join('');
    el.innerHTML = `
      <div class="footer-cta">
        <h2>${cta.title}</h2>
        <a class="btn btn-light" href="${cta.href}">${cta.label}</a>
      </div>
      <div class="footer-meta">
        <span>© ${new Date().getFullYear()} Malta Expat Guide</span>
        <nav aria-label="Sections">${links}</nav>
      </div>`;
  }

  // Guide pages: "In this section" list and previous / next links.
  function renderGuideNav() {
    const aside = document.getElementById('guide-aside');
    const pager = document.getElementById('guide-pager');
    if (!current || (!aside && !pager)) return;

    const guides = current.guides || [];
    const i = guides.findIndex((g) => isHere(g.href));
    const secIdx = SECTIONS.indexOf(current);
    const nextSec = SECTIONS[secIdx + 1];
    const prevSec = SECTIONS[secIdx - 1];

    if (aside) {
      const list = guides.length
        ? { title: `<a href="${current.href}">${current.n} · ${esc(current.name)}</a>`, items: guides }
        : { title: 'All sections', items: SECTIONS };
      aside.innerHTML = `<div class="g-aside-card" style="--tint:${current.tint}">
          <h6>${list.title}</h6>
          <ul>${list.items.map((g) =>
            `<li><a href="${g.href}"${isHere(g.href) ? ' aria-current="page"' : ''}>${esc(g.name)}</a></li>`).join('')}</ul>
        </div>`;
    }

    if (pager) {
      let prev, next;
      if (guides.length && i >= 0) {
        prev = i > 0 ? { label: 'Previous guide', ...guides[i - 1] } : { label: 'Section overview', name: current.name, href: current.href };
        next = guides[i + 1] ? { label: 'Next guide', ...guides[i + 1] } : nextSec && { label: `Next section · ${nextSec.n}`, ...nextSec };
      } else {
        prev = prevSec && { label: `Previous section · ${prevSec.n}`, ...prevSec };
        next = nextSec && { label: `Next section · ${nextSec.n}`, ...nextSec };
      }
      const link = (l, cls, arrowL, arrowR) => l
        ? `<a class="${cls}" href="${l.href}"><h6>${esc(l.label)}</h6><b>${arrowL}${esc(l.name)}${arrowR}</b></a>` : '';
      pager.innerHTML = link(prev, 'prev', '← ', '') + link(next, 'next', '', ' →');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    renderGuideNav();
  });
})();

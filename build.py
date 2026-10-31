"""Builds the Malta Expat Guide website.

Reads the pages in content/ (edited in the admin panel at /admin),
puts them into the layouts in templates/, and writes the finished
website to _site/. GitHub runs this automatically on every change.

Run it yourself with:  python3 build.py
"""
import datetime
import json
import os
import shutil
import urllib.parse

import yaml
from jinja2 import Environment, FileSystemLoader, ChainableUndefined
from markdown_it import MarkdownIt

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, '_site')
SITE_URL = 'https://maltaexpatguide.com'
DEFAULT_SHARE_IMAGE = 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2000'

# Markdown: allow HTML inside text, and treat a single line break as a line break.
md = MarkdownIt('commonmark', {'html': True, 'breaks': True}).enable('table').enable('strikethrough')

env = Environment(loader=FileSystemLoader(os.path.join(ROOT, 'templates')),
                  autoescape=True, undefined=ChainableUndefined,
                  trim_blocks=False, lstrip_blocks=False)
env.filters['markdown'] = lambda text: md.render(text or '')


def read(path):
    """Read a content file: the part between the --- lines is the page data."""
    text = open(path, encoding='utf-8').read()
    if not text.startswith('---\n') or '\n---' not in text[3:]:
        raise SystemExit(f'{path}: file must start and end its data with a --- line')
    front, _, body = text[4:].partition('\n---')
    body = body.split('\n', 1)[1] if '\n' in body else ''
    data = yaml.safe_load(front) or {}
    data['slug'] = os.path.splitext(os.path.basename(path))[0]
    if body.strip():
        data.setdefault('blocks', []).append({'text': body.strip()})
    return data


def load_folder(folder):
    path = os.path.join(ROOT, 'content', folder)
    return [read(os.path.join(path, f)) for f in sorted(os.listdir(path)) if f.endswith('.md')]


def write(url, html):
    path = urllib.parse.unquote(url)
    if path.endswith('/'):
        path += 'index.html'
    dest = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    open(dest, 'w', encoding='utf-8').write(html)


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)

    # ---- content ----
    sections = sorted(load_folder('sections'), key=lambda s: (s.get('order', 99), s['name']))
    guides = [g for g in load_folder('guides') if not g.get('draft')]
    by_id = {s['slug']: s for s in sections}

    for s in sections:
        s['href'] = f"/{s['slug']}.html" if s.get('singlePage') else f"/{s['slug']}/index.html"
        s['guides'] = []
    for g in guides:
        sec = by_id.get(g.get('section'))
        if not sec:
            raise SystemExit(f"Guide '{g['slug']}' has unknown section '{g.get('section')}'")
        g['url'] = f"/{sec['slug']}/{g['slug']}.html"
        g['menuName'] = g.get('menuName') or g['title']
        sec['guides'].append(g)
    for s in sections:
        s['guides'].sort(key=lambda g: (g.get('order', 99), g['menuName']))
        n = len(s['guides'])
        s['tag'] = s.get('homeTag') or (f"{n} guide{'' if n == 1 else 's'}" if not s.get('singlePage') else '1 guide')

    def common(title, description, url, body_section, share_image=None):
        return dict(page_title=f'Malta Expat Guide | {title}', description=description or '', url=url,
                    site_url=SITE_URL, body_section=body_section, share_image=share_image or DEFAULT_SHARE_IMAGE)

    pages = []  # (url, lastmod) for the sitemap

    # ---- guide pages and single-page sections ----
    guide_tpl = env.get_template('guide.html')
    for s in sections:
        if s.get('singlePage'):
            write(s['href'], guide_tpl.render(page=s, section=s, content_css=True,
                  **common(s.get('seoTitle') or s['name'], s.get('description'), s['href'], s['slug'], s.get('shareImage') or s.get('image'))))
            pages.append(s['href'])
    for g in guides:
        s = by_id[g['section']]
        write(g['url'], guide_tpl.render(page=g, section=s, content_css=True,
              **common(g.get('seoTitle') or g['menuName'], g.get('description'), g['url'], s['slug'], g.get('shareImage') or g.get('image'))))
        pages.append(g['url'])

    # ---- section overview pages ----
    sec_tpl = env.get_template('section.html')
    for s in sections:
        if s.get('singlePage'):
            continue
        url = f"/{s['slug']}/"
        write(url, sec_tpl.render(section=s, guides=s['guides'],
              **common(s.get('seoTitle') or s['name'], s.get('description'), url, s['slug'], s.get('shareImage'))))
        pages.append(url)

    # ---- home and 404 ----
    home = read(os.path.join(ROOT, 'content', 'home.md'))
    write('/', env.get_template('home.html').render(sections=sections, home=home,
          **common(home.get('seoTitle') or 'A Comprehensive Guide to Living in Malta',
                   home.get('description'), '/', 'home', home.get('shareImage'))))
    write('/404.html', env.get_template('404.html').render(noindex=True, page_title='Page not found | Malta Expat Guide', body_section='home'))

    # ---- menu script (header, menu, footer, sidebar, pager) ----
    nav = []
    for s in sections:
        item = {'id': s['slug'], 'n': s['number'], 'name': s['name'], 'tint': s['colour'], 'href': s['href']}
        if not s.get('singlePage'):
            item['guides'] = [{'name': g['menuName'], 'href': urllib.parse.unquote(g['url'])} for g in s['guides']]
        nav.append(item)
    top = [s['slug'] for s in sections if s.get('inTopMenu')]
    script = open(os.path.join(ROOT, 'templates', 'site-script.js'), encoding='utf-8').read()
    script = script.replace('(function () {',
                            f'const SECTIONS = {json.dumps(nav, ensure_ascii=False)};\nconst TOP_NAV = {json.dumps(top)};\n\n(function () {{', 1)
    write('/assets/site.js', script)

    # ---- sitemap ----
    today = datetime.date.today().isoformat()
    urls = ['/'] + pages
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sitemap += ''.join(f'  <url><loc>{SITE_URL}{urllib.parse.unquote(u)}</loc><lastmod>{today}</lastmod></url>\n' for u in urls)
    sitemap += '</urlset>\n'
    write('/sitemap.xml', sitemap)

    # ---- files copied as they are ----
    shutil.copytree(os.path.join(ROOT, 'assets'), os.path.join(OUT, 'assets'), dirs_exist_ok=True,
                    ignore=shutil.ignore_patterns('content.src.css'))
    shutil.copytree(os.path.join(ROOT, 'admin'), os.path.join(OUT, 'admin'))
    for f in ('CNAME', 'robots.txt'):
        shutil.copy(os.path.join(ROOT, f), OUT)
    open(os.path.join(OUT, '.nojekyll'), 'w').close()

    print(f'Built {len(pages) + 2} pages into _site/')


if __name__ == '__main__':
    main()

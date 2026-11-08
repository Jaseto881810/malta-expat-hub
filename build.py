"""Builds the Malta Expat Guide website.

Reads the pages in content/ (edited in the admin panel at /admin),
puts them into the layouts in templates/, and writes the finished
website to _site/. GitHub runs this automatically on every change.

Run it yourself with:  python3 build.py
"""
import datetime
import html
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
# Google AdSense publisher ID (also in ads.txt).
ADSENSE_CLIENT = 'ca-pub-4354867620938723'
DEFAULT_SHARE_IMAGE = 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2000'

# Markdown: allow HTML inside text, and treat a single line break as a line break.
md = MarkdownIt('commonmark', {'html': True, 'breaks': True}).enable('table').enable('strikethrough')

env = Environment(loader=FileSystemLoader(os.path.join(ROOT, 'templates')),
                  autoescape=True, undefined=ChainableUndefined,
                  trim_blocks=False, lstrip_blocks=False)
def render_markdown(text):
    # Wide tables scroll sideways on phones instead of stretching the page.
    html = md.render(text or '')
    return html.replace('<table>', '<div class="table-wrap"><table>').replace('</table>', '</table></div>')


env.filters['markdown'] = render_markdown


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


# Map categories: id, name, colour, short intro. Places are in content/map/.
MAP_CATEGORIES = [
    {'id': 'things-to-do', 'name': 'Things to do', 'colour': '#cf142b',
     'intro': 'Sights, museums and day-out ideas across Malta and Gozo.',
     'types': ['History & culture', 'Viewpoints', 'Nature & gardens', 'Food, markets & shopping', 'Nightlife', 'Family & activities']},
    {'id': 'hiking', 'name': 'Hiking trails', 'colour': '#2e7d32',
     'intro': 'Start points of popular walks. Best from October to May; carry water, as there is little shade.',
     'types': ['Malta', 'Gozo', 'Comino']},
    {'id': 'diving', 'name': 'Diving', 'colour': '#1565c0',
     'intro': 'Popular dive sites with depth and level. Always dive with a local dive centre or a buddy.',
     'types': ['Wrecks', 'Reefs & caves']},
    {'id': 'beaches', 'name': 'Beaches', 'colour': '#d99a00',
     'intro': 'Sandy bays and rocky swimming spots. Check the beach flag before you swim.',
     'types': ['Sandy', 'Rocky']},
    {'id': 'neighbourhoods', 'name': 'Neighbourhoods', 'colour': '#7b1fa2',
     'intro': 'Popular areas to live. Rent level: € lower, €€ medium, €€€ higher.',
     'types': ['Central coast', 'Harbour', 'Central', 'West', 'North', 'South', 'Gozo']},
    {'id': 'expat-services', 'name': 'Expat services', 'colour': '#00796b',
     'intro': 'Hospitals, health centres, transport, offices, coworking and gyms.',
     'types': ['Hospitals & clinics', 'Public health centres', 'Transport', 'Government & official', 'Coworking', 'Gyms']},
    {'id': 'english-schools', 'name': 'English schools', 'colour': '#e65100',
     'intro': 'Language schools by town. Pins show the area; check each school for its exact address.',
     'types': ['Malta', 'Gozo']},
]

MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October', 'November', 'December']


def load_posts():
    """Blog posts, newest first. Drafts and posts dated in the future are left out."""
    today = datetime.date.today()
    posts = []
    for post in load_folder('blog'):
        raw = post.get('date')
        d = raw.date() if isinstance(raw, datetime.datetime) else raw if isinstance(raw, datetime.date) \
            else datetime.date.fromisoformat(str(raw)[:10]) if raw else today
        if post.get('draft') or d > today:
            continue
        words = sum(len(str(b.get('text') or '').split()) for b in post.get('blocks', []))
        post['date_obj'] = d
        post['url'] = f"/blog/{post['slug']}.html"
        post['dateLabel'] = f"{d.day} {MONTHS[d.month - 1]} {d.year}"
        post['readTime'] = max(1, round(words / 200))
        post['heroText'] = post.get('excerpt')
        posts.append(post)
    return sorted(posts, key=lambda p: p['date_obj'], reverse=True)


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
    pages_extra = [pg for pg in load_folder('pages') if not pg.get('draft')]
    posts = load_posts()
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
                    site_url=SITE_URL, adsense_client=ADSENSE_CLIENT, body_section=body_section, share_image=share_image or DEFAULT_SHARE_IMAGE)

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

    # ---- standalone pages (About, Contact, Privacy Policy, ...) ----
    plain = {'colour': '#ffd60a', 'singlePage': True}
    for pg in pages_extra:
        pg['url'] = f"/{pg['slug']}.html"
        pg['menuName'] = pg.get('menuName') or pg['title']
        write(pg['url'], guide_tpl.render(page=pg, section=plain, standalone=True, content_css=True,
              **{**common(pg.get('seoTitle') or pg['menuName'], pg.get('description'), pg['url'], 'page', pg.get('shareImage') or pg.get('image')),
                 'noindex': bool(pg.get('hideFromSearch'))}))
        if not pg.get('hideFromSearch'):
            pages.append(pg['url'])

    # ---- section overview pages ----
    sec_tpl = env.get_template('section.html')
    for s in sections:
        if s.get('singlePage'):
            continue
        url = f"/{s['slug']}/"
        write(url, sec_tpl.render(section=s, guides=s['guides'],
              **common(s.get('seoTitle') or s['name'], s.get('description'), url, s['slug'], s.get('shareImage'))))
        pages.append(url)

    # ---- blog: one page per post, plus the overview at /blog/ ----
    blog = {'name': 'Blog', 'href': '/blog/', 'colour': '#ff8fb3'}
    for post in posts:
        write(post['url'], guide_tpl.render(page=post, section=blog, standalone=True, content_css=True,
              **common(post.get('seoTitle') or post['title'], post.get('description') or post.get('excerpt'),
                       post['url'], 'blog', post.get('shareImage') or post.get('image'))))
        pages.append(post['url'])
    write('/blog/', env.get_template('blog.html').render(posts=posts, section=blog,
          **common('Blog', 'News, tips and personal stories about moving to and living in Malta.', '/blog/', 'blog')))
    pages.append('/blog/')

    # ---- interactive map ----
    cat_ids = {c['id'] for c in MAP_CATEGORIES}
    places = []
    for p in load_folder('map'):
        if p.get('draft') or p.get('category') not in cat_ids or p.get('lat') is None or p.get('lng') is None:
            continue
        places.append({k: p.get(k) for k in ('slug', 'name', 'category', 'type', 'area', 'lat', 'lng', 'text', 'details', 'price', 'guide', 'website') if p.get(k) not in (None, '')})
    # hiking routes: content/trails/<place file name>.json -> /map/trails.json and a GPX file per trail
    trails = {}
    tdir = os.path.join(ROOT, 'content', 'trails')
    by_slug = {p['slug']: p for p in load_folder('map')}
    for f in sorted(os.listdir(tdir)) if os.path.isdir(tdir) else []:
        slug = f[:-5]
        if not f.endswith('.json') or slug not in by_slug:
            continue
        coords = json.load(open(os.path.join(tdir, f), encoding='utf-8'))['coords']
        trails[slug] = coords
        name = by_slug[slug]['name']
        pts = ''.join(f'<trkpt lat="{la}" lon="{lo}"/>' for lo, la in coords)
        gpx = ('<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="maltaexpatguide.com" xmlns="http://www.topografix.com/GPX/1/1">'
               f'<metadata><name>{html.escape(name)}</name><desc>Approximate route from maltaexpatguide.com. Route data © OpenStreetMap contributors.</desc></metadata>'
               f'<trk><name>{html.escape(name)}</name><trkseg>{pts}</trkseg></trk></gpx>\n')
        write(f'/map/trails/{slug}.gpx', gpx)
    write('/map/trails.json', json.dumps(trails, separators=(',', ':')))
    # neighbourhood zones: content/areas/<place file name>.json (real council boundaries from OpenStreetMap)
    zones = {}
    adir = os.path.join(ROOT, 'content', 'areas')
    for f in sorted(os.listdir(adir)) if os.path.isdir(adir) else []:
        if f.endswith('.json') and f[:-5] in by_slug:
            zones[f[:-5]] = json.load(open(os.path.join(adir, f), encoding='utf-8'))['geometry']
    write('/map/areas.json', json.dumps(zones, separators=(',', ':')))
    for p in places:
        if p.get('slug') in trails:
            p['route'] = p['slug']
        if p.get('slug') in zones:
            p['zone'] = p['slug']
    for p in places:
        p.pop('slug', None)
    places.sort(key=lambda p: p['name'].lower())
    safe_json = lambda o: json.dumps(o, ensure_ascii=False).replace('</', '<\\/')
    write('/map/', env.get_template('map.html').render(
        places_json=safe_json(places), categories_json=safe_json(MAP_CATEGORIES),
        **common('Malta Map: things to do, beaches, hiking, diving and more',
                 'Interactive map of Malta and Gozo: things to do, hiking trails, dive sites, beaches, neighbourhoods, expat services and English schools.',
                 '/map/', 'map')))
    pages.append('/map/')

    # ---- tools (calculators): overview at /tools/ plus one page per tool ----
    tools = sorted([t for t in load_folder('tools') if not t.get('draft')], key=lambda t: (t.get('order', 99), t['title']))
    hub = read(os.path.join(ROOT, 'content', 'tools-page.md'))
    rent_doc = next((t for t in tools if t['slug'] == 'rent-prices'), {})
    rent_data = {k: rent_doc.get(k) for k in ('areas', 'studioFactor', 'threeBedFactor')}
    for t in tools:
        t['url'] = f"/tools/{t['slug']}.html"
        t['menuName'] = t.get('menuName') or t['title']
    for t in tools:
        faq_schema = {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
            {'@type': 'Question', 'name': f['question'], 'acceptedAnswer': {'@type': 'Answer', 'text': f['answer']}}
            for f in t.get('faqs') or []]}
        write(t['url'], env.get_template('tool.html').render(
            tool=t, tools=tools, hub=hub, faq_schema=safe_json(faq_schema),
            tool_data=safe_json({'rent': rent_data, 'costs': t.get('costs') or {}}),
            **common(t.get('seoTitle') or t['title'], t.get('description'), t['url'], 'tools')))
        pages.append(t['url'])
    write('/tools/', env.get_template('tools.html').render(tools=tools, hub=hub,
          **common(hub.get('seoTitle') or 'Free Malta calculators: cost of living, salary, tax and rent',
                   hub.get('description'), '/tools/', 'tools')))
    pages.append('/tools/')

    # ---- home and 404 ----
    home = read(os.path.join(ROOT, 'content', 'home.md'))
    write('/', env.get_template('home.html').render(sections=sections, home=home, latest_posts=posts[:3],
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
    footer = [{'name': pg['menuName'], 'href': pg['url']}
              for pg in sorted(pages_extra, key=lambda x: (x.get('footerOrder', 99), x['menuName'])) if pg.get('inFooter')]
    if tools:
        footer.insert(0, {'name': 'Tools', 'href': '/tools/'})
    extra_nav = [{'id': 'map', 'name': 'Map', 'href': '/map/'}]
    if tools:
        extra_nav.append({'id': 'tools', 'name': 'Tools', 'href': '/tools/',
                          'guides': [{'name': t['menuName'], 'href': t['url']} for t in tools]})
    if posts:
        extra_nav.append({'id': 'blog', 'name': 'Blog', 'href': '/blog/'})
    script = script.replace('(function () {',
                            f'const SECTIONS = {json.dumps(nav, ensure_ascii=False)};\nconst TOP_NAV = {json.dumps(top)};\n'
                            f'const FOOTER_LINKS = {json.dumps(footer, ensure_ascii=False)};\n'
                            f'const EXTRA_NAV = {json.dumps(extra_nav)};\n\n(function () {{', 1)
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
    for f in ('CNAME', 'robots.txt', 'ads.txt', 'favicon.ico'):
        shutil.copy(os.path.join(ROOT, f), OUT)
    open(os.path.join(OUT, '.nojekyll'), 'w').close()

    print(f'Built {len(pages) + 2} pages into _site/')


if __name__ == '__main__':
    main()

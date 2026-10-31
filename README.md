# Malta Expat Guide

Source for [maltaexpatguide.com](https://maltaexpatguide.com), a guide for foreign nationals moving to or living in Malta.

## Editing the website (no code needed)

1. Go to **https://maltaexpatguide.com/admin/**
2. Click **Sign In with Token** and paste your GitHub token (see below).
3. Choose **Home page**, **Guides** or **Sections**, then create, edit or delete a page.
4. Click **Save**. The live website updates by itself after about 1–2 minutes.

**Content blocks:** each block is one white card on the page. In the *Text* box you can use bold, lists, links and tables. A quote (`>`) shows as a blue note box.

Some older blocks use the *Advanced: HTML* box (for special boxes and grids). You can change the words there, but keep the `<tags>` as they are.

### Getting a GitHub token (one time)

1. On GitHub, open **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Repository access: **Only select repositories → malta-expat-hub**.
3. Permissions: **Contents → Read and write**.
4. Copy the token and paste it in the admin panel. Keep it private, like a password.

## How it works

| Path | What it is |
| --- | --- |
| `content/guides/` | One file per guide page (edited in the admin panel) |
| `content/sections/` | One file per section, including Getting Started and Safety |
| `content/home.md` | Home page text and photos |
| `templates/` | Page layouts, the home page, 404 page, and the menu script |
| `assets/` | Styles, favicon and uploaded photos (`assets/images/`) |
| `admin/` | The admin panel ([Sveltia CMS](https://github.com/sveltia/sveltia-cms), free and open source) |
| `build.py` | Turns the content into web pages in `_site/` |
| `.github/workflows/publish.yml` | Builds and publishes the site on every change to `main` |

The menu, section pages, home page tiles and sitemap are created automatically from the content files.

GitHub Pages must be set to **Settings → Pages → Source: GitHub Actions**.

### Preview on your own computer (optional)

```sh
pip install -r requirements.txt
python3 build.py
cd _site && python3 -m http.server 8000   # open http://localhost:8000
```

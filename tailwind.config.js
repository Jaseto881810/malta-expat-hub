// Builds assets/content.css, the utility styles used inside guide articles.
// GitHub rebuilds it automatically when the site is published.
module.exports = {
  content: ['./content/**/*.md', './templates/**/*.html'],
  theme: { extend: {} },
};

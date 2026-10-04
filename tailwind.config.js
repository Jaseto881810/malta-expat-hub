// Builds assets/content.css, the utility styles used inside guide articles.
// Rebuilt automatically by .github/workflows/build-css.yml on every push.
module.exports = {
  content: ['./**/*.html', '!./node_modules/**'],
  theme: { extend: {} },
};

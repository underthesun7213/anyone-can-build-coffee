// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://underthesun7213.github.io/anyone-can-build-coffee/
// (ADR-0006). A custom subdomain comes later; then `site` changes and `base` becomes '/'.
export default defineConfig({
  site: 'https://underthesun7213.github.io',
  base: '/anyone-can-build-coffee',
  trailingSlash: 'always',
  build: { format: 'directory' },
});

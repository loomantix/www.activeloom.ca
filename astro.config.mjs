import { defineConfig } from 'astro/config';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Preserve the HTML spacing used before Astro 7.
  compressHTML: true,
  vite: { css: { postcss: { plugins: [tailwind(), autoprefixer()] } } },
  site: 'https://activeloom.dev',
  integrations: [sitemap()],
});

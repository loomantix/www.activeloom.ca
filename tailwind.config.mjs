/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['selector', '[data-mode="ink"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        loom: {
          ground: 'var(--loom-ground)',
          panel: 'var(--loom-panel)',
          subpanel: 'var(--loom-subpanel)',
          border: 'var(--loom-border)',
          'border-active': 'var(--loom-border-active)',
          text: 'var(--loom-text)',
          muted: 'var(--loom-muted)',
          accent: 'var(--loom-accent)',
          'accent-glow': 'var(--loom-accent-glow)',
          cyan: 'var(--loom-cyan)',
          amber: 'var(--loom-amber)',
          coral: 'var(--loom-coral)',
          code: 'var(--loom-code)',
        },
      },
    },
  },
  plugins: [],
};

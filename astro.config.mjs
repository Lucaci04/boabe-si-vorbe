// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Pagina rămâne statică; doar /api/reservations rulează pe server (prerender = false).
  adapter: vercel(),
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});

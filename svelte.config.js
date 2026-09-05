import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const readList = (path) =>
  JSON.parse(readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'));

const eventEntries = readList('./src/lib/data/api/events/__list.json').map(
  (e) => `/events/${e.slug}`
);
const projectEntries = readList('./src/lib/data/api/projects/__list.json').map(
  (p) => `/projects/${p.slug}`
);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      '@': './src',
      '@/*': './src/*'
    },
    prerender: {
      entries: [
        '/',
        '/events',
        '/projects',
        '/team',
        '/contacts',
        ...eventEntries,
        ...projectEntries
      ]
    }
  }
};

export default config;

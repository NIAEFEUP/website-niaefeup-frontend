import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess({}),
    sveltePreprocess({
      postcss: true
    })
  ],

  kit: {
    adapter: adapter(),
    alias: {
      '@': './src',
      '@/*': './src/*'
    }
  }
};

export default config;

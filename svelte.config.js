import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess({}),
    preprocess({
      postcss: true
    })
  ],

  kit: {
    adapter: adapter(),
    alias: {
      '@/*': './src'
    }
  }
};

export default config;

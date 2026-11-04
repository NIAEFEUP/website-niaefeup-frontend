import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
  plugins: [ enhancedImages(),
    tailwindcss(),
    sveltekit({
      alias: {
        '@': './src',
        '@/*': './src/*'
      },
      adapter: adapter(),
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes('node_modules') ? undefined : true
      }
    })
  ]
});

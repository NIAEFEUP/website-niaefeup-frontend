import { sveltekit } from '@sveltejs/kit/vite';

const config: import('vite').UserConfig = {
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
};

export default config;

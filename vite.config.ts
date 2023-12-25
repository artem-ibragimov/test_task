import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base: 'https://artem-ibragimov.github.io',
	plugins: [sveltekit()]
});

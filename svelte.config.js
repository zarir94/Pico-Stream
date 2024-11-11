import adapter from '@sveltejs/adapter-auto';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	transformers: {
		scss: {
			includePaths: ['node_modules', 'src']
		}
	},
	kit: {
		adapter: adapter(),
		version: {
			name: +new Date() + ''
		}
	},
	preprocess: sveltePreprocess()
};

export default config;


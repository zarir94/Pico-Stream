import { sveltePreprocess } from 'svelte-preprocess';
import adapterNode from '@sveltejs/adapter-node';
import adapterAuto from '@sveltejs/adapter-auto';

const adapter = process.env.ADAPTER === 'vercel' ? adapterAuto : adapterNode;


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	preprocess: sveltePreprocess()
};

export default config;


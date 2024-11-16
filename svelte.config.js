import { sveltePreprocess } from 'svelte-preprocess';
import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';

const adapter = process.env.ADAPTER === 'vercel' ? adapterVercel : adapterNode;


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	preprocess: sveltePreprocess()
};

export default config;


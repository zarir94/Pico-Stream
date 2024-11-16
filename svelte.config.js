import { sveltePreprocess } from 'svelte-preprocess';
import adapterNode from '@sveltejs/adapter-node';
import adapterAuto from '@sveltejs/adapter-auto';

console.log('ENV CI:', process.env.CI);

const adapter = process.env.CI == 1 ? adapterAuto : adapterNode;


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	preprocess: sveltePreprocess()
};

export default config;


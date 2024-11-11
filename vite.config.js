import purge from '@erbelion/vite-plugin-sveltekit-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		purge({ paths: ['src/**/*.{svelte,html}', 'src/lib/design/*.{svelte,html}'] })
	],
	build: {
		rollupOptions: {
			output: {
				entryFileNames: 'assets2/[name].edited[hash].js',
				chunkFileNames: 'assets2/[name].edited[hash].js',
				assetFileNames: 'assets2/[name].edited[hash].[ext]'
			}
		}
	}
});


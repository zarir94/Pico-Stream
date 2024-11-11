import purge from '@erbelion/vite-plugin-sveltekit-purgecss'
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
				entryFileNames: 'assets/[name].edited[hash].js',
				chunkFileNames: 'assets/[name].edited[hash].js',
				assetFileNames: 'assets/[name].edited[hash].[ext]'
			}
		}
	}
});


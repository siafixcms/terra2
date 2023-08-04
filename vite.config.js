import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import VitePluginSocketIO from './plugins/vite-plugin-socket-io';


export default defineConfig({
	plugins: [sveltekit(), VitePluginSocketIO()]
});

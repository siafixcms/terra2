import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import VitePluginSocketIO from './plugins/vite-plugin-svelte-socketio';


export default defineConfig({
	plugins: [sveltekit(), VitePluginSocketIO()]
});

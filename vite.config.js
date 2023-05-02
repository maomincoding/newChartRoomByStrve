import { defineConfig } from 'vite';

export default defineConfig({
	// options
	base: '/site/chatRoom/',
	server: {
		strictPort: true,
		port: 3001,
	},
});

import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
	// options
	base: '/site/chatRoom/',
	server: {
		strictPort: true,
		port: 3001,
	},
	plugins: [
		// Babel will try to pick up Babel config files (.babelrc or .babelrc.json)
		babel(),
	],
});

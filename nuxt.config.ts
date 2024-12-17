import dotenv from 'dotenv';
dotenv.config(); // Load .env file

export default defineNuxtConfig({
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		OPENAI_API_KEY: process.env.OPENAI_API_KEY
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	}
});

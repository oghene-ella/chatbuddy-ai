import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
	plugins: [tailwindcss()],
	envPrefix: "VITE_",
});
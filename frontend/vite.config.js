import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "https://vercel.com/tarun02jains-projects/mern-netflix-clone/EyDL5wvTneNvvkoUQrrrhmvG8AmH",
			},
		},
	},
});

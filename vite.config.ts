import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, type AliasOptions } from 'vite'

//for path aliases
import path from 'node:path'
const root = (dir: string = '') => path.resolve(__dirname, 'src', dir)

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': root()
		} as AliasOptions
	}
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader()],
  base: process.env.NODE_ENV === 'production'
    ? '/almli-portfolio-v2/'
    : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/vue-fontawesome',
      'aos',
      'three'
    ]
  },
  build: {
    commonjsOptions: {
      include: [/three/, /vanta/, /aos/, /node_modules/]
    }
  }
})
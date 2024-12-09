import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    devtool: 'source-map',
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
  },
  optimizeDeps: {
    include: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/vue-fontawesome',
      'gsap',
      'aos',
      'three'
    ]
  },
  build: {
    commonjsOptions: {
      include: [/aos/, /node_modules/]
    },
    sourcemap: true,
  }
})
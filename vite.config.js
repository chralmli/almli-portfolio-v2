import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader()],
  base: '/',
    server: {
      headers: {
        'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https:;
        connect-src 'self' https:;
        frame-src 'self';
        worker-src 'self' blob:;
        manifest-src 'self';
        media-src 'self';
        object-src 'none';
        child-src 'self';
      `.replace(/\s+/g, ' ').trim()
      }
    },
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
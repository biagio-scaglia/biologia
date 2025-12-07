import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/biologia/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Map lodash to lodash-es for ES module compatibility
      'lodash': 'lodash-es',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React vendor chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          // Animation vendor chunk
          if (id.includes('node_modules/framer-motion')) {
            return 'animation-vendor';
          }
          // Icons vendor chunk
          if (id.includes('node_modules/react-icons') || id.includes('node_modules/@radix-ui')) {
            return 'icons-vendor';
          }
          // Other vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    cssMinify: true,
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Optimize asset inlining threshold
    assetsInlineLimit: 4096,
    // Enable compression
    reportCompressedSize: true,
    // Target modern browsers for smaller bundle
    target: 'esnext',
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'lodash-es',
    ],
    // Force pre-bundling to handle CommonJS dependencies
    force: true,
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: false,
  },
  // Performance optimizations
  server: {
    fs: {
      strict: true,
    },
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
})


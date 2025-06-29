import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    
    // Legacy browser support
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    
    // Bundle analyzer - only in analyze mode
    ...(process.env.ANALYZE ? [visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })] : []),
  ],
  
  // Build optimizations
  build: {
    // Target modern browsers for better optimization
    target: 'es2020',
    
    // Optimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    
    // Chunk splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and related libraries
          vendor: ['react', 'react-dom'],
          
          // Styled components chunk
          styles: ['styled-components'],
        },
      },
    },
    
    // Source maps for production debugging
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  
  // Development optimizations
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'styled-components',
    ],
  },
  
  // Performance optimizations
  esbuild: {
    // Drop console and debugger in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
})
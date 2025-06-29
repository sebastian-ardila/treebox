/// <reference types="vitest" />
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
          
          // Utils chunk for utility functions
          utils: [
            './src/utils/colorUtils',
            './src/utils/validators',
            './src/utils/formatters',
            './src/utils/cssGenerator',
            './src/utils/boxCalculations',
          ],
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
    exclude: [
      // Exclude test files from optimization
      'vitest',
      '@testing-library/react',
    ],
  },
  
  // Performance optimizations
  esbuild: {
    // Drop console and debugger in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  
  test: {
    // Test environment
    environment: 'jsdom',
    
    // Setup files
    setupFiles: ['./src/test/setup.ts'],
    
    // Global test configuration
    globals: true,
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/*.d.ts',
        'src/vite-env.d.ts',
        'dist/',
        'build/',
        '*.config.{js,ts}',
        'src/main.tsx',
        'src/App.css',
        'src/index.css',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    
    // Test file patterns
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    
    // Test timeout
    testTimeout: 10000,
    
    // Mock configuration
    deps: {
      inline: ['@testing-library/jest-dom'],
    },
  },
})

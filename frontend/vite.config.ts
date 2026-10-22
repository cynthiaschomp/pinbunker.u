import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: Strict relative asset paths for IPFS decentralized gateway compatibility (.limo, dweb.link)
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          web3: ['wagmi', 'viem', '@rainbow-me/rainbowkit'],
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
      },
      '/pinning': {
        target: 'http://localhost:5050',
        changeOrigin: true,
      },
      '/data': {
        target: 'http://localhost:5050',
        changeOrigin: true,
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: [
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'firebase/storage'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
});
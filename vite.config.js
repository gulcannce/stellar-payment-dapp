import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages (alt path) ve Vercel (kök domain) ikisinde de çalışsın diye
  // göreli asset yolları kullanılıyor.
  base: './',
})

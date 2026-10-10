// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // Ensure tailwind is after react
  ],
  server: {
    watch: {
      // json-server writes new posts back into db.json on every request —
      // without this, Vite treats that disk write as a source change and
      // triggers a full page reload right after the toast shows.
      ignored: ['**/db.json'],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
})
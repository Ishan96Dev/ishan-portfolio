import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Custom Domain configured: 'ishanchakraborty.com' (Requires root base)
  base: "/portfolio-app/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  base: '/AiTool/' ,
  plugins: [react() , tailwindcss(),],
    // <-- yaha apna repo name dena jaruri hai

})


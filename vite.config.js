import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ],
  define: {
    'process.env': process.env
  },
  server: {
    port: 1333, // cổng cố định bạn muốn dùng
    strictPort: true // báo lỗi nếu port đang bị dùng (không tự động nhảy port)
  }
})

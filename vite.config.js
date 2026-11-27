import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' 로 두면 GitHub Pages 등 하위 경로 정적 호스팅에서도 그대로 열린다.
export default defineConfig({
  plugins: [react()],
  base: './',
})

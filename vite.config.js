import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BrowserRouter라서 절대 경로(/)로 빌드해야 /p/demo/c 같은 깊은 주소에서도 자산이 열린다.
export default defineConfig({
  plugins: [react()],
  base: '/',
})

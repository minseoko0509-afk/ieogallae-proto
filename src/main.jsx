import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/tokens.css'
import './styles/base.css'

// HashRouter: 서버 설정 없이 정적 호스팅(GitHub Pages 등)에서 새로고침해도 깨지지 않게.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)

import { useNavigate } from 'react-router-dom'

// 화면 전환: const go = useGo(); go('B2')  →  #/s/B2
// 지금은 모든 화면을 /s/:id 로 연다. 실제 URL(/p/:id 등)로 상태 기반 분기는
// src/router/routes.jsx 의 resolve 쪽에서 붙인다.
export function useGo() {
  const navigate = useNavigate()
  return (screenId, opts) => navigate(`/s/${screenId}`, opts)
}

export const screenHref = (screenId) => `#/s/${screenId}`

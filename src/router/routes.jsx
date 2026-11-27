import { useEffect } from 'react'
import { Routes, Route, Navigate, useParams, useSearchParams } from 'react-router-dom'
import ScreenHost from './ScreenHost.jsx'
import { useAppState } from '../state/AppState.jsx'
import { EVENT } from '../state/sampleData.js'
import { resolveScreen } from '../state/selectors.js'

// /p/:id 화면은 단일 상태(src/state)로 고른다: resolveScreen → B1 | B1-L | C1 | C2 | C3-D | D1
export const resolvePlanScreen = (state) => resolveScreen(state)
// /p/:id/c 는 확정됐을 때만 D1. 아니면 null(→ /p/:id 로 돌려보냄)
export const resolveConfirmScreen = (state) => (state.confirmed ? 'D1' : null)

function ByScreenId() {
  const { screenId } = useParams()
  return <ScreenHost id={screenId} />
}

function Plan() {
  const { planId } = useParams()
  const [params] = useSearchParams()
  const { state, actions } = useAppState()
  // 관리 링크 ?k=토큰 으로 들어오면 주도자
  const hostLink = params.get('k') === EVENT.hostToken
  useEffect(() => {
    if (hostLink && state.role !== 'host') actions.setRole('host')
  }, [hostLink, state.role, actions])

  const id = resolvePlanScreen(hostLink ? { ...state, role: 'host' } : state)
  if (id === 'D1') return <Navigate to={`/p/${planId}/c`} replace />
  return <ScreenHost id={id} />
}

function Confirm() {
  const { planId } = useParams()
  const { state } = useAppState()
  const id = resolveConfirmScreen(state)
  if (!id) return <Navigate to={`/p/${planId}`} replace />
  return <ScreenHost id={id} />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ScreenHost id="L0" />} />
      <Route path="/new" element={<ScreenHost id="A1" />} />
      <Route path="/p/:planId" element={<Plan />} />
      <Route path="/p/:planId/c" element={<Confirm />} />
      {/* 화면 ID 바로가기 (데모·개발용) */}
      <Route path="/s/:screenId" element={<ByScreenId />} />
      <Route path="*" element={<ScreenHost id="L0" />} />
    </Routes>
  )
}

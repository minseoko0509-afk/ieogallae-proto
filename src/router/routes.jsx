import { Routes, Route, useParams } from 'react-router-dom'
import ScreenHost from './ScreenHost.jsx'

// 상태로 /p/:id 화면을 고르는 함수. 지금은 기본값만 돌려준다.
// 상태 모델이 들어오면 여기서 resolveScreen(state)로 C1/C2/C3-D/B1/B1-L 등을 고른다.
export const resolvePlanScreen = () => 'B1'
export const resolveConfirmScreen = () => 'D1'

function ByScreenId() {
  const { screenId } = useParams()
  return <ScreenHost id={screenId} />
}
function Plan() {
  return <ScreenHost id={resolvePlanScreen()} />
}
function Confirm() {
  return <ScreenHost id={resolveConfirmScreen()} />
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

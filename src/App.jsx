import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import AppRoutes from './router/routes.jsx'
import DemoPanel from './demo/DemoPanel.jsx'
import { AppStateProvider, useAppState } from './state/AppState.jsx'
import { EVENT } from './state/sampleData.js'
import { resolveScreen } from './state/selectors.js'

// 무대 레이아웃: 가운데 폰 프레임(라우트가 그림) + 오른쪽 바깥 데모 컨트롤 패널.
export default function App() {
  return (
    <AppStateProvider>
      <div className="stage">
        <AppRoutes />
        <aside className="side-slot">
          <Panel />
        </aside>
      </div>
    </AppStateProvider>
  )
}

// 지금 폰에 떠 있는 화면 ID (패널에서 강조)
function useCurrentScreen() {
  const { pathname } = useLocation()
  const { state } = useAppState()
  const s = matchPath('/s/:screenId', pathname)
  if (s) return s.params.screenId
  if (matchPath('/p/:planId/c', pathname)) return state.confirmed ? 'D1' : resolveScreen(state)
  if (matchPath('/p/:planId', pathname)) return resolveScreen(state)
  if (pathname === '/new') return 'A1'
  return 'L0'
}

function Panel() {
  const navigate = useNavigate()
  const { actions } = useAppState()
  return (
    <DemoPanel
      currentScreen={useCurrentScreen()}
      onJump={(id) => navigate(`/s/${id}`)}
      onFollowState={() => { actions.reenter(); navigate(`/p/${EVENT.id}`) }}
    />
  )
}

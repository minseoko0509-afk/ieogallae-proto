import AppRoutes from './router/routes.jsx'
import ScreenNav from './components/ScreenNav.jsx'

// 무대 레이아웃: 가운데 폰 프레임(라우트가 그림) + 오른쪽 바깥 패널 슬롯.
// 데모 컨트롤 패널은 <aside className="side-slot"> 안에 넣는다.
export default function App() {
  return (
    <div className="stage">
      <AppRoutes />
      <aside className="side-slot">
        <ScreenNav />
      </aside>
    </div>
  )
}

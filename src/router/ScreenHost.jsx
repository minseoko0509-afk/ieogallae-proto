import { getScreen } from '../screens/registry.js'
import { SCREEN_COMPONENTS } from '../screens/index.js'
import PhoneFrame from '../components/PhoneFrame.jsx'

// 화면 ID 하나를 폰 프레임 안에 그린다.
// modal/sheet 화면은 registry의 base 화면을 뒤에 깔고 그 위에 띄운다.
export default function ScreenHost({ id }) {
  const s = getScreen(id)
  const Comp = SCREEN_COMPONENTS[id]
  if (!s || !Comp) return <NotFound id={id} />
  const Base = s.base ? SCREEN_COMPONENTS[s.base] : null
  return (
    <PhoneFrame screenId={id}>
      {Base && <Base />}
      <Comp />
    </PhoneFrame>
  )
}

function NotFound({ id }) {
  return (
    <PhoneFrame screenId="?">
      <div className="phone__body">
        <p className="t-title">없는 화면이야</p>
        <p className="t-caption">"{id}" 화면 ID를 찾을 수 없어.</p>
        <a href="/">처음으로</a>
      </div>
    </PhoneFrame>
  )
}

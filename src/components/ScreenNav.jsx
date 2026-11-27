import { useLocation } from 'react-router-dom'
import { SCREENS, GROUPS } from '../screens/registry.js'
import { screenHref } from '../router/useGo.js'

// 임시 화면 바로가기. 데모 컨트롤 패널(src/demo/)이 생기면 App.jsx에서 교체한다.
export default function ScreenNav() {
  const { pathname } = useLocation()
  return (
    <nav className="screen-nav" aria-label="화면 바로가기">
      <h2>화면 바로가기 ({SCREENS.length})</h2>
      {GROUPS.map((g) => (
        <div key={g.key}>
          <h3>{g.label}</h3>
          <ul>
            {SCREENS.filter((s) => s.group === g.key).map((s) => (
              <li key={s.id}>
                <a href={screenHref(s.id)} title={s.title} aria-current={pathname === `/s/${s.id}` ? 'page' : undefined}>
                  {s.id}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

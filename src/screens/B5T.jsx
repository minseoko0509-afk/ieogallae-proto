import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Screen, Button, TopBar } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { InfoIcon } from './A1.jsx'

const STEPS = {
  iOS: [
    ['1. 다른 브라우저로 열기', '카톡 오른쪽 아래 ⋯ → Safari로 열기'],
    ['2. 홈 화면에 추가', '공유 버튼 → 홈 화면에 추가'],
    ['3. 알림 허용', '홈 화면 아이콘으로 열고 알림 허용'],
  ],
  Android: [
    ['1. 다른 브라우저로 열기', '카톡 오른쪽 위 ⋮ → 다른 브라우저로 열기'],
    ['2. 홈 화면에 추가', '크롬 메뉴 ⋮ → 홈 화면에 추가'],
    ['3. 알림 허용', '홈 화면 아이콘으로 열고 알림 허용'],
  ],
}

// B5-T 웹 푸시 튜토리얼. returnTo(A3 또는 B5)로 돌아간다
export default function B5T() {
  const go = useGo()
  const { state: nav } = useLocation()
  const back = nav?.returnTo ?? 'B5'
  const [os, setOs] = useState('iOS')

  return (
    <Screen>
      <TopBar />
      <div className="seg" role="tablist">
        {Object.keys(STEPS).map((k) => (
          <button key={k} type="button" role="tab" aria-selected={os === k} className={os === k ? 'is-on' : ''} onClick={() => setOs(k)}>{k}</button>
        ))}
      </div>
      <div className="card note" style={{ padding: '10px 14px' }}>
        <InfoIcon />
        <p className="t-caption" style={{ color: 'var(--c-ink)' }}>카톡 안에서는 푸시가 안 돼. 아래 순서대로 해줘</p>
      </div>
      {STEPS[os].map(([n, t]) => (
        <div key={n} className="card row" style={{ gap: 12, flexWrap: 'nowrap', padding: 12 }}>
          <span className="shot">[스크린샷]</span>
          <div><p className="t-body" style={{ fontWeight: 700 }}>{n}</p><p className="t-caption" style={{ color: 'var(--c-deep)' }}>{t}</p></div>
        </div>
      ))}
      <div className="bottom">
        <Button variant="primary" onClick={() => go(back)}>알림 허용했어</Button>
        <Button variant="text" onClick={() => go(back === 'A3' ? 'A3' : 'B5-N')}>이메일로도 받을래</Button>
      </div>
    </Screen>
  )
}

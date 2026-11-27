import { useState } from 'react'
import { Screen, Button, BottomSheet, TopBar } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useToast } from '../components/Toast.jsx'

// B5-N 알림 설정: 일정 나오는 날 알려주기
export default function B5N() {
  const go = useGo()
  const [date, setDate] = useState('2026-12-05')
  const [sheet, setSheet] = useState(false)
  const [email, setEmail] = useState('')
  const [toast, show] = useToast()
  const ok = /\S+@\S+\.\S+/.test(email)

  return (
    <Screen>
      <TopBar />
      <p className="t-title">언제쯤 너의 일정이 나와?</p>
      <div>
        <label className="field-label" htmlFor="b5nd">일정 나오는 날</label>
        <input id="b5nd" className="input" type="date" min="2026-11-27" max="2026-12-31" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <p className="t-caption" style={{ marginTop: -10, color: 'var(--c-deep)' }}>그날 알려줄게. 응답 고치러 와줘</p>
      <div className="row" style={{ flexWrap: 'nowrap' }}>
        <Button variant="primary" style={{ flex: 1, height: 44, boxShadow: 'var(--shadow-px-s)' }} onClick={() => setSheet(true)}>이메일로 알려줘</Button>
        <Button style={{ flex: 1, height: 44 }} onClick={() => go('B5-T', { state: { returnTo: 'B5' } })}>웹 푸시로 알려줘</Button>
      </div>
      <div className="bottom"><Button variant="text" onClick={() => go('B5')}>나중에 할래</Button></div>
      {sheet && (
        <BottomSheet onClose={() => setSheet(false)}>
          <p className="t-body" style={{ fontWeight: 700 }}>이메일 주소</p>
          <input className="input" type="email" aria-label="이메일" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button variant="primary" disabled={!ok} onClick={() => { show('알림 신청했어 콕'); setTimeout(() => go('B5'), 700) }}>완료</Button>
          <Button variant="text" onClick={() => go('B5-T', { state: { returnTo: 'B5' } })}>웹 푸시로 설정하기</Button>
        </BottomSheet>
      )}
      {toast}
    </Screen>
  )
}

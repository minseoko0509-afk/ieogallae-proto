import { useState } from 'react'
import { Screen, Button, Steps } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useStore, planDraft } from '../lib/drafts.js'
import { threshold } from '../lib/ranking.js'
import '../styles/screens.css'

const MAX = 20

// A1 기본 정보: 약속 이름, 내 이름, 인원 N, 70% 기준 실시간 계산
export default function A1() {
  const go = useGo()
  const [d, set] = useStore(planDraft)
  const [tried, setTried] = useState(false)
  const errTitle = !d.title.trim() && '약속 이름을 적어줘'
  const errHost = !d.host.trim() && '네 이름을 적어줘'

  const next = () => {
    setTried(true)
    if (!errTitle && !errHost) go('A2')
  }

  return (
    <Screen>
      <Steps current={1} />
      <p className="t-title">어떤 약속이야?</p>
      <div>
        <label className="field-label" htmlFor="a1n">약속 이름</label>
        <input id="a1n" className="input" maxLength={MAX} value={d.title} placeholder="예: 연말 방어회 모임"
          onChange={(e) => set({ title: e.target.value })} aria-invalid={tried && !!errTitle} />
        <p className="counter">{d.title.length}/{MAX}</p>
        {tried && errTitle && <p className="err">{errTitle}</p>}
      </div>
      <div>
        <label className="field-label" htmlFor="a1m">내 이름</label>
        <input id="a1m" className="input" maxLength={MAX} value={d.host} placeholder="친구들이 알아볼 이름"
          onChange={(e) => set({ host: e.target.value })} aria-invalid={tried && !!errHost} />
        {tried && errHost && <p className="err">{errHost}</p>}
      </div>
      <div>
        <span className="field-label">인원 수 (2~15명)</span>
        <div className="stepper">
          <Button aria-label="인원 줄이기" disabled={d.n <= 2} onClick={() => set({ n: d.n - 1 })}>−</Button>
          <span className="stepper__val" aria-live="polite">{d.n}</span>
          <Button aria-label="인원 늘리기" disabled={d.n >= 15} onClick={() => set({ n: d.n + 1 })}>+</Button>
          <span className="t-body">명</span>
        </div>
      </div>
      <div className="card note">
        <p className="t-caption" style={{ color: 'var(--c-ink)' }}>
          {d.n}명 중 {threshold(d.n)}명(70%)이 답하면 결과가 나와
        </p>
      </div>
      <div className="bottom"><Button variant="primary" onClick={next}>다음</Button></div>
    </Screen>
  )
}

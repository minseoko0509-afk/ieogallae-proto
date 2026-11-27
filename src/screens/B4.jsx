import { useEffect, useState } from 'react'
import { Screen, Button, Bird, TopBar } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useAppState } from '../state/AppState.jsx'
import { captureOutcome } from '../state/selectors.js'
import { responseDraft, readDays, allOkDays } from '../lib/drafts.js'

const ANALYZE_MS = 2200

// 픽셀 진행 바: ms 동안 10칸이 차오른다 (진짜 진행률이 아니라 기다림 표시)
function PxProgress({ ms }) {
  const [n, setN] = useState(1)
  useEffect(() => {
    const t = setInterval(() => setN((x) => Math.min(10, x + 1)), ms / 10)
    return () => clearInterval(t)
  }, [ms])
  return (
    <div>
      <div className="pxbar" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <i key={i} className={i < n ? 'is-on' : ''} />)}</div>
      <p className="t-caption" style={{ textAlign: 'right', color: 'var(--c-deep)', marginTop: 4 }}>{n * 10}%</p>
    </div>
  )
}

// B4 분석 중. 결과는 데모 패널 "캡처 분석" 값으로 갈린다
export default function B4() {
  const go = useGo()
  const { state } = useAppState()
  const [attempt, setAttempt] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | month | retry

  useEffect(() => {
    if (phase !== 'loading') return
    const t = setTimeout(() => {
      const out = captureOutcome(state, attempt)
      if (out === 'B5') toB5()
      else if (out === 'B4-month') setPhase('month')
      else if (out === 'retry') setPhase('retry')
      else {
        responseDraft.set({ days: allOkDays(), source: 'manual', files: [] })
        go('B5-M', { replace: true })
      }
    }, ANALYZE_MS)
    return () => clearTimeout(t)
  }, [phase, attempt])

  function toB5() {
    responseDraft.set({ days: readDays(), source: 'capture', files: [] })
    go('B5', { replace: true })
  }

  if (phase === 'month') {
    return (
      <Screen>
        <TopBar back={false} />
        <div className="frame" style={{ minHeight: 180 }}><Bird mood="curious" size={150} /></div>
        <div style={{ textAlign: 'center' }}>
          <p className="t-title">날짜는 읽었는데 달이 안 보여</p>
          <p className="t-caption">어느 달 캡처인지 골라줘</p>
        </div>
        <div className="dashed-box">
          <p className="t-body" style={{ fontWeight: 700 }}>이거 몇 월이야?</p>
          <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {['11월', '12월', '1월'].map((m) => <Button key={m} variant={m === '12월' ? 'primary' : 'secondary'} style={{ height: 44 }} onClick={toB5}>{m}</Button>)}
          </div>
        </div>
      </Screen>
    )
  }
  if (phase === 'retry') {
    return (
      <Screen>
        <TopBar back={false} />
        <div className="frame" style={{ minHeight: 180 }}><Bird mood="surprised" size={150} /></div>
        <div style={{ textAlign: 'center' }}>
          <p className="t-title">잘 안 읽혔어</p>
          <p className="t-caption">한 번만 더 쪼아볼게. 그래도 안 되면 직접 체크하자</p>
        </div>
        <div className="bottom">
          <Button variant="primary" onClick={() => { setAttempt(1); setPhase('loading') }}>다시 분석하기</Button>
        </div>
      </Screen>
    )
  }
  return (
    <Screen>
      <TopBar back={false} />
      <div className="frame" style={{ minHeight: 180 }}><div className="peck" aria-hidden="true"><Bird mood="walk" size={150} /></div></div>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <p className="t-title" role="status">삐루가 열심히 쪼는 중…</p>
        <p className="t-caption">최대 10초 정도 걸려{attempt ? ' · 다시 해보는 중' : ''}</p>
      </div>
      <PxProgress ms={ANALYZE_MS} />
    </Screen>
  )
}

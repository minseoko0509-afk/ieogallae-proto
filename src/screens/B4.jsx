import { useEffect, useState } from 'react'
import { Screen, Button, Chip, Illust } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useAppState } from '../state/AppState.jsx'
import { captureOutcome } from '../state/selectors.js'
import { responseDraft, readDays, allOkDays } from '../lib/drafts.js'

const ANALYZE_MS = 2200

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
        <Illust label="뱁새 갸우뚱" h={180} />
        <p className="t-title">이거 몇 월이야?</p>
        <p className="t-caption">날짜는 읽었는데 달이 안 보여</p>
        <div className="row">
          {['11월', '12월', '1월'].map((m) => <Chip key={m} onClick={toB5}>{m}</Chip>)}
        </div>
      </Screen>
    )
  }
  if (phase === 'retry') {
    return (
      <Screen>
        <Illust label="뱁새 당황" h={180} />
        <p className="t-title">잘 안 읽혔어</p>
        <p className="t-caption">한 번만 더 쪼아볼게. 그래도 안 되면 직접 체크하자</p>
        <div className="bottom">
          <Button variant="primary" onClick={() => { setAttempt(1); setPhase('loading') }}>다시 분석하기</Button>
        </div>
      </Screen>
    )
  }
  return (
    <Screen>
      <div className="peck" aria-hidden="true"><Illust label="뱁새 쪼는 중" h={200} /></div>
      <p className="t-title" role="status">뱁새가 열심히 쪼는 중…</p>
      <p className="t-caption">최대 10초 걸려{attempt ? ' · 다시 해보는 중' : ''}</p>
      <div className="dots" aria-hidden="true"><i /><i /><i /></div>
    </Screen>
  )
}

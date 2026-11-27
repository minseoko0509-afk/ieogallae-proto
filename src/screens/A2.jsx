import { useState } from 'react'
import { Screen, Button, Chip, Steps } from '../components/ui.jsx'
import MonthGrid from '../components/MonthGrid.jsx'
import { useGo } from '../router/useGo.js'
import { useStore, planDraft } from '../lib/drafts.js'

const MAX_DAYS = 35 // 최대 5주
const SLOTS = ['점심', '저녁', '상관없음']
const days = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000) + 1
const short = (k) => { const [, m, d] = k.split('-').map(Number); return `${m}월 ${d}일` }

// A2 응답 설정: 날짜 범위 (탭 두 번: 시작 → 끝) + 시간대
export default function A2() {
  const go = useGo()
  const [d, set] = useStore(planDraft)
  const [ym, setYm] = useState({ y: 2026, m: 12 })
  const [picking, setPicking] = useState(false) // 시작만 고른 상태
  const [err, setErr] = useState('')

  const tap = (k) => {
    setErr('')
    if (!picking || k < d.start) {
      set({ start: k, end: k })
      setPicking(true)
      return
    }
    if (days(d.start, k) > MAX_DAYS) {
      setErr('최대 5주까지 고를 수 있어')
      return
    }
    set({ end: k })
    setPicking(false)
  }
  const move = (delta) => setYm(({ y, m }) => {
    const t = new Date(y, m - 1 + delta, 1)
    return { y: t.getFullYear(), m: t.getMonth() + 1 }
  })
  const n = days(d.start, d.end)

  return (
    <Screen>
      <Steps current={2} />
      <p className="t-title">언제쯤 만날까?</p>
      <p className="t-caption">날짜 범위를 골라줘 (최대 5주). 시작일과 끝날을 차례로 눌러</p>
      <div>
        <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <Button variant="text" aria-label="이전 달" onClick={() => move(-1)}>‹</Button>
          <b>{ym.y}년 {ym.m}월</b>
          <Button variant="text" aria-label="다음 달" onClick={() => move(1)}>›</Button>
        </div>
        <MonthGrid
          key={`${ym.y}-${ym.m}`}
          year={ym.y}
          month={ym.m}
          title={false}
          renderCell={(k) => ({
            className: k === d.start || k === d.end ? 'mcell--edge' : k > d.start && k < d.end ? 'mcell--in' : '',
          })}
          onTap={tap}
        />
      </div>
      <p className="t-caption" style={{ color: 'var(--c-ink)' }} aria-live="polite">
        선택: {short(d.start)} ~ {short(d.end)} ({Math.ceil(n / 7)}주 · {n}일){picking ? ' · 끝날을 눌러줘' : ''}
      </p>
      {err && <p className="err" role="alert">{err}</p>}
      <div>
        <span className="field-label">시간대</span>
        <div className="row">
          {SLOTS.map((s) => <Chip key={s} on={d.slot === s} onClick={() => set({ slot: s })}>{s}</Chip>)}
        </div>
      </div>
      <div className="bottom"><Button variant="primary" onClick={() => go('A3')}>다음</Button></div>
    </Screen>
  )
}

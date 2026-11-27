import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BottomSheet, Button } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useStore, responseDraft, needsTime } from '../lib/drafts.js'
import { formatDateKo } from '../lib/ranking.js'

const HOURS = Array.from({ length: 13 }, (_, i) => 11 + i) // 11시 ~ 23시

// B5-S 날짜 바텀시트: 이날 가능 여부 + 부분 가능 시각
export default function B5S() {
  const go = useGo()
  const { state: nav } = useLocation()
  const [draft, setDraft] = useStore(responseDraft)
  const date = nav?.date ?? needsTime(draft.days)[0] ?? '2026-12-19'
  const cur = draft.days[date]
  const [s, setS] = useState(cur.s === 'tbd' ? 'ok' : cur.s)
  const [from, setFrom] = useState(cur.from ?? 19)

  const save = () => {
    const next = { ...draft.days, [date]: { ...cur, s, ...(s === 'part' ? { from } : { from: undefined }) } }
    setDraft({ days: next })
    const rest = needsTime(next)
    if (nav?.queue && rest.length) go('B5-S', { state: { date: rest[0], queue: true }, replace: true })
    else go('B5')
  }

  const opt = (val, text) => (
    <label className={`card choice ${s === val ? 'is-on' : ''}`}>
      <input type="radio" name="b5s" checked={s === val} onChange={() => setS(val)} />
      {text}
    </label>
  )

  return (
    <BottomSheet onClose={() => go('B5')}>
      <p className="t-title" style={{ fontSize: 20 }}>{formatDateKo(date)}</p>
      <div className="card note">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="t-caption">읽힌 일정</span>
          <span className="t-caption row" style={{ gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
            너만 보여
          </span>
        </div>
        <p className="t-body" style={{ marginTop: 4 }}>
          {cur.ev || (cur.s === 'tbd' ? '아직 일정이 안 나왔어' : '읽힌 일정 없음')}
        </p>
      </div>
      <div className="stack" style={{ gap: 8 }} role="radiogroup" aria-label="이날 가능 여부">
        {opt('ok', '돼요')}
        {opt('part', '시간 맞으면 돼요')}
        {opt('no', '안 돼요')}
      </div>
      {s === 'part' && (
        <div>
          <label className="field-label" htmlFor="b5s-from">되는 시간 (시 단위)</label>
          <select id="b5s-from" className="input" value={from} onChange={(e) => setFrom(Number(e.target.value))}>
            {HOURS.map((h) => <option key={h} value={h}>{h}시 이후</option>)}
          </select>
        </div>
      )}
      <Button variant="primary" onClick={save}>저장</Button>
    </BottomSheet>
  )
}

import { useState } from 'react'
import { Screen, Button } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { usePlan } from '../lib/plan.js'
import { responseDraft } from '../lib/drafts.js'
import { top3, formatDateKo, describeTally } from '../lib/ranking.js'

// B1-L 늦은 응답: Top3 중 되는 날만 체크. 체크하는 대로 순위 실시간 재계산
export default function B1L() {
  const go = useGo()
  const { state, EVENT, DATES, top, meName } = usePlan()
  const [checked, setChecked] = useState([])
  const me = meName || '나'

  // 내가 체크한 걸 반영한 미리보기 순위 (후보는 지금 Top3)
  const myDays = Object.fromEntries(DATES.map((d) => [d, { s: checked.includes(d) ? 'ok' : 'no' }]))
  const preview = top3([...state.responses.filter((r) => r.name !== me), { name: me, days: myDays }], top.map((t) => t.date))
  const toggle = (d) => setChecked((c) => (c.includes(d) ? c.filter((x) => x !== d) : [...c, d]))

  const submit = () => {
    responseDraft.reset()
    responseDraft.set({ name: meName ?? '', days: myDays, late: true })
    go('B2')
  }

  return (
    <Screen>
      <p className="t-title">벌써 날짜 후보가 나왔어!<br />되는 날만 체크해줘</p>
      <p className="t-caption">{EVENT.title} · 순위는 네 체크까지 반영한 거야</p>
      <div className="stack" style={{ gap: 8 }}>
        {preview.map((t) => (
          <label key={t.date} className={`card choice ${checked.includes(t.date) ? 'is-on' : ''}`} style={{ padding: 10 }}>
            <input type="checkbox" checked={checked.includes(t.date)} onChange={() => toggle(t.date)} />
            <span className="rk">{t.rank}위</span>
            <span style={{ flex: 1 }}>
              <span className="t-body" style={{ display: 'block', fontWeight: 600 }}>{formatDateKo(t.date)}</span>
              <span className="t-caption">{describeTally(t)}</span>
            </span>
          </label>
        ))}
      </div>
      <p className="t-caption">Top3 밖 날짜는 안 되는 걸로 넣을게</p>
      <div className="bottom">
        <Button variant="primary" disabled={!checked.length} onClick={submit}>제출</Button>
        <Button variant="text" onClick={() => { responseDraft.reset(); responseDraft.set({ name: meName ?? '' }); go('B2') }}>
          이 중에 되는 날이 없어요
        </Button>
      </div>
    </Screen>
  )
}

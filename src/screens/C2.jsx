import { Screen, Button } from '../components/ui.jsx'
import StatusTop from '../components/StatusTop.jsx'
import MonthGrid from '../components/MonthGrid.jsx'
import { useGo } from '../router/useGo.js'
import { usePlan } from '../lib/plan.js'
import { formatDateKo, describeTally } from '../lib/ranking.js'

export function TopList({ top, onPick }) {
  return top.map((t) => (
    <button key={t.date} type="button" className={`top-item ${t.rank === 1 ? 'is-on' : ''}`} onClick={() => onPick(t.date)}>
      <span className={`rk ${t.rank === 1 ? 'rk--1' : ''}`}>{t.rank === 1 ? '♛ ' : ''}{t.rank}위</span>
      <span className="t-body" style={{ flex: 1, fontWeight: 700 }}>{formatDateKo(t.date)}</span>
      <span className="t-caption" style={{ color: 'var(--c-deep)' }}>{describeTally(t, true)}</span>
    </button>
  ))
}

// C2 70% 이상: 잠정 결과. 달력 1·2·3위 배지 + Top3 리스트
export default function C2() {
  const go = useGo()
  const { top, isHost, DATES } = usePlan()
  const rankOf = Object.fromEntries(top.map((t) => [t.date, t.rank]))
  const open = (date) => go('C2-S', { state: { date } })

  return (
    <Screen>
      <StatusTop compact />
      <div className="row">
        <span className="label-box">잠정 결과</span>
        <span className="t-caption">더 답하면 순위가 바뀔 수 있어</span>
      </div>
      <MonthGrid
        title={false}
        renderCell={(k, d) => {
          const r = rankOf[k]
          return {
            mark: r ? <span className={`rk-mini ${r === 1 ? 'rk-mini--1' : ''}`}>{r === 1 ? '♛' : ''}{r}위</span> : null,
            className: r ? 'mcell--rank' : DATES.includes(k) ? 'mcell--muted' : 'mcell--out',
            label: `12월 ${d}일${r ? ` ${r}위` : ''}`,
          }
        }}
        onTap={(k) => DATES.includes(k) && open(k)}
      />
      <TopList top={top} onPick={open} />
      {isHost && (
        <div className="bottom">
          <Button variant="primary" onClick={() => go('C3')}>날짜 확정하기</Button>
        </div>
      )}
    </Screen>
  )
}

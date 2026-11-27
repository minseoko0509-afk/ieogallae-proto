import { useLocation } from 'react-router-dom'
import { BottomSheet, Button } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { usePlan } from '../lib/plan.js'
import { tallyDate, formatDateKo } from '../lib/ranking.js'

// C2-S 날짜 상세: 가능 / 부분 가능(시간) / 불가 이름
export default function C2S() {
  const go = useGo()
  const { state: nav } = useLocation()
  const { state, top, isHost } = usePlan()
  const date = nav?.date ?? top[0]?.date ?? '2026-12-20'
  const t = tallyDate(state.responses, date)
  const rank = top.find((x) => x.date === date)?.rank

  const group = (label, names) => (
    <div>
      <p className="t-body" style={{ fontWeight: 700 }}>{label} {names.length}</p>
      {names.length ? (
        <div className="row" style={{ gap: 6, marginTop: 6 }}>{names.map((n) => <span key={n} className="nm">{n}</span>)}</div>
      ) : (
        <p className="t-caption">없음</p>
      )}
    </div>
  )

  return (
    <BottomSheet onClose={() => go('C2')}>
      <div className="row">
        {rank && <span className={`rk ${rank === 1 ? 'rk--1' : ''}`}>{rank}위</span>}
        <p className="t-title">{formatDateKo(date)}</p>
      </div>
      {group('가능', t.ok)}
      {group('부분 가능', t.part.map((p) => (p.from != null ? `${p.name} · ${p.from}시 이후` : p.name)))}
      {group('불가', t.no)}
      {t.tbd.length > 0 && group('일정 미정', t.tbd)}
      {isHost && (
        <Button variant="primary" onClick={() => go('C3', { state: { date } })}>이 날짜로 확정</Button>
      )}
    </BottomSheet>
  )
}

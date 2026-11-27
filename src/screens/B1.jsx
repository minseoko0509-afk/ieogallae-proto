import { Screen, Button, Bird, Avatar } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { usePlan } from '../lib/plan.js'
import { responseDraft } from '../lib/drafts.js'
import { formatDateKo } from '../lib/ranking.js'
import '../styles/screens.css'

export function PlanInfo({ EVENT }) {
  const s = EVENT.range.start.split('-').map(Number)
  const e = EVENT.range.end.split('-').map(Number)
  return (
    <div className="card stack" style={{ gap: 6 }}>
      <p className="t-body"><b>날짜</b> {s[1]}월 {s[2]}일 ~ {e[1]}월 {e[2]}일</p>
      <p className="t-body"><b>시간대</b> {EVENT.slot}</p>
      <p className="t-body"><b>마감</b> {formatDateKo(EVENT.deadline)} {EVENT.deadlineTime}</p>
    </div>
  )
}

// B1 초대 랜딩
export default function B1() {
  const go = useGo()
  const { EVENT, N, count, responded, meName } = usePlan()
  return (
    <Screen>
      <Bird mood="cheer" size={150} />
      <p className="t-title">{EVENT.host}가 {EVENT.title}에<br />초대했어</p>
      <PlanInfo EVENT={EVENT} />
      <div className="stack" style={{ gap: 8 }}>
        <p className="t-body" style={{ fontWeight: 700 }}>{N}명 중 {count}명 응답</p>
        <div className="row" style={{ gap: 6 }}>
          {responded.map((n) => <Avatar key={n} name={n} size={44} />)}
          {Array.from({ length: N - count }, (_, i) => <span key={i} className="avatar avatar--empty" aria-hidden="true" />)}
        </div>
      </div>
      <div className="bottom">
        <Button variant="primary" onClick={() => { responseDraft.reset(); responseDraft.set({ name: meName ?? '' }); go('B2') }}>
          내 일정 넣기
        </Button>
      </div>
    </Screen>
  )
}

import { Screen, Button, Bird, Avatar, Logo } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { usePlan } from '../lib/plan.js'
import { responseDraft } from '../lib/drafts.js'
import { formatDateKo } from '../lib/ranking.js'
import '../styles/screens.css'

export function PlanInfo({ EVENT }) {
  const s = EVENT.range.start.split('-').map(Number)
  const e = EVENT.range.end.split('-').map(Number)
  return (
    <dl className="info" style={{ margin: 0 }}>
      <div><dt>날짜 범위</dt><dd>{s[1]}월 {s[2]}일 ~ {e[1] === s[1] ? '' : `${e[1]}월 `}{e[2]}일</dd></div>
      <div><dt>시간대</dt><dd>{EVENT.slot}</dd></div>
      <div><dt>응답 마감</dt><dd>{formatDateKo(EVENT.deadline)}</dd></div>
    </dl>
  )
}

// B1 초대 랜딩
export default function B1() {
  const go = useGo()
  const { EVENT, N, count, need, responded, meName } = usePlan()
  return (
    <Screen>
      <div className="topbar topbar--plain"><Logo /></div>
      <div className="frame">
        <Bird mood="cheer" size={130} />
        <img src="/chars/duck.webp" alt="오리 친구" width="110" height="110" />
      </div>
      <p className="t-title">{EVENT.host}가 {EVENT.title}에 초대했어</p>
      <PlanInfo EVENT={EVENT} />
      <div className="card stack" style={{ gap: 12 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <p className="t-body" style={{ fontWeight: 700 }}>{N}명 중 {count}명 응답</p>
          <span className="t-caption">{count < need ? `70%까지 ${need - count}명` : '결과 공개됨'}</span>
        </div>
        <div className="row" style={{ gap: 8 }}>
          {responded.map((n) => <Avatar key={n} name={n} size={34} className="avatar--ring" />)}
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

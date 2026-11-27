import { Screen, Button, Avatar } from '../components/ui.jsx'
import { useToast } from '../components/Toast.jsx'
import { usePlan, usePlanNav } from '../lib/plan.js'

const MAX_SEATS = 15

// B6 제출 완료: 원형 식탁에 응답한 사람 수만큼 앉고 나머지 빈 의자
export default function B6() {
  const { N, count, need, responded } = usePlan()
  const { toPlan } = usePlanNav()
  const [toast, show] = useToast()
  const seats = Math.min(N, MAX_SEATS)
  const left = Math.max(0, need - count)
  const R = 120, C = 150

  return (
    <Screen>
      <div className="table" aria-label={`${seats}석 중 ${count}석 참`}>
        <div className="table__top" style={{ left: C - 90, top: C - 65 }} aria-hidden="true" />
        {Array.from({ length: seats }, (_, i) => {
          const a = (i / seats) * 2 * Math.PI - Math.PI / 2
          const on = i < count
          return (
            <span key={i} className={`seat ${on ? 'is-on' : ''}`} style={{ left: C + R * Math.cos(a) - 25, top: C + R * Math.sin(a) - 25 }}>
              {on && responded[i] ? <Avatar name={responded[i]} size={50} /> : ''}
            </span>
          )
        })}
      </div>
      <p className="t-title" style={{ textAlign: 'center' }}>자리 잡았어!<br />{N}명 중 {count}명 왔어</p>
      <p className="t-caption" style={{ textAlign: 'center' }}>
        {left ? `${left}명만 더 오면 Top3 공개` : 'Top3 공개됐어! 현황에서 확인해봐'}
      </p>
      <div className="bottom">
        <Button variant="primary" onClick={() => toPlan()}>현황 보기</Button>
        <Button onClick={() => show('카톡으로 공유했어 (데모)')}>다시 공유</Button>
      </div>
      {toast}
    </Screen>
  )
}

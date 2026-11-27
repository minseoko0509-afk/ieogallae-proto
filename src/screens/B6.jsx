import { Screen, Button, Avatar, TopBar } from '../components/ui.jsx'
import { useToast } from '../components/Toast.jsx'
import { usePlan, usePlanNav } from '../lib/plan.js'

const MAX_SEATS = 15

// B6 제출 완료: 원형 책상에 응답한 사람 수만큼 앉고 나머지는 빈 의자
export default function B6() {
  const { N, count, need, responded, EVENT } = usePlan()
  const { toPlan } = usePlanNav()
  const [toast, show] = useToast()
  const seats = Math.min(N, MAX_SEATS)
  const left = Math.max(0, need - count)
  const RX = 118, RY = 96, CX = 150, CY = 118
  const size = seats > 8 ? 44 : 58

  return (
    <Screen>
      <TopBar back={false} title={<span style={{ fontWeight: 500, fontSize: 12 }}>{EVENT.title}</span>} />
      <div className="frame table-frame" aria-label={`${seats}석 중 ${count}석 참`}>
        <div className="table">
          <img className="table__img" src="/chars/table.webp" alt="원형 책상" />
          {Array.from({ length: seats }, (_, i) => {
            const a = (i / seats) * 2 * Math.PI - Math.PI / 2
            const on = i < count && responded[i]
            return (
              <span key={i} className="seat" style={{ left: CX + RX * Math.cos(a) - size / 2, top: CY + RY * Math.sin(a) - size / 2, width: size, height: size }}>
                {on ? <Avatar name={responded[i]} size={size} /> : <img src="/chars/stool.webp" alt="빈 의자" width={size * 0.8} />}
              </span>
            )
          })}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p className="t-title">자리 잡았어! {N}명 중에 {count}명이 왔네.</p>
        <p className="t-body" style={{ marginTop: 4 }}>
          {left ? `${left}명만 더 오면 날짜 Top3 공개` : 'Top3 공개됐어! 현황에서 확인해봐'}
        </p>
      </div>
      <div className="bottom">
        <Button variant="primary" onClick={() => toPlan()}>현황 보기</Button>
        <Button onClick={() => show('카톡으로 공유했어 (데모)')}>다시 공유</Button>
      </div>
      {toast}
    </Screen>
  )
}

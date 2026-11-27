import { Screen, Button, Bird } from '../components/ui.jsx'
import StatusTop from '../components/StatusTop.jsx'
import { useToast } from '../components/Toast.jsx'
import { usePlan } from '../lib/plan.js'

// C1 70% 미만: Top3 블러 + 자물쇠 (주도자도 동일, 미리보기 없음)
export default function C1() {
  const { count, need, N, actions } = usePlan()
  const [toast, show] = useToast()
  const left = Math.max(0, need - count)
  return (
    <Screen>
      <StatusTop onShare={() => show('카톡으로 공유했어 (데모)')} />
      <div className="card locked" style={{ minHeight: 200, justifyContent: 'center' }} aria-label="Top3 잠김">
        {[1, 2, 3].map((r) => (
          <div key={r} className="row" style={{ flexWrap: 'nowrap' }} aria-hidden="true">
            <span className="rk">{r}위</span><span className="locked__bar" />
          </div>
        ))}
        <div className="locked__cover">
          <Bird mood="sleepy" size={84} round />
          <p className="t-body" style={{ fontWeight: 700 }}>{left}명만 더 답하면 Top3 공개!</p>
        </div>
      </div>
      {count < N && (
        <Button variant="text" style={{ alignSelf: 'center' }} onClick={() => actions.setResponseCount(count + 1)}>
          친구 한 명 더 답한 걸로 보기 (데모)
        </Button>
      )}
      {toast}
    </Screen>
  )
}

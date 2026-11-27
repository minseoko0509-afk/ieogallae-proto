import { Screen, Button } from '../components/ui.jsx'
import StatusTop from '../components/StatusTop.jsx'
import { useToast } from '../components/Toast.jsx'
import { usePlan } from '../lib/plan.js'
import { formatDateKo, describeTally } from '../lib/ranking.js'
import { LockIcon } from './B3.jsx'

// C1 70% 미만: Top3 블러 + 자물쇠 (주도자도 동일, 미리보기 없음)
export default function C1() {
  const { count, need, N, actions, top } = usePlan()
  const [toast, show] = useToast()
  const left = Math.max(0, need - count)
  return (
    <Screen>
      <StatusTop onShare={() => show('카톡으로 공유했어 (데모)')} />
      <div className="card locked" style={{ minHeight: 200, justifyContent: 'center' }} aria-label="Top3 잠김">
        {[0, 1, 2].map((i) => (
          <div key={i} className="row" style={{ flexWrap: 'nowrap', filter: 'blur(3px)' }} aria-hidden="true">
            <span className="rk">{i + 1}위</span>
            <span style={{ flex: 1 }}>{top[i] ? formatDateKo(top[i].date) : '12월 20일 (일)'}</span>
            <span className="t-caption">{top[i] ? describeTally(top[i]) : '가능 3명'}</span>
          </div>
        ))}
        <div className="locked__cover">
          <span className="lock-badge"><LockIcon /></span>
          <p className="t-body" style={{ fontWeight: 700 }}>{left}명만 더 답하면 날짜 Top3 공개!</p>
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

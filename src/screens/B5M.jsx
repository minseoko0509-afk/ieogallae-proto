import { Screen, Button } from '../components/ui.jsx'
import MonthGrid from '../components/MonthGrid.jsx'
import { useGo } from '../router/useGo.js'
import { useStore, responseDraft, finalizeDays } from '../lib/drafts.js'
import { useSubmitResponse } from '../lib/plan.js'
import { MARK, LABEL, Legend } from './B5.jsx'

// B5-M 직접 체크: 전부 가능에서 시작. 탭 = 불가 토글, 길게 누르기 = 부분 가능(시간 선택 시트)
export default function B5M() {
  const go = useGo()
  const [draft, set] = useStore(responseDraft)
  const submit = useSubmitResponse()

  const tap = (k) => {
    const cur = draft.days[k]
    set({ days: { ...draft.days, [k]: { ...cur, s: cur.s === 'no' ? 'ok' : 'no', from: undefined } } })
  }

  return (
    <Screen>
      <p className="t-title">전부 되는 걸로 해뒀어.<br />안 되는 날만 콕 찍어줘</p>
      <p className="t-caption">탭: 불가 ✕ 토글 · 길게 누르기: 시간 맞으면 돼요</p>
      <Legend />
      <MonthGrid
        renderCell={(k, d) => {
          const v = draft.days[k]
          return { mark: MARK[v.s], className: `mcell--${v.s}`, label: `12월 ${d}일 ${LABEL[v.s]}` }
        }}
        onTap={tap}
        onLongPress={(k) => go('B5-S', { state: { date: k, back: 'B5-M' } })}
      />
      <div className="bottom">
        <Button variant="primary" onClick={() => { submit(finalizeDays(draft.days)); go('B6') }}>제출</Button>
      </div>
    </Screen>
  )
}

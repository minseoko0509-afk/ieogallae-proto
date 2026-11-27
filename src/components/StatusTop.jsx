import { Button } from './ui.jsx'
import { useGo } from '../router/useGo.js'
import { usePlan, summarize } from '../lib/plan.js'
import { responseDraft } from '../lib/drafts.js'
import '../styles/screens.css'

// C 공통 상단: 응답 n/N 진행 바 + 70% 기준선, 응답자 칩, 다시 공유, 내 응답 카드, 주도자 미응답 배너
export default function StatusTop({ onShare, compact }) {
  const go = useGo()
  const { N, count, need, responded, missing, isHost, meName, myResponse, state } = usePlan()
  const pct = Math.min(100, (count / N) * 100)
  const linePct = (need / N) * 100
  const canEdit = !state.confirmed

  return (
    <>
      <div className="card stack" style={{ borderColor: 'var(--c-lav-3)', gap: 10 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="t-body" style={{ fontWeight: 700 }}>응답 {count} / {N}</span>
          {compact && missing.length > 0 ? (
            <span className="t-caption">미응답: {missing.join(', ')}</span>
          ) : (
            <Button variant="text" onClick={onShare}>다시 공유</Button>
          )}
        </div>
        {!compact && (
          <>
            <div className="progress" role="progressbar" aria-valuenow={count} aria-valuemin={0} aria-valuemax={N}>
              <div className="progress__fill" style={{ width: `${pct}%` }} />
              <div className="progress__line" style={{ left: `calc(${linePct}% - 1px)` }} />
            </div>
            <p className="t-caption" style={{ paddingLeft: `max(0px, calc(${linePct}% - 70px))` }}>여기 넘으면 결과 공개</p>
            <div className="row" style={{ gap: 6 }}>
              {responded.map((n) => <span key={n} className="nm">{n}</span>)}
            </div>
          </>
        )}
      </div>
      {myResponse && (
        <div className="card row" style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <div>
            <p className="t-caption">내 응답</p>
            <p className="t-body">{summarize(myResponse)}</p>
          </div>
          {canEdit && <Button style={{ width: 64, height: 40 }} onClick={() => { responseDraft.set({ name: meName, days: { ...myResponse.days } }); go('B5') }}>수정</Button>}
        </div>
      )}
      {isHost && !myResponse && (
        <div className="card note row" style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <p className="t-body">너도 일정 넣어줘</p>
          <Button style={{ width: 'auto', height: 40, padding: '0 12px', fontSize: 14 }} onClick={() => go('B3')}>내 일정 넣기</Button>
        </div>
      )}
    </>
  )
}

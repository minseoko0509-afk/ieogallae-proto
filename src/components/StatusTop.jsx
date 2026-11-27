import { Button, Avatar, TopBar } from './ui.jsx'
import { useGo } from '../router/useGo.js'
import { usePlan, summarize } from '../lib/plan.js'
import { responseDraft } from '../lib/drafts.js'
import '../styles/screens.css'

// C 공통 상단: 응답 n/N 진행 바 + 70% 기준선, 응답자 칩, 다시 공유, 내 응답 카드, 주도자 미응답 배너
export default function StatusTop({ onShare, compact }) {
  const go = useGo()
  const { N, count, need, responded, missing, isHost, meName, myResponse, state, EVENT } = usePlan()
  const pct = Math.min(100, (count / N) * 100)
  const linePct = (need / N) * 100
  const canEdit = !state.confirmed

  return (
    <>
      <TopBar back={false} title={EVENT.title} />
      <div className={`card stack ${compact ? '' : 'card--shadow'}`} style={{ gap: 10, padding: compact ? '10px 14px' : 16, borderWidth: compact ? 2 : undefined }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className={compact ? 't-body' : 't-title'} style={{ fontWeight: 700 }}>응답 {count} / {N}</span>
          {compact && missing.length > 0 ? (
            <span className="t-caption">미응답: {missing.join(', ')}</span>
          ) : (
            <Button style={{ width: 'auto', height: 36, minHeight: 36, padding: '0 10px', fontSize: 12 }} onClick={onShare}>다시 공유</Button>
          )}
        </div>
        {!compact && (
          <>
            <div className="progress" role="progressbar" aria-valuenow={count} aria-valuemin={0} aria-valuemax={N}>
              <div className="progress__fill" style={{ width: `${pct}%` }} />
              <div className="progress__line" style={{ left: `calc(${linePct}% - 1px)` }} />
            </div>
            <p className="t-caption" style={{ textAlign: 'right', color: 'var(--c-deep)', marginTop: -4 }}>↑ 여기 넘으면 결과 공개</p>
            <div className="row" style={{ gap: 6 }}>
              {responded.map((n) => <span key={n} className="nm nm--avatar"><Avatar name={n} size={22} />{n}</span>)}
            </div>
          </>
        )}
      </div>
      {myResponse && (
        <div className="card card--shadow row" style={{ justifyContent: 'space-between', flexWrap: 'nowrap', padding: '12px 14px' }}>
          <div>
            <p className="t-body" style={{ fontWeight: 700 }}>내 응답</p>
            <p className="t-caption" style={{ color: 'var(--c-deep)' }}>{summarize(myResponse)}</p>
          </div>
          {canEdit && <Button style={{ width: 52, height: 36, minHeight: 36, padding: 0, fontSize: 12 }} onClick={() => { responseDraft.set({ name: meName, days: { ...myResponse.days } }); go('B5') }}>수정</Button>}
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

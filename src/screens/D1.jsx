import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Screen, Button, Illust } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { usePlan } from '../lib/plan.js'
import { tallyDate, formatDateKo } from '../lib/ranking.js'
import { googleCalendarUrl, downloadIcs } from '../lib/calendar.js'

export function useConfirmed() {
  const p = usePlan()
  const c = p.state.confirmed ?? { date: p.top[0]?.date ?? '2026-12-20', time: '18:00' }
  const t = tallyDate(p.state.responses, c.date)
  const attend = t.ok.length + t.part.length
  const event = { id: p.EVENT.id ?? 'demo', title: p.EVENT.title, date: c.date, time: c.time, details: '이어갈래?로 잡은 약속' }
  return { ...p, c, attend, event }
}

// D1 확정 화면 /p/{id}/c
export default function D1() {
  const go = useGo()
  const { state: nav } = useLocation()
  const { c, attend, N, EVENT, isHost, actions, event } = useConfirmed()

  // 확정 수정 후 돌아오면 공유 시트 자동 표시
  useEffect(() => {
    if (nav?.justChanged) go('D2', { replace: true, state: { auto: true } })
  }, [nav?.justChanged])

  return (
    <Screen>
      <div className="card confirm-card">
        <Illust label="뱁새 축하 일러스트" h={170} />
        <div className="confirm-card__body">
          <p className="t-title">{EVENT.title} 확정!</p>
          <p className="t-body">{formatDateKo(c.date)} {c.time}</p>
          <p className="t-caption">참석 {attend} / {N} · 우리 계속 이어가자</p>
        </div>
      </div>
      <div className="row" style={{ flexWrap: 'nowrap' }}>
        <Button style={{ flex: 1 }} onClick={() => window.open(googleCalendarUrl(event), '_blank', 'noopener')}>
          구글 캘린더에 추가
        </Button>
        <Button style={{ flex: 1 }} onClick={() => downloadIcs(event, `ieogallae-${c.date.replaceAll('-', '')}.ics`)}>
          폰 캘린더 (.ics)
        </Button>
      </div>
      {isHost && (
        <div className="row" style={{ flexWrap: 'nowrap' }}>
          <Button style={{ flex: 1, height: 44 }} onClick={() => go('C3')}>확정 수정</Button>
          <Button
            style={{ flex: 1, height: 44 }}
            onClick={() => {
              actions.cancelConfirm()
              go('C2', { state: { cancelled: true } })
            }}
          >
            확정 취소
          </Button>
        </div>
      )}
      <div className="bottom">
        <Button variant="primary" onClick={() => go('D2')}>공유하기</Button>
      </div>
    </Screen>
  )
}

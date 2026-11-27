import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Screen, Button, Modal, TopBar } from '../components/ui.jsx'
import { usePlan, usePlanNav } from '../lib/plan.js'
import { formatDateKo, describeTally } from '../lib/ranking.js'

// C3 확정 설정 (주도자): Top3 라디오 + 시간 → 확정
export default function C3() {
  const { state: nav } = useLocation()
  const { state, actions, top, missing } = usePlan()
  const [date, setDate] = useState(nav?.date ?? state.confirmed?.date ?? top[0]?.date)
  const [time, setTime] = useState(state.confirmed?.time ?? '18:00')
  const [ask, setAsk] = useState(false)
  const { toConfirm } = usePlanNav()

  const doConfirm = () => {
    actions.confirm({ date, time })
    toConfirm({ state: { justChanged: !!state.confirmed } })
  }

  return (
    <Screen>
      <TopBar meta="주도자 전용" />
      <p className="t-title">언제로 확정할까?</p>
      <div className="stack" style={{ gap: 8 }} role="radiogroup" aria-label="확정 날짜">
        {top.map((t) => (
          <label key={t.date} className={`card choice card--shadow ${date === t.date ? 'is-on' : ''}`} style={{ padding: '12px 14px', borderWidth: 2, boxShadow: 'var(--shadow-px-s)' }}>
            <span style={{ flex: 1 }}>
              <span className="row" style={{ gap: 8 }}>
                <span className={`rk ${t.rank === 1 ? 'rk--1' : ''}`}>{t.rank === 1 ? '♛ ' : ''}{t.rank}위</span>
                <span className="t-body" style={{ fontWeight: 700 }}>{formatDateKo(t.date)}</span>
              </span>
              <span className="t-caption" style={{ display: 'block', marginTop: 6, color: 'var(--c-deep)' }}>{describeTally(t, true)}</span>
            </span>
            <input type="radio" name="c3" checked={date === t.date} onChange={() => setDate(t.date)} />
          </label>
        ))}
        {top.length === 0 && <p className="t-caption">아직 고를 날짜가 없어</p>}
      </div>
      <div>
        <label className="field-label" htmlFor="c3t">만나는 시간</label>
        <input id="c3t" className="input" type="time" step="1800" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div className="bottom">
        <Button variant="primary" disabled={!date || !time} onClick={() => (missing.length ? setAsk(true) : doConfirm())}>
          확정하기
        </Button>
      </div>
      {ask && (
        <Modal
          title={`아직 ${josa(missing)} 답 안 했어. 그래도 확정할까?`}
          actions={[
            { label: '기다릴래', variant: 'secondary', onClick: () => setAsk(false) },
            { label: '확정할래', variant: 'primary', onClick: doConfirm },
          ]}
        />
      )}
    </Screen>
  )
}

// 주격 조사: "수빈이" / "민서가" / "수빈이랑 하린이" / "수빈 외 2명이"
const hasBatchim = (n) => {
  const c = n.charCodeAt(n.length - 1) - 0xac00
  return c >= 0 && c <= 11171 && c % 28 !== 0
}
function josa(names) {
  const subj = (n) => n + (hasBatchim(n) ? '이' : '가')
  if (names.length === 1) return subj(names[0])
  if (names.length === 2) return `${names[0]}${hasBatchim(names[0]) ? '이랑' : '랑'} ${subj(names[1])}`
  return `${names[0]} 외 ${names.length - 1}명이`
}

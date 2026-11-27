import { Screen, Button, Steps, TopBar } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useStore, planDraft } from '../lib/drafts.js'

// A3 마감·알림
export default function A3() {
  const go = useGo()
  const [d, set] = useStore(planDraft)
  const hasNotify = (d.notify.email && d.email.trim()) || d.notify.push

  return (
    <Screen>
      <TopBar meta="3 / 4" />
      <Steps current={3} />
      <p className="t-title">언제까지 답 받을까?</p>
      <div>
        <label className="field-label" htmlFor="a3d">응답 마감일</label>
        <input id="a3d" className="input" type="date" value={d.deadline} max={d.end}
          onChange={(e) => set({ deadline: e.target.value })} />
      </div>
      <div className="toggle-row">
        <span className="t-body" id="a3-tl">마감 시각도 정할래</span>
        <button type="button" role="switch" aria-checked={d.timeOn} aria-labelledby="a3-tl"
          className={`toggle ${d.timeOn ? 'is-on' : ''}`} onClick={() => set({ timeOn: !d.timeOn, time: '23:59' })} />
      </div>
      {d.timeOn ? (
        <input className="input" type="time" aria-label="마감 시각" value={d.time} onChange={(e) => set({ time: e.target.value })} />
      ) : (
        <p className="t-caption">안 정하면 마감일 23:59에 마감돼</p>
      )}
      <div className="card stack" style={{ gap: 12 }}>
        <div>
          <p className="t-body" style={{ fontWeight: 700 }}>결과 나오면 알려줄게</p>
          <p className="t-caption">70% 모였을 때 · 전원 응답 · 마감 때</p>
        </div>
        <div className="row" style={{ flexWrap: 'nowrap' }}>
          <Button variant={d.notify.email ? 'primary' : 'secondary'} style={{ flex: 1, height: 44, boxShadow: 'none' }} aria-pressed={d.notify.email}
            onClick={() => set({ notify: { ...d.notify, email: !d.notify.email } })}>
            이메일로 받기
          </Button>
          <Button variant={d.notify.push ? 'primary' : 'secondary'} style={{ flex: 1, height: 44, boxShadow: 'none' }} aria-pressed={d.notify.push}
            onClick={() => { set({ notify: { ...d.notify, push: true } }); go('B5-T', { state: { returnTo: 'A3' } }) }}>
            {d.notify.push ? '웹 푸시 켜짐' : '웹 푸시로 받기'}
          </Button>
        </div>
        {d.notify.email && (
          <input id="a3e" className="input" type="email" aria-label="이메일" placeholder="name@example.com" value={d.email}
            onChange={(e) => set({ email: e.target.value })} />
        )}
      </div>
      <div className="bottom">
        <Button variant="primary" onClick={() => go(hasNotify ? 'A3-C' : 'A3-M')}>초대장 꾸미러 가기</Button>
      </div>
    </Screen>
  )
}

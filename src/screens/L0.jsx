import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, Button, Bird, Logo } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useAppState } from '../state/AppState.jsx'
import { EVENT } from '../state/sampleData.js'
import { planDraft, responseDraft } from '../lib/drafts.js'
import S0 from './S0.jsx'

const STEPS = ['링크 만들어 단톡방에 공유', '친구들은 달력 캡처만 올리기', '70% 모이면 Top3 공개']

// 첫 진입에만 스플래시(S0)를 덮어 보여준다
let splashShown = false

// L0 랜딩 /
export default function L0() {
  const go = useGo()
  const navigate = useNavigate()
  const { actions } = useAppState()
  const [splash] = useState(() => { const s = !splashShown; splashShown = true; return s })

  const start = () => {
    actions.reset()
    planDraft.reset()
    responseDraft.reset()
    go('A1')
  }
  const asFriend = () => {
    actions.reset()
    actions.setRole('new')
    responseDraft.reset()
    navigate(`/p/${EVENT.id}`)
  }

  return (
    <Screen>
      <div className="topbar topbar--plain"><Logo /></div>
      <div className="frame hero-frame">
        <Bird mood="hello" size={150} />
        <span className="bubble">안녕, 난 삐루야!</span>
      </div>
      <p className="t-title">올해 못 본 친구와의 인연,<br />더 이어갈래?</p>
      <div className="stack" style={{ gap: 8 }}>
        {STEPS.map((t, i) => (
          <div key={t} className="step-row"><span className="step-num">{i + 1}</span><span>{t}</span></div>
        ))}
      </div>
      <div className="bottom">
        <Button variant="primary" onClick={start}>약속 만들기</Button>
        <Button variant="text" onClick={asFriend}>초대받은 친구로 둘러보기 (데모)</Button>
      </div>
      {splash && <S0 overlay />}
    </Screen>
  )
}

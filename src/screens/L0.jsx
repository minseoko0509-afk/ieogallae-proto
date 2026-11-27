import { useNavigate } from 'react-router-dom'
import { Screen, Button, Bird } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useAppState } from '../state/AppState.jsx'
import { EVENT } from '../state/sampleData.js'
import { planDraft, responseDraft } from '../lib/drafts.js'
import '../styles/screens.css'

// L0 랜딩 /
export default function L0() {
  const go = useGo()
  const navigate = useNavigate()
  const { actions } = useAppState()

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
    <Screen className="landing">
      <div className="landing__hero">
        <Bird mood="hello" size={150} round />
        <h1 className="logo">이어갈래?</h1>
        <p className="landing__tag">올해 못 본 친구, 이어갈래?<br />70%만 답하면 날짜 나와</p>
      </div>
      <div className="bottom">
        <Button variant="primary" onClick={start}>약속 만들기</Button>
        <Button variant="soft" onClick={asFriend}>초대받은 친구로 둘러보기 (데모)</Button>
      </div>
    </Screen>
  )
}

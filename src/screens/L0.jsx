import { useNavigate } from 'react-router-dom'
import { Screen, Button, Illust } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useAppState } from '../state/AppState.jsx'
import { EVENT } from '../state/sampleData.js'
import { planDraft, responseDraft } from '../lib/drafts.js'

const STEPS = ['링크 만들어 단톡방에 공유', '친구들은 달력 캡처만 올리기', '70% 모이면 Top3 공개']

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
    <Screen>
      <Illust label="뱁새 일러스트" h={180} />
      <p className="t-title">올해 못 본 친구, 이어갈래?<br />70%만 답하면 날짜 나와</p>
      <div className="stack" style={{ gap: 10 }}>
        {STEPS.map((t, i) => (
          <div key={t} className="card row" style={{ gap: 12, flexWrap: 'nowrap' }}>
            <Illust label={String(i + 1)} h={44} w={44} style={{ flex: 'none', padding: 0 }} />
            <p className="t-body">{t}</p>
          </div>
        ))}
      </div>
      <div className="bottom">
        <Button variant="primary" onClick={start}>약속 만들기</Button>
        <Button variant="text" onClick={asFriend}>초대받은 친구로 둘러보기 (데모)</Button>
      </div>
    </Screen>
  )
}

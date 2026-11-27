import { useState } from 'react'
import { Screen, Button, Modal, TopBar } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { usePlan, useSubmitResponse } from '../lib/plan.js'
import { useStore, responseDraft } from '../lib/drafts.js'

// B2 이름 입력. 같은 이름이 이미 답했으면 모달
export default function B2() {
  const go = useGo()
  const { state, isHost, EVENT } = usePlan()
  const [draft, set] = useStore(responseDraft)
  const submit = useSubmitResponse()
  const [tried, setTried] = useState(false)
  const [dup, setDup] = useState(false)
  const name = draft.name.trim()

  const proceed = () => {
    if (draft.late) {
      submit(draft.days) // B1-L: Top3만 체크했으면 바로 제출
      go('B6')
    } else go('B3')
  }
  const next = () => {
    setTried(true)
    if (!name) return
    const exists = state.responses.some((r) => r.name === name)
    // 주도자가 자기 이름으로 들어온 건 중복 아님
    if (exists && !(isHost && name === EVENT.host)) setDup(true)
    else proceed()
  }
  const mine = () => {
    const r = state.responses.find((x) => x.name === name)
    set({ days: { ...r.days }, late: false })
    go('B5')
  }

  return (
    <Screen>
      <TopBar />
      <p className="t-title">이름이 뭐야?</p>
      <div>
        <label className="field-label" htmlFor="b2n">이름</label>
        <input id="b2n" className="input" maxLength={20} value={draft.name} placeholder="예: 지운"
          onChange={(e) => set({ name: e.target.value })} aria-invalid={tried && !name} />
        {tried && !name && <p className="err">이름을 적어줘</p>}
      </div>
      <p className="t-caption" style={{ marginTop: -10 }}>단톡방에서 부르는 이름이면 돼</p>
      <div className="bottom"><Button variant="primary" onClick={next}>다음</Button></div>
      {dup && (
        <Modal
          title={`'${name}' 이름으로 응답이 이미 있어`}
          actions={[
            { label: '다른 이름 쓸래', variant: 'secondary', onClick: () => { setDup(false); set({ name: '' }) } },
            { label: '나 맞아, 수정할래', variant: 'primary', onClick: mine },
          ]}
        >
          <p className="t-caption">같은 사람이면 이전 응답을 불러와서 고칠 수 있어</p>
        </Modal>
      )}
    </Screen>
  )
}

// C3-D 마감 후 70% 미만 (주도자, 관리 링크로 들어올 때마다). 뒤에는 C1이 깔린다 (registry base).
//   모달 1 "마감됐는데 n명만 답했어. 이대로 확정할까?" [아니오] / [예 → Top3 공개]
//   모달 2 "확정 안 하면 공유 링크가 안 만들어져. 그래도 미룰까?" [미룰래 → C1 유지] / [확정할래 → C3]
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useAppState } from '../state/AppState.jsx'
import { EVENT } from '../state/sampleData.js'
import { responseCount } from '../state/selectors.js'

export default function C3D() {
  const { state, actions } = useAppState()
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const go = useGo()
  const toPlan = () => navigate(`/p/${EVENT.id}`) // 상태대로 다시 분기 (예 → C2, 미룰래 → C1)

  if (step === 1) {
    return (
      <Modal
        title={<>마감됐는데 {responseCount(state)}명만 답했어.<br />이대로 확정할까?</>}
        actions={[
          { label: '아니오', variant: 'secondary', onClick: () => setStep(2) },
          { label: '예, Top3 볼래', variant: 'primary', onClick: () => { actions.revealEarly(); toPlan() } },
        ]}
      />
    )
  }
  return (
    <Modal
      title="확정 안 하면 공유 링크가 안 만들어져. 그래도 미룰까?"
      actions={[
        { label: '미룰래', variant: 'secondary', onClick: () => { actions.deferC3D(); toPlan() } },
        { label: '확정할래', variant: 'primary', onClick: () => { actions.revealEarly(); go('C3') } },
      ]}
    />
  )
}

import { Modal } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'

// A3-M 알림 미설정 확인 모달
export default function A3M() {
  const go = useGo()
  return (
    <Modal
      title="결과 나와도 알림을 못 받을 수 있어. 괜찮아?"
      actions={[
        { label: '응, 괜찮아', variant: 'secondary', onClick: () => go('A3-C') },
        { label: '알림 설정할래', variant: 'primary', onClick: () => go('A3') },
      ]}
    >
      <p className="t-caption">관리 링크를 잃어버리면 확정을 못 할 수도 있어</p>
    </Modal>
  )
}

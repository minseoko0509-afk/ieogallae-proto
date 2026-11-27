import { getScreen } from '../screens/registry.js'
import { useGo } from '../router/useGo.js'
import { Screen, Button, Modal, BottomSheet, Steps } from './ui.jsx'

// 아직 구현 안 된 화면 자리. 실제 화면을 만들면 이 컴포넌트를 지우고 교체한다.
// notes: 와이어프레임에서 옮길 요소 메모, next: [{ label, to }] 이동 버튼
export default function Placeholder({ id, notes = [], next = [] }) {
  const s = getScreen(id)
  const go = useGo()
  const body = (
    <>
      {s.step && <Steps current={s.step} />}
      <div className="placeholder__meta">
        <p className="t-caption">{s.group === '진입' ? '진입' : `${s.group} 그룹`} · {s.path}</p>
        <p className="t-title">{s.title}</p>
      </div>
      {notes.length > 0 && (
        <div className="placeholder__note">
          <p className="t-caption">구현할 요소</p>
          <ul>{notes.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
      )}
    </>
  )
  const buttons = next.map((n, i) => (
    <Button key={n.to + i} variant={i === 0 ? 'primary' : 'secondary'} onClick={() => go(n.to)}>
      {n.label}
    </Button>
  ))

  if (s.kind === 'modal') {
    return (
      <Modal title={s.title} actions={next.map((n, i) => ({ label: n.label, variant: i === next.length - 1 ? 'primary' : 'secondary', onClick: () => go(n.to) }))}>
        <p className="t-caption">{id} 모달 자리</p>
      </Modal>
    )
  }
  if (s.kind === 'sheet') {
    return (
      <BottomSheet onClose={() => go(s.base)}>
        {body}
        <div className="stack">{buttons}</div>
      </BottomSheet>
    )
  }
  return (
    <Screen>
      {body}
      <div className="bottom">{buttons}</div>
    </Screen>
  )
}

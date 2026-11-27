import Placeholder from '../components/Placeholder.jsx'

// A3-M — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function A3M() {
  return (
    <Placeholder
      id="A3-M"
      notes={[
    "\"결과 나와도 알림을 못 받을 수 있어. 괜찮아?\"",
      ]}
      next={[
    { label: "알림 설정할래", to: "A3" },
    { label: "괜찮아, 만들기", to: "A4" },
      ]}
    />
  )
}

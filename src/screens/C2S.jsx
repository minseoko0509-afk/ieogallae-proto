import Placeholder from '../components/Placeholder.jsx'

// C2-S — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function C2S() {
  return (
    <Placeholder
      id="C2-S"
      notes={[
    "가능 / 부분 가능(시간) / 불가 이름",
      ]}
      next={[
    { label: "이 날짜로 확정(주도자)", to: "C3" },
      ]}
    />
  )
}

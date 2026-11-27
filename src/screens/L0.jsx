import Placeholder from '../components/Placeholder.jsx'

// L0 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function L0() {
  return (
    <Placeholder
      id="L0"
      notes={[
    "[뱁새] 일러스트",
    "\"올해 못 본 친구, 이어갈래? 70%만 답하면 날짜 나와\"",
    "3단계 카드",
      ]}
      next={[
    { label: "약속 만들기", to: "A1" },
      ]}
    />
  )
}

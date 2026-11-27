import Placeholder from '../components/Placeholder.jsx'

// A2 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function A2() {
  return (
    <Placeholder
      id="A2"
      notes={[
    "진행 바 2/4",
    "날짜 범위 달력(최대 5주)",
    "시간대 칩 점심/저녁/상관없음",
      ]}
      next={[
    { label: "다음", to: "A3" },
      ]}
    />
  )
}

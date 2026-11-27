import Placeholder from '../components/Placeholder.jsx'

// B4 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function B4() {
  return (
    <Placeholder
      id="B4"
      notes={[
    "뱁새 쪼는 로딩",
    "\"뱁새가 열심히 쪼는 중…(최대 10초)\"",
    "월 인식 실패 → \"이거 몇 월이야?\" 칩",
      ]}
      next={[
    { label: "성공", to: "B5" },
    { label: "전체 실패", to: "B5-M" },
      ]}
    />
  )
}

import Placeholder from '../components/Placeholder.jsx'

// B3 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function B3() {
  return (
    <Placeholder
      id="B3"
      notes={[
    "월간 달력 캡처 1~3장(썸네일, 삭제)",
    "예시 이미지",
    "고지 \"캡처는 분석 후 바로 지워…\"",
      ]}
      next={[
    { label: "분석하기", to: "B4" },
    { label: "캘린더 안 써요", to: "B5-M" },
      ]}
    />
  )
}

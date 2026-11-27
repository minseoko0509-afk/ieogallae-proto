import Placeholder from '../components/Placeholder.jsx'

// D1 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function D1() {
  return (
    <Placeholder
      id="D1"
      notes={[
    "확정 카드(12월 20일 (일) 18:00, 참석 5/6)",
    "[구글 캘린더에 추가] [폰 캘린더(.ics)]",
    "주도자: [확정 수정] [확정 취소]",
      ]}
      next={[
    { label: "공유하기", to: "D2" },
    { label: "확정 수정(주도자)", to: "C3" },
      ]}
    />
  )
}

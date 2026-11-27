import Placeholder from '../components/Placeholder.jsx'

// D2 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function D2() {
  return (
    <Placeholder
      id="D2"
      notes={[
    "문구 편집(기본 \"12/20(일) 18시 연말 방어회 모임 확정!…\")",
    "[카톡 공유] [링크 복사]",
      ]}
      next={[
    { label: "닫기", to: "D1" },
      ]}
    />
  )
}

import Placeholder from '../components/Placeholder.jsx'

// C1 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function C1() {
  return (
    <Placeholder
      id="C1"
      notes={[
    "C 공통 상단(진행 바 + 70% 기준선, 이름 칩, 내 응답 카드)",
    "Top3 블러 + 자물쇠",
    "\"1명만 더 답하면 Top3 공개!\"",
      ]}
      next={[
    { label: "(응답 70% 도달 시)", to: "C2" },
      ]}
    />
  )
}

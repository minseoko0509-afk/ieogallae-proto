import Placeholder from '../components/Placeholder.jsx'

// B6 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function B6() {
  return (
    <Placeholder
      id="B6"
      notes={[
    "원형 식탁, 응답 수만큼 착석(최대 15석)",
    "\"자리 잡았어! 6명 중 4명 왔어\"",
      ]}
      next={[
    { label: "현황 보기", to: "C1" },
    { label: "다시 공유", to: "B6" },
      ]}
    />
  )
}

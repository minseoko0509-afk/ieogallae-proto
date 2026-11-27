import Placeholder from '../components/Placeholder.jsx'

// B2 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function B2() {
  return (
    <Placeholder
      id="B2"
      notes={[
    "이름 입력",
    "같은 이름 모달 [내가 맞아, 수정할래] / [다른 이름 쓸래]",
      ]}
      next={[
    { label: "다음", to: "B3" },
      ]}
    />
  )
}

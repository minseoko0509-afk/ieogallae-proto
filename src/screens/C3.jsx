import Placeholder from '../components/Placeholder.jsx'

// C3 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function C3() {
  return (
    <Placeholder
      id="C3"
      notes={[
    "Top3 라디오",
    "시간 입력",
    "응답 < N이면 모달 \"아직 수빈이 답 안 했어…\"",
      ]}
      next={[
    { label: "확정하기", to: "D1" },
      ]}
    />
  )
}

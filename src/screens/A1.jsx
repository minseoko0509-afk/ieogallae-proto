import Placeholder from '../components/Placeholder.jsx'

// A1 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function A1() {
  return (
    <Placeholder
      id="A1"
      notes={[
    "진행 바 1/4",
    "약속 이름(20자, 카운터)",
    "내 이름(20자)",
    "인원 N 스테퍼 2~15",
    "\"N명 중 n명(70%)이 답하면 결과가 나와\"",
    "빈칸 안내 문구",
      ]}
      next={[
    { label: "다음", to: "A2" },
      ]}
    />
  )
}

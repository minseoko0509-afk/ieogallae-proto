import Placeholder from '../components/Placeholder.jsx'

// B5-S — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function B5S() {
  return (
    <Placeholder
      id="B5-S"
      notes={[
    "날짜 제목",
    "읽힌 일정 + \"너만 보여\"",
    "돼요 / 시간 맞으면 돼요 / 안 돼요",
    "시간 선택(시 단위)",
      ]}
      next={[
    { label: "저장", to: "B5" },
      ]}
    />
  )
}

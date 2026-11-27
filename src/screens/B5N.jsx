import Placeholder from '../components/Placeholder.jsx'

// B5-N — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function B5N() {
  return (
    <Placeholder
      id="B5-N"
      notes={[
    "\"언제쯤 네 일정이 나와?\" 날짜",
    "이메일 바텀시트",
      ]}
      next={[
    { label: "웹 푸시로 알려줘", to: "B5-T" },
    { label: "돌아가기", to: "B5" },
      ]}
    />
  )
}

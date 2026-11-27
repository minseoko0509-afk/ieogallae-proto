import Placeholder from '../components/Placeholder.jsx'

// A3 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function A3() {
  return (
    <Placeholder
      id="A3"
      notes={[
    "진행 바 3/4",
    "응답 마감일",
    "토글 \"마감 시각도 정할래\"(기본 23:59)",
    "알림: 이메일 / 웹 푸시(→ B5-T)",
      ]}
      next={[
    { label: "초대장 만들기", to: "A4" },
    { label: "알림 안 정했을 때", to: "A3-M" },
      ]}
    />
  )
}

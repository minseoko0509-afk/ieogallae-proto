import Placeholder from '../components/Placeholder.jsx'

// B5-T — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function B5T() {
  return (
    <Placeholder
      id="B5-T"
      notes={[
    "iOS/Android 세그먼트",
    "3단계(다른 브라우저 → 홈 화면 추가 → 알림 허용)",
    "\"카톡 안에서는 푸시가 안 돼\"",
      ]}
      next={[
    { label: "돌아가기", to: "B5" },
    { label: "이메일로도 받을래", to: "B5-N" },
      ]}
    />
  )
}

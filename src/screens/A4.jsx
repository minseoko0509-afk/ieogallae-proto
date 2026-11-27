import Placeholder from '../components/Placeholder.jsx'

// A4 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function A4() {
  return (
    <Placeholder
      id="A4"
      notes={[
    "진행 바 4/4",
    "OG-1 초대 카드 미리보기",
    "[카톡으로 공유] [링크 복사]",
    "관리 링크 박스 + [복사]",
    "토스트 \"복사했어 콕\"",
      ]}
      next={[
    { label: "내 일정도 넣기", to: "B2" },
      ]}
    />
  )
}

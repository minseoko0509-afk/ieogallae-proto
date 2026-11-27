import Placeholder from '../components/Placeholder.jsx'

// B5 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function B5() {
  return (
    <Placeholder
      id="B5"
      notes={[
    "\"이렇게 읽었어. 맞는지 확인해줘\"",
    "월간 달력, 셀 4상태(○ ◐ ✕ ?) + 범례",
    "칩 \"시간 입력 필요 3일\"",
    "배너 \"아직 일정 모르는 날 2일\" [알림 설정]",
    "미확인 날 모달",
      ]}
      next={[
    { label: "이대로 등록하기", to: "B6" },
    { label: "날짜 탭", to: "B5-S" },
    { label: "알림 설정", to: "B5-N" },
      ]}
    />
  )
}

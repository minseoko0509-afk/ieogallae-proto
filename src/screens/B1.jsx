import Placeholder from '../components/Placeholder.jsx'

// B1 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function B1() {
  return (
    <Placeholder
      id="B1"
      notes={[
    "\"민서가 연말 방어회 모임에 초대했어\"",
    "날짜 범위/시간대/마감일",
    "\"6명 중 2명 응답\" + 아바타",
      ]}
      next={[
    { label: "내 일정 넣기", to: "B2" },
      ]}
    />
  )
}

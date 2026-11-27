import Placeholder from '../components/Placeholder.jsx'

// C2 — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function C2() {
  return (
    <Placeholder
      id="C2"
      notes={[
    "C 공통 상단",
    "\"잠정 결과\" 라벨, 달력 1·2·3위 배지",
    "Top3 리스트",
    "\"더 답하면 순위가 바뀔 수 있어\"",
      ]}
      next={[
    { label: "날짜 확정하기(주도자)", to: "C3" },
    { label: "날짜 탭", to: "C2-S" },
      ]}
    />
  )
}

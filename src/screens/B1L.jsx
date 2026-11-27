import Placeholder from '../components/Placeholder.jsx'

// B1-L — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function B1L() {
  return (
    <Placeholder
      id="B1-L"
      notes={[
    "\"벌써 날짜 후보가 나왔어! 되는 날만 체크해줘\"",
    "Top3 카드 체크박스(복수)",
    "\"Top3 밖 날짜는 안 되는 걸로 넣을게\"",
    "순위 실시간 재계산",
      ]}
      next={[
    { label: "제출", to: "B2" },
    { label: "이 중에 되는 날이 없어요", to: "B3" },
      ]}
    />
  )
}

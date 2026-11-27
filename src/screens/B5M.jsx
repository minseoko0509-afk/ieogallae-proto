import Placeholder from '../components/Placeholder.jsx'

// B5-M — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function B5M() {
  return (
    <Placeholder
      id="B5-M"
      notes={[
    "\"전부 되는 걸로 해뒀어. 안 되는 날만 콕 찍어줘\"",
    "탭 = 불가 토글, 길게 누르기 = 부분 가능",
      ]}
      next={[
    { label: "제출", to: "B6" },
      ]}
    />
  )
}

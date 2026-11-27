import Placeholder from '../components/Placeholder.jsx'

// C3-D — 플레이스홀더. 실제 화면으로 교체할 때 이 파일만 바꾸면 된다.
export default function C3D() {
  return (
    <Placeholder
      id="C3-D"
      notes={[
    "모달 1 \"마감됐는데 4명만 답했어. 이대로 확정할까?\"",
    "모달 2 \"확정 안 하면 공유 링크가 안 만들어져…\"",
      ]}
      next={[
    { label: "미룰래", to: "C1" },
    { label: "확정할래", to: "C3" },
      ]}
    />
  )
}

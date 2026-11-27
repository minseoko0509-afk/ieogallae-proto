// 390x844 폰 프레임. 좌측 상단에 화면 ID 라벨을 띄운다.
// 오버레이(Modal, BottomSheet)는 이 프레임 안을 덮는다.
export default function PhoneFrame({ screenId, children }) {
  return (
    <div className="phone">
      {screenId && <span className="phone__label">{screenId}</span>}
      {children}
    </div>
  )
}

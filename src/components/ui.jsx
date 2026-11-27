// 공통 로우파이 컴포넌트. 스타일은 src/styles/base.css 클래스를 쓴다.
import { useNavigate } from 'react-router-dom'
import { BIRD, birdSrc, animalSrc, animalOf, ANIMAL_KO } from '../lib/characters.js'

// 화면 본문 컨테이너 (스크롤 영역). 모든 화면의 최상위에 둔다.
export function Screen({ children, className = '' }) {
  return <div className={`phone__body ${className}`}>{children}</div>
}

// 일러스트 자리: 회색 박스 + 설명 라벨 (예: <Illust label="뱁새" h={180} />)
export function Illust({ label, h = 120, w, style }) {
  return (
    <div className="illust" style={{ height: h, width: w, ...style }}>
      [{label}]
    </div>
  )
}

// variant: primary(검정 CTA) | secondary(기본, 테두리) | text(밑줄)
export function Button({ variant = 'secondary', className = '', ...props }) {
  return <button type="button" className={`btn btn--${variant} ${className}`} {...props} />
}

export function Chip({ on, className = '', ...props }) {
  return <button type="button" className={`chip ${on ? 'is-on' : ''} ${className}`} {...props} />
}

// 상단 바: 왼쪽은 화면 ID 라벨 자리, 뒤로 버튼(onBack 없으면 브라우저 뒤로), 가운데 제목, 오른쪽 meta
export function TopBar({ back = true, onBack, title, meta, children }) {
  const navigate = useNavigate()
  return (
    <div className="topbar">
      {back ? (
        <button type="button" className="topbar__back" aria-label="뒤로 가기" onClick={onBack ?? (() => navigate(-1))}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" aria-hidden="true"><path d="M20 12H5M11 6l-6 6 6 6" /></svg>
        </button>
      ) : <span style={{ width: 4 }} />}
      <span className="topbar__title">{title}</span>
      {meta != null ? <span className="topbar__meta">{meta}</span> : <span style={{ width: 44 }} />}
      {children}
    </div>
  )
}

// 픽셀 로고 (public/logo.svg, Stitch L0에서 추출)
export function Logo({ w = 144, style }) {
  return <img className="pxlogo" src="/logo.svg" alt="이어갈래?" width={w} height={w / 4} style={style} draggable="false" />
}

// A 흐름 상단 4단계 진행 바
export function Steps({ current, total = 4 }) {
  return (
    <div className="steps" aria-label={`${total}단계 중 ${current}단계`}>
      {Array.from({ length: total }, (_, i) => (
        <i key={i} className={i < current ? 'is-done' : ''} />
      ))}
    </div>
  )
}

// 바텀시트: 하단 패널 + 배경 dim. onClose는 dim을 눌렀을 때.
export function BottomSheet({ onClose, children }) {
  return (
    <div className="overlay overlay--sheet" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="sheet__grip" />
        {children}
      </div>
    </div>
  )
}

// 모달: 중앙 카드 + 버튼 2개. actions = [{ label, onClick, variant }]
export function Modal({ title, children, actions = [] }) {
  return (
    <div className="overlay overlay--modal">
      <div className="modal" role="alertdialog" aria-modal="true">
        {title && <p className="t-body" style={{ fontWeight: 700 }}>{title}</p>}
        {children}
        {actions.length > 0 && (
          <div className="modal__actions">
            {actions.map((a) => (
              <Button key={a.label} variant={a.variant} onClick={a.onClick}>
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 삐루(마스코트) 일러스트. mood는 src/lib/characters.js BIRD 키 (예: <Bird mood="hello" size={150} />)
export function Bird({ mood = 'neutral', size = 140, round, className = '', style }) {
  return (
    <div className={`char ${round ? 'char--round' : ''} ${className}`} style={{ width: size, height: size, ...style }}>
      <img src={birdSrc(mood)} alt={`삐루 ${BIRD[mood] ?? ''}`} width={size} height={size} draggable="false" />
    </div>
  )
}

// 친구 아바타: 이름마다 동물 하나 (size px 원형)
export function Avatar({ name, size = 36, className = '', style }) {
  return (
    <span className={`avatar avatar--animal ${className}`} title={name} style={{ width: size, height: size, ...style }}>
      <img src={animalSrc(name)} alt={`${name} (${ANIMAL_KO[animalOf(name)]})`} draggable="false" />
    </span>
  )
}

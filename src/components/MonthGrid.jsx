import '../styles/screens.css'

const DOW = ['일', '월', '화', '수', '목', '금', '토']

// 월간 달력 격자. renderCell(dayKey, dayNumber) → { mark, className, label, disabled }
// year/month: 1-based month
// onPrev/onNext를 주면 노랑 머리줄(이전·다음 달 버튼)로 그린다 (A2)
export default function MonthGrid({ year = 2026, month = 12, renderCell, onTap, onLongPress, title = true, onPrev, onNext }) {
  const first = new Date(year, month - 1, 1).getDay()
  const last = new Date(year, month, 0).getDate()
  const cells = []
  for (let i = 0; i < first; i++) cells.push(null)
  for (let d = 1; d <= last; d++) cells.push(d)
  while (cells.length % 7) cells.push(null)
  const key = (d) => `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  return (
    <div className={`card month ${onPrev ? 'month--head' : ''}`}>
      {onPrev ? (
        <div className="month__head">
          <button type="button" className="month__nav" aria-label="이전 달" onClick={onPrev}>‹</button>
          <p className="month__title"><span style={{ color: 'var(--c-pink)' }}>♥</span> {year}년 {month}월</p>
          <button type="button" className="month__nav" aria-label="다음 달" onClick={onNext}>›</button>
        </div>
      ) : title && <p className="month__title">{year}년 {month}월</p>}
      <div className="month__dow">{DOW.map((w) => <span key={w}>{w}</span>)}</div>
      <div className="month__grid">
        {cells.map((d, i) => {
          if (!d) return <span key={i} className="mcell mcell--empty" />
          const k = key(d)
          const c = renderCell ? renderCell(k, d) : {}
          return (
            <DayButton
              key={i}
              className={`mcell ${c.className ?? ''}`}
              disabled={c.disabled || (!onTap && !onLongPress)}
              aria-label={c.label ?? `${month}월 ${d}일`}
              onTap={() => onTap?.(k)}
              onLongPress={onLongPress ? () => onLongPress(k) : null}
            >
              <span>{d}</span>
              {c.mark != null && <span className="mcell__mark">{c.mark}</span>}
            </DayButton>
          )
        })}
      </div>
    </div>
  )
}

// 탭 / 길게 누르기(500ms) 구분
function DayButton({ onTap, onLongPress, children, ...rest }) {
  let timer = null
  let long = false
  const start = () => {
    if (!onLongPress) return
    long = false
    timer = setTimeout(() => { long = true; onLongPress() }, 500)
  }
  const clear = () => clearTimeout(timer)
  return (
    <button
      type="button"
      {...rest}
      onPointerDown={start}
      onPointerUp={clear}
      onPointerLeave={clear}
      onContextMenu={(e) => onLongPress && e.preventDefault()}
      onClick={() => { if (!long) onTap() }}
    >
      {children}
    </button>
  )
}

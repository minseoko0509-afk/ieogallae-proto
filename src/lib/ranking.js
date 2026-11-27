// Top3 순위 계산 (spec.md: 순위 점수 = 가능 인원 + 0.5 × 부분 가능 인원)
//
// responses: [{ name, days: { 'YYYY-MM-DD': { s: 'ok'|'part'|'no'|'tbd', from?: number } } }]
//   - 날짜 키가 없으면 'no'로 본다 (B5에서 미확인 날은 '안 돼'로 등록, B1-L에서 Top3 밖은 불가)
//   - 'tbd'(일정 아직 안 나옴)는 점수에 넣지 않는다
// dates: 후보 날짜 키 배열 (약속 날짜 범위)

export const SCORE_PART = 0.5

export function threshold(n) {
  // 70% 기준 인원 = ceil(N × 0.7). 부동소수 오차(예: 10×0.7=7.000000000000001) 방지
  return Math.ceil(Math.round(n * 0.7 * 1000) / 1000)
}

export function isRevealed(respondedCount, n) {
  return respondedCount >= threshold(n)
}

export function tallyDate(responses, date) {
  const ok = []
  const part = []
  const no = []
  const tbd = []
  for (const r of responses) {
    const d = r.days?.[date]
    const s = d?.s ?? 'no'
    if (s === 'ok') ok.push(r.name)
    else if (s === 'part') part.push({ name: r.name, from: d.from ?? null })
    else if (s === 'tbd') tbd.push(r.name)
    else no.push(r.name)
  }
  return { date, ok, part, no, tbd, score: ok.length + SCORE_PART * part.length }
}

// 동점이면 가능 인원 많은 순 → 이른 날짜 순
export function rankDates(responses, dates) {
  return dates
    .map((date) => tallyDate(responses, date))
    .sort((a, b) => b.score - a.score || b.ok.length - a.ok.length || (a.date < b.date ? -1 : 1))
}

export function top3(responses, dates) {
  return rankDates(responses, dates)
    .filter((t) => t.score > 0)
    .slice(0, 3)
    .map((t, i) => ({ ...t, rank: i + 1 }))
}

// "가능 5명" / "가능 4 · 부분 1"
export function describeTally(t) {
  return t.part.length ? `가능 ${t.ok.length} · 부분 ${t.part.length}` : `가능 ${t.ok.length}명`
}

// 날짜 범위 → 키 배열
export function dateRange(start, end) {
  const out = []
  const d = new Date(start + 'T00:00:00')
  const e = new Date(end + 'T00:00:00')
  while (d <= e) {
    out.push(toKey(d))
    d.setDate(d.getDate() + 1)
  }
  return out
}

export function toKey(d) {
  const p = (x) => String(x).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

const DOW = ['일', '월', '화', '수', '목', '금', '토']

// '2026-12-20' → '12월 20일 (일)'
export function formatDateKo(key) {
  const d = new Date(key + 'T00:00:00')
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${DOW[d.getDay()]})`
}

// '2026-12-20' → '12/20(일)'
export function formatDateShort(key) {
  const d = new Date(key + 'T00:00:00')
  return `${d.getMonth() + 1}/${d.getDate()}(${DOW[d.getDay()]})`
}

// 상태 모델용 별칭. dates를 안 주면 응답에 나온 날짜 전체를 후보로 쓴다.
// → [{ rank, date, score, ok:[names], part:[{name,from}], no:[names], tbd:[names] }]
export function rankTop3(responses, dates) {
  const ds = dates ?? [...new Set(responses.flatMap((r) => Object.keys(r.days ?? {})))].sort()
  return top3(responses, ds)
}

// 확정 일정 → 구글 캘린더 링크 / .ics (spec.md 구현 메모)
// 시간은 한국 시간(KST, UTC+9, 서머타임 없음) 기준. 종료 시각은 기본 2시간 뒤.

const KST_OFFSET_H = 9
export const DEFAULT_DURATION_H = 2

const p2 = (x) => String(x).padStart(2, '0')

// date 'YYYY-MM-DD', time 'HH:MM' → UTC 기준 'YYYYMMDDTHHMMSSZ'
function toUtcStamp(date, time, addHours = 0) {
  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = time.split(':').map(Number)
  const t = new Date(Date.UTC(y, m - 1, d, hh - KST_OFFSET_H + addHours, mm))
  return (
    `${t.getUTCFullYear()}${p2(t.getUTCMonth() + 1)}${p2(t.getUTCDate())}` +
    `T${p2(t.getUTCHours())}${p2(t.getUTCMinutes())}00Z`
  )
}

export function googleCalendarUrl({ title, date, time, durationHours = DEFAULT_DURATION_H, details = '' }) {
  const dates = `${toUtcStamp(date, time)}/${toUtcStamp(date, time, durationHours)}`
  const q = new URLSearchParams({ action: 'TEMPLATE', text: title, dates, ctz: 'Asia/Seoul' })
  if (details) q.set('details', details)
  return `https://calendar.google.com/calendar/render?${q.toString()}`
}

function escapeIcs(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1')
}

export function buildIcs({ id = 'demo', title, date, time, durationHours = DEFAULT_DURATION_H, details = '', now = new Date() }) {
  const stamp =
    `${now.getUTCFullYear()}${p2(now.getUTCMonth() + 1)}${p2(now.getUTCDate())}` +
    `T${p2(now.getUTCHours())}${p2(now.getUTCMinutes())}${p2(now.getUTCSeconds())}Z`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ieogallae//proto//KO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${id}@ieogallae.app`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toUtcStamp(date, time)}`,
    `DTEND:${toUtcStamp(date, time, durationHours)}`,
    `SUMMARY:${escapeIcs(title)}`,
    ...(details ? [`DESCRIPTION:${escapeIcs(details)}`] : []),
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(title)} 내일이야`,
    'TRIGGER:-P1D',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n') + '\r\n'
}

// 브라우저에서 .ics 파일 다운로드
export function downloadIcs(event, filename = 'ieogallae.ics') {
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    a.remove()
    URL.revokeObjectURL(url)
  }, 1000)
}

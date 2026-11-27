// 화면 사이를 오가는 동안만 쓰는 입력 초안 (A 약속 만들기 폼, B5 더블체크 응답).
// 앱 상태(응답 목록·역할·확정 등)는 src/state/ 가 맡는다. 여기는 제출 전 임시값만.
import { useSyncExternalStore } from 'react'

function createStore(initial) {
  let value = initial()
  const subs = new Set()
  return {
    get: () => value,
    set: (patch) => {
      value = { ...value, ...(typeof patch === 'function' ? patch(value) : patch) }
      subs.forEach((f) => f())
    },
    reset: () => {
      value = initial()
      subs.forEach((f) => f())
    },
    subscribe: (f) => (subs.add(f), () => subs.delete(f)),
  }
}

export function useStore(store) {
  return [useSyncExternalStore(store.subscribe, store.get), store.set]
}

// ---------- A. 약속 만들기 ----------
export const planDraft = createStore(() => ({
  title: '연말 방어회 모임',
  host: '민서',
  n: 6,
  start: '2026-12-01',
  end: '2026-12-31',
  slot: '저녁',
  deadline: '2026-12-10',
  timeOn: false,
  time: '23:59',
  notify: { email: false, push: false },
  email: '',
}))

// ---------- B5. 캡처에서 읽은 일정 (AI 분석 결과 가짜) ----------
// s: ok 가능 / part 부분 가능 / no 불가 / tbd 일정 아직 안 나옴
// from: 부분 가능일 때 되는 시각(시). 부분인데 from이 없으면 "시간 입력 필요"
const READ = {
  3: { s: 'no', ev: '종일 동아리 MT' },
  4: { s: 'no', ev: '종일 동아리 MT' },
  8: { s: 'no', ev: '18:00 – 22:00 팀플' },
  15: { s: 'no', ev: '18:00 – 22:00 과외' },
  22: { s: 'no', ev: '18:00 – 22:00 과외' },
  24: { s: 'no', ev: '종일 가족 모임' },
  5: { s: 'part', ev: '17:00 – 19:00 알바' },
  12: { s: 'part', ev: '17:00 – 19:00 알바' },
  19: { s: 'part', ev: '18:00 – 19:00 알바' },
  25: { s: 'tbd', ev: '' },
  30: { s: 'tbd', ev: '' },
}

export const dayKey = (d) => `2026-12-${String(d).padStart(2, '0')}`

function readDays() {
  const days = {}
  for (let d = 1; d <= 31; d++) {
    const r = READ[d]
    days[dayKey(d)] = r ? { s: r.s, ev: r.ev } : { s: 'ok', ev: '' }
  }
  return days
}

export const responseDraft = createStore(() => ({ days: readDays(), source: 'capture' }))

// 시간 입력이 필요한 날 (부분 가능인데 시각 미입력)
export const needsTime = (days) =>
  Object.keys(days).filter((k) => days[k].s === 'part' && days[k].from == null).sort()

export const tbdDays = (days) => Object.keys(days).filter((k) => days[k].s === 'tbd').sort()

// 제출용: 확인 안 한 부분 가능 날은 '안 돼'로, 읽힌 일정 텍스트(ev)는 빼고 넘긴다
export function finalizeDays(days) {
  const out = {}
  for (const [k, v] of Object.entries(days)) {
    if (v.s === 'part' && v.from == null) out[k] = { s: 'no' }
    else out[k] = v.s === 'part' ? { s: 'part', from: v.from } : { s: v.s }
  }
  return out
}

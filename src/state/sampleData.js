// 샘플 데이터: 연말 방어회 모임 (6명). spec.md "샘플 데이터" 기준.
// 응답 형식은 핵심 화면 스레드(src/lib/ranking.js)와 맞춘 것:
//   { name, days: { 'YYYY-MM-DD': { s: 'ok' | 'part' | 'no' | 'tbd', from?: 19 } } }

export const EVENT = {
  id: 'demo',
  title: '연말 방어회 모임',
  host: '민서',
  // 응답 순서. 데모 패널의 "응답 수 n"은 이 순서의 앞 n명이 답했다는 뜻.
  members: ['민서', '지안', '서윤', '하린', '지운', '수빈'],
  N: 6,
  range: { start: '2026-12-01', end: '2026-12-31' },
  slot: '저녁',
  deadline: '2026-12-10',
  deadlineTime: '23:59', // 마감 시각 미선택 → 23:59
  hostToken: 'demo-host-token', // 관리 링크 ?k=
};

export const DEFAULT_CONFIRM_TIME = '18:00';

const pad = (n) => String(n).padStart(2, '0');
export const DATES = Array.from({ length: 31 }, (_, i) => `2026-12-${pad(i + 1)}`);

const OK = { s: 'ok' };
const NO = { s: 'no' };
const TBD = { s: 'tbd' };
const part = (from) => ({ s: 'part', from });

// Top3 후보 날짜는 직접 지정. 앞 5명(수빈 제외) 기준:
//   12/20(일) 가능 5            → 점수 5
//   12/19(토) 가능 4 + 부분 1   → 점수 4.5 (지운 19시 이후)
//   12/26(토) 가능 3 + 부분 2   → 점수 4
// 수빈까지 6명이 답하면 12/19가 5.5점으로 1위가 돼서 "순위가 바뀔 수 있어"를 보여줄 수 있음.
const KEY = {
  '2026-12-20': { 민서: OK, 지안: OK, 서윤: OK, 하린: OK, 지운: OK, 수빈: NO },
  '2026-12-19': { 민서: OK, 지안: OK, 서윤: OK, 하린: OK, 지운: part(19), 수빈: OK },
  '2026-12-26': { 민서: OK, 지안: OK, 서윤: part(19), 하린: part(20), 지운: OK, 수빈: NO },
};

// 나머지 날짜: 사람마다 되는 요일이 조금씩 달라서 점수가 3 이하로 머무르게 만든 고정 패턴.
// (요일: 0=일 … 6=토, 2026-12-01은 화요일)
const PATTERN = {
  민서: { ok: [5, 6], part: [4] },
  지안: { ok: [0, 3], part: [5] },
  서윤: { ok: [1, 6], part: [] },
  하린: { ok: [2, 4], part: [0] },
  지운: { ok: [5], part: [3] },
  수빈: { ok: [0, 2], part: [6] },
};
// 아직 일정이 안 나온 날 (B5 "아직 일정 모르는 날" 예시)
const TBD_DAYS = { 서윤: ['2026-12-30', '2026-12-31'], 수빈: ['2026-12-27'] };
// 연말 일정이 몰린 날은 모두 불가 처리 → 패턴이 우연히 Top3를 넘지 않게
const BUSY = ['2026-12-24', '2026-12-25', '2026-12-31'];

const weekday = (iso) => new Date(`${iso}T00:00:00`).getDay();

function buildDays(name) {
  const p = PATTERN[name];
  const days = {};
  for (const d of DATES) {
    if (KEY[d]) { days[d] = KEY[d][name]; continue; }
    if (TBD_DAYS[name]?.includes(d)) { days[d] = TBD; continue; }
    if (BUSY.includes(d)) { days[d] = NO; continue; }
    const wd = weekday(d);
    const dayNum = Number(d.slice(-2));
    // 같은 요일이라도 격주로만 되는 사람처럼 보이게 살짝 흔듦
    const skip = (dayNum + name.charCodeAt(0)) % 3 === 0;
    if (p.ok.includes(wd) && !skip) days[d] = OK;
    else if (p.part.includes(wd) && !skip) days[d] = part(19);
    else days[d] = NO;
  }
  return days;
}

export const SAMPLE_RESPONSES = EVENT.members.map((name) => ({ name, days: buildDays(name) }));

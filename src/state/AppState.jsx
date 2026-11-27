// 단일 상태 저장소. 모든 화면과 데모 패널이 이 하나의 상태를 읽고 쓴다.
import { createContext, useContext, useMemo, useReducer, useEffect } from 'react';
import { EVENT, SAMPLE_RESPONSES, DEFAULT_CONFIRM_TIME } from './sampleData.js';
import { threshold } from '../lib/ranking.js';

const STORAGE_KEY = 'ieogallae.demoState.v1';

// 기본값: 주도자 · 응답 4/6 · 마감 전 → C1 ("1명만 더 답하면 Top3 공개!")
export const INITIAL_STATE = {
  role: 'host', // 'new' | 'responded' | 'host'
  responses: SAMPLE_RESPONSES.slice(0, 4),
  deadlinePassed: false,
  confirmed: null, // null | { date: 'YYYY-MM-DD', time: 'HH:MM' }
  capture: 'success', // 'success' | 'monthFail' | 'fail'
  earlyReveal: false, // C3-D에서 "예 → Top3 공개"
  c3dDeferred: false, // C3-D에서 "미룰래" (이번 방문만)
};

function reducer(s, a) {
  switch (a.type) {
    case 'setRole':
      // 역할이 바뀌면 "새로 들어온 것"으로 보고 C3-D 미루기 기억은 지움
      return { ...s, role: a.role, c3dDeferred: false };
    case 'setResponseCount': {
      const n = Math.max(0, Math.min(EVENT.N, a.n));
      // 샘플 앞 n명으로 맞추되, 사용자가 직접 제출한 응답은 그 이름 자리에 유지
      const responses = SAMPLE_RESPONSES.slice(0, n).map((r) => s.responses.find((x) => x.name === r.name) ?? r);
      const reached = n >= threshold(EVENT.N);
      return { ...s, responses, earlyReveal: reached ? false : s.earlyReveal, c3dDeferred: false };
    }
    case 'setDeadlinePassed':
      return { ...s, deadlinePassed: a.value, earlyReveal: a.value ? s.earlyReveal : false, c3dDeferred: false };
    case 'setConfirmed':
      return { ...s, confirmed: a.value };
    case 'setCapture':
      return { ...s, capture: a.value };
    case 'submitResponse': {
      const i = s.responses.findIndex((r) => r.name === a.response.name);
      const responses = i >= 0
        ? s.responses.map((r, j) => (j === i ? a.response : r))
        : [...s.responses, a.response];
      return { ...s, responses, role: s.role === 'host' ? 'host' : 'responded' };
    }
    case 'revealEarly':
      return { ...s, earlyReveal: true };
    case 'deferC3D':
      return { ...s, c3dDeferred: true };
    case 'reenter':
      // 관리 링크로 다시 들어옴 → C3-D를 또 물어봄
      return { ...s, c3dDeferred: false };
    case 'reset':
      return INITIAL_STATE;
    case 'replace':
      return a.state;
    default:
      return s;
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    return { ...INITIAL_STATE, ...JSON.parse(raw) };
  } catch {
    return INITIAL_STATE;
  }
}

const Ctx = createContext(null);

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* 저장 실패해도 데모는 동작 */ }
  }, [state]);

  const actions = useMemo(() => ({
    setRole: (role) => dispatch({ type: 'setRole', role }),
    setResponseCount: (n) => dispatch({ type: 'setResponseCount', n }),
    setDeadlinePassed: (value) => dispatch({ type: 'setDeadlinePassed', value }),
    setCapture: (value) => dispatch({ type: 'setCapture', value }),
    // 확정: 날짜·시간 생략 시 12/20 18:00 (데모 패널 토글용)
    confirm: ({ date = '2026-12-20', time = DEFAULT_CONFIRM_TIME } = {}) => dispatch({ type: 'setConfirmed', value: { date, time } }),
    cancelConfirm: () => dispatch({ type: 'setConfirmed', value: null }),
    submitResponse: (response) => dispatch({ type: 'submitResponse', response }),
    revealEarly: () => dispatch({ type: 'revealEarly' }),
    deferC3D: () => dispatch({ type: 'deferC3D' }),
    reenter: () => dispatch({ type: 'reenter' }),
    reset: () => dispatch({ type: 'reset' }),
  }), []);

  const value = useMemo(() => ({ state, actions }), [state, actions]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState는 <AppStateProvider> 안에서만 쓸 수 있어');
  return v;
}

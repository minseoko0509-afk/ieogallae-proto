// 화면에서 쓰는 상태 파생값 모음 (상태 자체는 src/state/ 가 소유)
import { useAppState } from '../state/AppState.jsx'
import * as sel from '../state/selectors.js'
import { EVENT, DATES } from '../state/sampleData.js'
import { threshold, top3 } from './ranking.js'
import { useNavigate } from 'react-router-dom'
import { responseDraft } from './drafts.js'

export function usePlan() {
  const { state, actions } = useAppState()
  const N = EVENT.N
  const count = state.responses.length
  const need = threshold(N)
  const responded = state.responses.map((r) => r.name)
  const missing = EVENT.members.filter((m) => !responded.includes(m))
  const isHost = state.role === 'host'
  const meName = sel.me?.(state) ?? null
  const myResponse = state.responses.find((r) => r.name === meName) ?? null
  const unlocked = count >= need || !!state.earlyReveal
  const top = top3(state.responses, DATES)
  return { state, actions, EVENT, DATES, N, count, need, responded, missing, isHost, meName, myResponse, unlocked, top }
}

// B5 / B5-M 제출: 이름은 B2에서 넣은 값(responseDraft.name) → 현재 역할의 이름 → '나'
export function useSubmitResponse() {
  const { state, actions } = useAppState()
  return (days) => {
    const name = responseDraft.get().name || sel.me?.(state) || '나'
    actions.submitResponse({ name, days })
  }
}

// "가능 22일 · 부분 3일 · 불가 6일"
export function summarize(resp) {
  const c = { ok: 0, part: 0, no: 0, tbd: 0 }
  for (const v of Object.values(resp?.days ?? {})) c[v.s] = (c[v.s] ?? 0) + 1
  return `가능 ${c.ok}일 · 부분 ${c.part}일 · 불가 ${c.no}일${c.tbd ? ` · 미정 ${c.tbd}일` : ''}`
}

// 실제 주소로 이동: /p/demo (상태대로 C1/C2/B1…), /p/demo/c (확정)
export function usePlanNav() {
  const navigate = useNavigate()
  return {
    toPlan: (opts) => navigate(`/p/${EVENT.id}`, opts),
    toConfirm: (opts) => navigate(`/p/${EVENT.id}/c`, opts),
  }
}

export const shareUrl = (path = '') =>
  `${typeof location !== 'undefined' ? location.origin : 'https://ieo.app'}/p/${EVENT.id}${path}`

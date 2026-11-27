// 상태에서 파생되는 값과 화면 분기 규칙 (spec.md "상태 로직").
// Top3 계산은 src/lib/ranking.js(핵심 화면 스레드)가 담당. 여기서 중복 구현하지 않음.
import { threshold } from '../lib/ranking.js';
import { EVENT } from './sampleData.js';

export const ROLES = ['new', 'responded', 'host'];
export const ROLE_LABEL = { new: '새 참여자', responded: '응답자', host: '주도자' };
export const CAPTURES = ['success', 'monthFail', 'fail'];
export const CAPTURE_LABEL = { success: '성공', monthFail: '월 인식 실패', fail: '전체 실패' };

export const responseCount = (s) => s.responses.length;
export const need = () => threshold(EVENT.N);
export const reached70 = (s) => responseCount(s) >= need();
// Top3 공개 여부: 70% 이상이거나, 마감 후 주도자가 "예 → Top3 공개"를 눌렀을 때
export const unlocked = (s) => reached70(s) || s.earlyReveal;
export const remainingTo70 = (s) => Math.max(0, need() - responseCount(s));

export const respondedNames = (s) => s.responses.map((r) => r.name);
export const missingNames = (s) => EVENT.members.filter((m) => !respondedNames(s).includes(m));
export const hostResponded = (s) => respondedNames(s).includes(EVENT.host);
export const isHost = (s) => s.role === 'host';

// 현재 역할의 "나".
//   주도자 → 민서
//   응답자 → 주도자가 아닌 가장 최근 응답자 (없으면 null: 응답자 역할인데 아직 아무도 안 답한 상태)
//   새 참여자 → 아직 안 답한 첫 사람 (전원 응답이면 null: 이름 입력에서 새로 정함)
export function me(s) {
  if (s.role === 'host') return EVENT.host;
  if (s.role === 'responded') {
    const others = respondedNames(s).filter((n) => n !== EVENT.host);
    return others[others.length - 1] ?? null;
  }
  return missingNames(s).find((n) => n !== EVENT.host) ?? null;
}
export const myResponse = (s) => s.responses.find((r) => r.name === me(s)) ?? null;

// /p/{id} 진입 시 보여줄 화면 ID
export function resolveScreen(s) {
  if (s.confirmed) return 'D1'; // 4. 확정됨 → 모두 D1
  if (s.role === 'new') return unlocked(s) ? 'B1-L' : 'B1';
  // 응답자로 골랐는데 실제로 답한 사람이 없으면 새 참여자처럼 B1
  if (s.role === 'responded' && !me(s)) return 'B1';
  if (unlocked(s)) return 'C2'; // 2. 70% 이상 (마감 무관)
  // 3. 마감 후 + 70% 미만 → 주도자에게만 C3-D (미룰래 누르면 이번 방문은 C1)
  if (s.deadlinePassed && isHost(s) && !s.c3dDeferred) return 'C3-D';
  return 'C1'; // 1. 마감 전 70% 미만, 또는 마감 후 참여자
}

// 상태 조합에 대한 사람용 설명 (데모 패널 하단)
export function explainScreen(s) {
  const n = responseCount(s);
  switch (resolveScreen(s)) {
    case 'D1': return '확정됨 → 모두 D1';
    case 'B1-L': return `응답 ${n}/${EVENT.N}로 Top3 공개 후 들어온 새 참여자 → B1-L`;
    case 'B1': return s.role === 'new' ? `새 참여자, 아직 ${need()}명 미만 → B1` : '응답자 역할인데 답한 사람이 없음 → B1';
    case 'C2': return s.earlyReveal ? '마감 후 주도자가 Top3 공개를 선택 → C2' : `응답 ${n}/${EVENT.N} ≥ ${need()}명 → C2 잠정 결과`;
    case 'C3-D': return `마감 후 ${need()}명 미만, 주도자 → C3-D 확인 모달`;
    default:
      if (s.deadlinePassed && isHost(s)) return '주도자가 미루기 선택 → C1 유지 (다시 들어오면 또 물어봄)';
      if (s.deadlinePassed) return '마감 후 70% 미만이지만 참여자 → C1 유지';
      return `${remainingTo70(s)}명 더 답하면 Top3 공개 → C1`;
  }
}

// B4 분석 결과 → 다음 화면. attempt는 0부터 (전체 실패는 1회 재시도 후 B5-M)
export function captureOutcome(s, attempt = 0) {
  if (s.capture === 'success') return 'B5';
  if (s.capture === 'monthFail') return 'B4-month'; // "이거 몇 월이야?" 칩 → B5
  return attempt === 0 ? 'retry' : 'B5-M';
}

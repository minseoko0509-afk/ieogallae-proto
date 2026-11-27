// 화면 목록 (spec.md "화면 목록" + Stitch 와이어프레임의 S0, A3-C). 26개 화면 ID의 단일 출처.
// kind: page = 전체 화면, modal = 중앙 모달, sheet = 바텀시트
// base: modal/sheet가 뒤에 깔고 뜨는 화면 ID
// path: spec.md 기준 실제 URL (참고용). 바로가기는 /s/:id 로 연다.
export const SCREENS = [
  { id: 'S0', group: '진입', kind: 'page', path: '/', title: '스플래시' },
  { id: 'L0', group: '진입', kind: 'page', path: '/', title: '랜딩' },

  { id: 'A1', group: 'A', kind: 'page', path: '/new', title: '기본 정보', step: 1 },
  { id: 'A2', group: 'A', kind: 'page', path: '/new', title: '응답 설정', step: 2 },
  { id: 'A3', group: 'A', kind: 'page', path: '/new', title: '마감·알림', step: 3 },
  { id: 'A3-M', group: 'A', kind: 'modal', base: 'A3', path: '/new', title: '알림 미설정 확인' },
  { id: 'A3-C', group: 'A', kind: 'page', path: '/new', title: '초대장 꾸미기' },
  { id: 'A4', group: 'A', kind: 'page', path: '/new', title: '생성 완료·공유', step: 4 },

  { id: 'B1', group: 'B', kind: 'page', path: '/p/:id', title: '초대 랜딩' },
  { id: 'B1-L', group: 'B', kind: 'page', path: '/p/:id', title: '늦은 응답' },
  { id: 'B2', group: 'B', kind: 'page', path: '/p/:id', title: '이름 입력' },
  { id: 'B3', group: 'B', kind: 'page', path: '/p/:id', title: '캡처 업로드' },
  { id: 'B4', group: 'B', kind: 'page', path: '/p/:id', title: '분석 중' },
  { id: 'B5', group: 'B', kind: 'page', path: '/p/:id', title: '더블체크' },
  { id: 'B5-S', group: 'B', kind: 'sheet', base: 'B5', path: '/p/:id', title: '날짜 바텀시트' },
  { id: 'B5-N', group: 'B', kind: 'page', path: '/p/:id', title: '알림 설정' },
  { id: 'B5-T', group: 'B', kind: 'page', path: '/p/:id', title: '웹 푸시 튜토리얼' },
  { id: 'B5-M', group: 'B', kind: 'page', path: '/p/:id', title: '직접 체크' },
  { id: 'B6', group: 'B', kind: 'page', path: '/p/:id', title: '제출 완료' },

  { id: 'C1', group: 'C', kind: 'page', path: '/p/:id', title: '70% 미만' },
  { id: 'C2', group: 'C', kind: 'page', path: '/p/:id', title: '잠정 결과' },
  { id: 'C2-S', group: 'C', kind: 'sheet', base: 'C2', path: '/p/:id', title: '날짜 상세' },
  { id: 'C3', group: 'C', kind: 'page', path: '/p/:id', title: '확정 설정' },
  { id: 'C3-D', group: 'C', kind: 'modal', base: 'C1', path: '/p/:id', title: '마감 후 70% 미만' },

  { id: 'D1', group: 'D', kind: 'page', path: '/p/:id/c', title: '확정 화면' },
  { id: 'D2', group: 'D', kind: 'sheet', base: 'D1', path: '/p/:id/c', title: '공유 시트' },
]

export const GROUPS = [
  { key: '진입', label: '진입' },
  { key: 'A', label: 'A. 약속 만들기' },
  { key: 'B', label: 'B. 응답하기' },
  { key: 'C', label: 'C. 현황·결과' },
  { key: 'D', label: 'D. 확정·공유' },
]

const byId = Object.fromEntries(SCREENS.map((s) => [s.id, s]))
export const getScreen = (id) => byId[id]

// 화면 ID → 파일/컴포넌트 이름 ("B5-S" → "B5S")
export const toFileName = (id) => id.replace('-', '')

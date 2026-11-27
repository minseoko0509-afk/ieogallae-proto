import { useState } from 'react'
import { Screen, Button, Chip, Modal } from '../components/ui.jsx'
import MonthGrid from '../components/MonthGrid.jsx'
import { useGo } from '../router/useGo.js'
import { useStore, responseDraft, needsTime, tbdDays, finalizeDays } from '../lib/drafts.js'
import { useSubmitResponse } from '../lib/plan.js'

export const MARK = { ok: '○', part: <span className="half" aria-hidden="true" />, no: '✕', tbd: '?' }
export const LABEL = { ok: '가능', part: '부분 가능', no: '불가', tbd: '일정 아직 안 나옴' }

export function Legend() {
  return (
    <div className="legend">
      {Object.keys(MARK).map((s) => <span key={s}>{MARK[s]} {LABEL[s]}</span>)}
    </div>
  )
}

// B5 더블체크 (핵심): AI가 읽은 달력을 확인하고 등록
export default function B5() {
  const go = useGo()
  const [draft] = useStore(responseDraft)
  const submit = useSubmitResponse()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const need = needsTime(draft.days)
  const tbd = tbdDays(draft.days)

  const register = () => {
    submit(finalizeDays(draft.days))
    go('B6')
  }

  return (
    <Screen>
      <p className="t-title">이렇게 읽었어.<br />맞는지 확인해줘</p>
      <Legend />
      <MonthGrid
        renderCell={(k, d) => {
          const v = draft.days[k]
          const isNeed = need.includes(k)
          return {
            mark: MARK[v.s],
            className: `mcell--${v.s} ${isNeed ? 'mcell--need' : ''}`,
            label: `12월 ${d}일 ${LABEL[v.s]}${isNeed ? ', 시간 입력 필요' : ''}`,
          }
        }}
        onTap={(k) => go('B5-S', { state: { date: k } })}
      />
      <p className="t-caption">날짜를 누르면 고칠 수 있어</p>
      {need.length > 0 && (
        <Chip on style={{ alignSelf: 'flex-start' }} onClick={() => go('B5-S', { state: { date: need[0], queue: true } })}>
          시간 입력 필요 {need.length}일 → 하나씩 보기
        </Chip>
      )}
      {tbd.length > 0 && (
        <div className="card note row" style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <p className="t-caption" style={{ color: 'var(--c-ink)' }}>아직 일정 모르는 날 {tbd.length}일. 나오면 알려줄게</p>
          <Chip style={{ flex: 'none' }} onClick={() => go('B5-N')}>알림 설정</Chip>
        </div>
      )}
      <div className="bottom">
        <Button variant="primary" onClick={() => (need.length ? setConfirmOpen(true) : register())}>
          이대로 등록하기
        </Button>
      </div>
      {confirmOpen && (
        <Modal
          title="확인 안 한 날은 '안 돼'로 넣을게"
          actions={[
            { label: '다시 볼래', variant: 'secondary', onClick: () => setConfirmOpen(false) },
            { label: '그렇게 해', variant: 'primary', onClick: register },
          ]}
        >
          <p className="t-caption">시간을 안 넣은 날 {need.length}일</p>
        </Modal>
      )}
    </Screen>
  )
}

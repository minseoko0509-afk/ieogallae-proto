import { Screen, Button, Steps, TopBar } from '../components/ui.jsx'
import InviteCard from '../components/InviteCard.jsx'
import { useGo } from '../router/useGo.js'
import { useToast, copyText } from '../components/Toast.jsx'
import { useStore, planDraft, responseDraft } from '../lib/drafts.js'
import { useAppState } from '../state/AppState.jsx'
import { EVENT } from '../state/sampleData.js'
import { shareUrl } from '../lib/plan.js'

// A4 생성 완료·공유
export default function A4() {
  const go = useGo()
  const [d] = useStore(planDraft)
  const { actions } = useAppState()
  const [toast, show] = useToast()
  const link = shareUrl()
  const admin = `${link}?k=${EVENT.hostToken}`

  return (
    <Screen>
      <TopBar back={false} meta="4 / 4" />
      <Steps current={4} />
      <p className="t-title">초대장 완성! 단톡방에 뿌려줘</p>
      <InviteCard title={d.title} sub={`우리 이어갈래? 되는 날 알려줘 · 0/${d.n} 응답`} deco={d.deco}
        friends={d.deco.photo ? null : ['지안', '하린']} />
      <div className="row" style={{ flexWrap: 'nowrap' }}>
        <Button variant="primary" style={{ flex: 1, height: 48, boxShadow: 'var(--shadow-px-s)' }} onClick={() => show('카톡으로 공유했어 (데모)')}>카톡으로 공유</Button>
        <Button style={{ flex: 1, height: 48 }} onClick={() => copyText(link).then(() => show('복사했어 콕'))}>링크 복사</Button>
      </div>
      <div className="card">
        <p className="t-body" style={{ fontWeight: 700 }}>🔑 관리 링크</p>
        <p className="t-caption" style={{ margin: '4px 0 10px' }}>이 링크로만 확정할 수 있어. 꼭 저장해둬</p>
        <div className="row" style={{ flexWrap: 'nowrap' }}>
          <span className="input" style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: 'var(--c-text-sub)' }}>
            {link.replace(/^https?:\/\//, '')}?k=••••
          </span>
          <Button variant="primary" style={{ width: 64, height: 44, flex: 'none', padding: 0 }} onClick={() => copyText(admin).then(() => show('복사했어 콕'))}>복사</Button>
        </div>
      </div>
      <div className="bottom">
        <Button variant="text" onClick={() => { actions.setRole('host'); responseDraft.reset(); responseDraft.set({ name: EVENT.host }); go('B2') }}>
          내 일정도 넣기
        </Button>
      </div>
      {toast}
    </Screen>
  )
}

import { Screen, Button, Steps, Illust } from '../components/ui.jsx'
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
      <Steps current={4} />
      <p className="t-title">초대장 완성! 단톡방에 뿌려줘</p>
      <div className="card confirm-card" style={{ borderColor: 'var(--c-line)' }}>
        <Illust label="OG-1 초대 카드 미리보기 · 뱁새" h={150} />
        <div className="confirm-card__body">
          <p className="t-body" style={{ fontWeight: 600 }}>{d.title}</p>
          <p className="t-caption">우리 이어갈래? 되는 날 알려줘 · 0/{d.n} 응답</p>
        </div>
      </div>
      <div className="row" style={{ flexWrap: 'nowrap' }}>
        <Button variant="primary" style={{ flex: 1, height: 48 }} onClick={() => show('카톡으로 공유했어 (데모)')}>카톡으로 공유</Button>
        <Button style={{ flex: 1, height: 48 }} onClick={() => copyText(link).then(() => show('복사했어 콕'))}>링크 복사</Button>
      </div>
      <div className="card" style={{ borderColor: 'var(--c-ink)' }}>
        <p className="t-body" style={{ fontWeight: 600 }}>관리 링크</p>
        <p className="t-caption" style={{ margin: '4px 0 10px' }}>이 링크로만 확정할 수 있어. 꼭 저장해둬</p>
        <div className="row" style={{ flexWrap: 'nowrap' }}>
          <span className="input" style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: 'var(--c-text-sub)' }}>
            {link.replace(/^https?:\/\//, '')}?k=••••
          </span>
          <Button style={{ width: 72, height: 48, flex: 'none' }} onClick={() => copyText(admin).then(() => show('복사했어 콕'))}>복사</Button>
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

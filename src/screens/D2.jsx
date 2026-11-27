import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BottomSheet, Button } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useToast, copyText } from '../components/Toast.jsx'
import { useConfirmed } from './D1.jsx'
import { formatDateShort } from '../lib/ranking.js'
import { shareUrl } from '../lib/plan.js'

const hourText = (time) => {
  const [h, m] = time.split(':').map(Number)
  return m ? `${h}시 ${m}분` : `${h}시`
}

// D2 공유 시트: 문구 편집 + 카톡 공유 / 링크 복사
export default function D2() {
  const go = useGo()
  const { state: nav } = useLocation()
  const { c, EVENT } = useConfirmed()
  const [text, setText] = useState(
    `${formatDateShort(c.date)} ${hourText(c.time)} ${EVENT.title} 확정! 이어갈래로 잡았어, 캘린더에 넣어둬`,
  )
  const [toast, show] = useToast()
  const link = shareUrl('/c')

  return (
    <BottomSheet onClose={() => go('D1')}>
      <p className="t-title" style={{ fontSize: 20 }}>{nav?.auto ? '바뀐 거 친구들한테 알려줘' : '친구들한테 알려줘'}</p>
      <label htmlFor="d2m" className="t-caption" style={{ color: 'var(--c-deep)', marginBottom: -8 }}>공유 메시지 (수정 가능)</label>
      <textarea id="d2m" className="textarea" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="row" style={{ flexWrap: 'nowrap' }}>
        <Button variant="primary" style={{ flex: 1, height: 48, boxShadow: 'var(--shadow-px-s)' }} onClick={() => show('카톡으로 공유했어 (데모)')}>카톡 공유</Button>
        <Button style={{ flex: 1, height: 48 }} onClick={() => copyText(`${text}\n${link}`).then(() => show('복사했어 콕'))}>링크 복사</Button>
      </div>
      <p className="t-caption">링크: {link}</p>
      {toast}
    </BottomSheet>
  )
}

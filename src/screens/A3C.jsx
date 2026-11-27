import { useRef, useState } from 'react'
import { Screen, Button, TopBar } from '../components/ui.jsx'
import InviteCard from '../components/InviteCard.jsx'
import { useGo } from '../router/useGo.js'
import { useStore, planDraft } from '../lib/drafts.js'
import { birdSrc } from '../lib/characters.js'

const POSES = [['hello', '손 흔드는 삐루'], ['heart', '하트 삐루'], ['jump', '점프 삐루']]
const TAPES = [['pink', '핑크 도트 테이프'], ['check', '보라 체크 테이프'], ['stripe', '노랑 줄무늬 테이프']]
const STICKERS = [['heart', '하트'], ['star', '별'], ['ribbon', '리본'], ['sparkle', '반짝이']]

// A3-C 초대장 꾸미기: 삐루 포즈 / 내 사진, 마스킹테이프, 픽셀 스티커
export default function A3C() {
  const go = useGo()
  const [d, set] = useStore(planDraft)
  const deco = d.deco
  const setDeco = (patch) => set({ deco: { ...deco, ...patch } })
  const [mode, setMode] = useState(deco.photo ? 'gallery' : 'default')
  const file = useRef()

  const pick = (e) => {
    const f = e.target.files?.[0]
    if (f) { setDeco({ photo: URL.createObjectURL(f) }); setMode('gallery') }
  }
  const toggleSticker = (s) => setDeco({ stickers: deco.stickers.includes(s) ? deco.stickers.filter((x) => x !== s) : [...deco.stickers, s] })

  return (
    <Screen>
      <TopBar meta={<Button variant="text" style={{ minHeight: 32, padding: 0, fontSize: 12 }} onClick={() => go('L0')}>처음으로</Button>} />
      <p className="t-title">초대장을 마음대로 꾸며봐!</p>
      <InviteCard
        title={d.title}
        sub="우리 이어갈래? 되는 날 알려줘"
        deco={mode === 'default' ? { ...deco, photo: null } : deco}
        action={<span className="label-box" style={{ background: 'var(--c-white)', boxShadow: 'none', flex: 'none' }}>미리보기</span>}
      />
      <div className="tabs2" role="tablist">
        <Button role="tab" aria-selected={mode === 'default'} className={mode === 'default' ? 'is-on' : ''} onClick={() => setMode('default')}>☻ 기본 삐루</Button>
        <Button role="tab" aria-selected={mode === 'gallery'} className={mode === 'gallery' ? 'is-on' : ''}
          onClick={() => (deco.photo ? setMode('gallery') : file.current.click())}>▣ 내 갤러리</Button>
      </div>
      <div className="pose-grid">
        {POSES.map(([p, label]) => (
          <button key={p} type="button" className={`pose ${mode === 'default' && deco.pose === p ? 'is-on' : ''}`} aria-label={label}
            onClick={() => { setDeco({ pose: p }); setMode('default') }}>
            <img src={birdSrc(p)} alt="" style={{ height: '100%' }} />
          </button>
        ))}
        <button type="button" className="pose pose--add" onClick={() => file.current.click()}>
          <b style={{ fontSize: 18, lineHeight: 1 }}>+</b>사진
        </button>
        <input ref={file} type="file" accept="image/*" hidden onChange={pick} />
      </div>
      <div className="deco-panel">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <b>마스킹테이프</b><span className="t-caption">모서리에 붙이기</span>
        </div>
        <div className="deco-row">
          {TAPES.map(([t, label]) => (
            <button key={t} type="button" aria-label={label} aria-pressed={deco.tape === t}
              className={`deco-btn ${deco.tape === t ? 'is-on' : ''}`} onClick={() => setDeco({ tape: t })}>
              <i className={`tape-${t}`} style={{ width: '70%', height: 14, border: 'var(--line)' }} />
            </button>
          ))}
          <button type="button" className={`deco-btn deco-btn--none ${deco.tape === 'none' ? 'is-on' : ''}`} onClick={() => setDeco({ tape: 'none' })}>없음</button>
        </div>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <b>픽셀 스티커</b><span className="t-caption">눌러서 켜고 끄기</span>
        </div>
        <div className="deco-row">
          {STICKERS.map(([s, label]) => (
            <button key={s} type="button" aria-label={`${label} 스티커`} aria-pressed={deco.stickers.includes(s)}
              className={`deco-btn ${deco.stickers.includes(s) ? 'is-on' : 'deco-btn--none'}`} onClick={() => toggleSticker(s)}>
              <img src={`/stickers/${s}.svg`} alt="" width="20" height="18" />
            </button>
          ))}
        </div>
      </div>
      <div className="bottom">
        <Button variant="primary" onClick={() => { if (mode === 'default') setDeco({ photo: null }); go('A4') }}>이대로 완성하기</Button>
      </div>
    </Screen>
  )
}

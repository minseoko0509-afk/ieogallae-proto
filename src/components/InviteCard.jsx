import { Bird, Avatar } from './ui.jsx'

const TAPE = { pink: 'tape-pink', check: 'tape-check', stripe: 'tape-stripe' }
// 스티커 자리 (액자 안 %)
const SPOT = { heart: { left: '6%', bottom: '10%' }, star: { left: '12%', top: '36%' }, ribbon: { right: '6%', bottom: '10%' }, sparkle: { right: '18%', top: '30%' } }

// 초대장 카드 (A3-C 미리보기, A4 완성본). deco = planDraft.deco
export default function InviteCard({ title, sub, deco, friends, action, className = '' }) {
  return (
    <div className={`card confirm-card invite-preview ${className}`}>
      <div className="confirm-card__art">
        {deco.tape !== 'none' && <><i className={`deco-tape deco-tape--l ${TAPE[deco.tape]}`} /><i className={`deco-tape deco-tape--r ${TAPE[deco.tape]}`} /></>}
        {deco.stickers.map((s) => (
          <img key={s} className="deco-sticker" src={`/stickers/${s}.svg`} alt="" width="22" height="20" style={SPOT[s]} />
        ))}
        {friends?.[0] && <Avatar name={friends[0]} size={84} />}
        {deco.photo
          ? <img src={deco.photo} alt="초대장 사진" style={{ height: 116, maxWidth: '70%', objectFit: 'cover', border: 'var(--line)' }} />
          : <Bird mood={deco.pose} size={110} />}
        {friends?.[1] && <Avatar name={friends[1]} size={84} />}
      </div>
      <div className="confirm-card__body">
        <div className="confirm-card__row">
          <div>
            <p className="t-body" style={{ fontWeight: 700 }}>{title}</p>
            <p className="t-caption" style={{ color: 'var(--c-deep)' }}>{sub}</p>
          </div>
          {action}
        </div>
      </div>
    </div>
  )
}

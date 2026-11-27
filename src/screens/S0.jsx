import { useEffect } from 'react'
import { Screen, Bird, Logo } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'

// S0 스플래시: 잠깐 보여주고 L0로
export default function S0({ overlay = false }) {
  const go = useGo()
  useEffect(() => {
    if (overlay) return
    const t = setTimeout(() => go('L0', { replace: true }), 1600)
    return () => clearTimeout(t)
  }, [overlay])
  return (
    <Screen className={overlay ? 'splash' : 'splash splash--page'}>
      <div className="frame" style={{ width: 144, height: 144, minHeight: 0, padding: 8 }}>
        <Bird mood="hello" size={120} />
      </div>
      <Logo w={288} />
      <p className="t-body" style={{ fontWeight: 700 }}>올해 못 본 친구, 연말엔 꼭 봐야지! <span style={{ color: 'var(--c-pink)' }}>♥</span></p>
      <div className="splash__dots">
        <span><i style={{ background: 'var(--c-primary)' }} /><i style={{ background: 'var(--c-pink)' }} /><i style={{ background: 'var(--c-yellow)' }} /></span>
        <p className="t-caption">70%만 모여도 만날 날이 정해져요</p>
      </div>
    </Screen>
  )
}

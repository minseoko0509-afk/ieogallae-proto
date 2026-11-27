import { useRef } from 'react'
import { Screen, Button, TopBar } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useStore, responseDraft, allOkDays } from '../lib/drafts.js'

const MAX = 3

const ImageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="4" y="4" width="16" height="16" /><path d="M4 16l5-5 5 5 2-2 4 4" /><circle cx="15" cy="9" r="1.5" /></svg>
)
export const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ flex: 'none' }}><rect x="5" y="11" width="14" height="10" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /><path d="M12 15v2" /></svg>
)

// B3 캡처 업로드: 월간 달력 캡처 1~3장
export default function B3() {
  const go = useGo()
  const [draft, set] = useStore(responseDraft)
  const input = useRef()
  const files = draft.files

  const add = (list) => {
    const next = [...files]
    for (const f of list) {
      if (next.length >= MAX) break
      next.push({ id: `${f.name}-${Date.now()}-${next.length}`, name: f.name, url: URL.createObjectURL(f) })
    }
    set({ files: next })
  }
  const addSample = () =>
    files.length < MAX && set({ files: [...files, { id: `sample-${Date.now()}`, name: '예시 캡처', url: null }] })
  const remove = (id) => set({ files: files.filter((f) => f.id !== id) })

  return (
    <Screen>
      <TopBar />
      <p className="t-title">월간 달력 캡처 1~3장 올려줘</p>
      <div className="thumbs">
        {files.map((f) => (
          <div key={f.id} className="thumb">
            {f.url ? <img src={f.url} alt={f.name} /> : <><ImageIcon /><span>12월 캡처</span></>}
            <button type="button" className="thumb__x" aria-label={`${f.name} 삭제`} onClick={() => remove(f.id)}>✕</button>
          </div>
        ))}
        {Array.from({ length: MAX - files.length }, (_, i) => (
          <button key={i} type="button" className="thumb thumb--add" onClick={() => input.current.click()}>+ 추가</button>
        ))}
        <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => { add([...e.target.files]); e.target.value = '' }} />
      </div>
      <div className="card stack" style={{ minHeight: 124, alignItems: 'center', justifyContent: 'center', gap: 4, textAlign: 'center' }}>
        <p className="t-caption">[예시: 월간 캘린더 캡처 화면]</p>
        <p className="t-caption" style={{ color: 'var(--c-deep)' }}>캘린더 앱을 <b>월간 보기</b>로 바꾸고 캡처해줘</p>
        <Button variant="text" style={{ minHeight: 32, padding: 0, fontSize: 12 }} onClick={addSample}>예시 캡처로 해보기 (데모)</Button>
      </div>
      <div className="card note">
        <LockIcon />
        <p className="t-caption" style={{ color: 'var(--c-ink)' }}>캡처는 분석 후 바로 지워. 읽은 일정 내용은 너만 볼 수 있어</p>
      </div>
      <div className="bottom">
        <Button variant="primary" disabled={!files.length} onClick={() => go('B4')}>분석하기</Button>
        <Button variant="text" onClick={() => { set({ days: allOkDays(), source: 'manual' }); go('B5-M') }}>캘린더 안 써요</Button>
      </div>
    </Screen>
  )
}

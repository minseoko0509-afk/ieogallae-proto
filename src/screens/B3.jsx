import { useRef } from 'react'
import { Screen, Button, Illust } from '../components/ui.jsx'
import { useGo } from '../router/useGo.js'
import { useStore, responseDraft, allOkDays } from '../lib/drafts.js'

const MAX = 3

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
      <p className="t-title">달력 캡처를 올려줘</p>
      <p className="t-caption">월간 달력 화면 1~3장. 뱁새가 되는 날을 읽어줄게</p>
      <div className="row" style={{ gap: 10, flexWrap: 'nowrap' }}>
        {files.map((f) => (
          <div key={f.id} className="thumb">
            {f.url ? <img src={f.url} alt={f.name} /> : <Illust label="예시 캡처" h="100%" style={{ borderRadius: 0, border: 0 }} />}
            <button type="button" className="thumb__x" aria-label={`${f.name} 삭제`} onClick={() => remove(f.id)}>✕</button>
          </div>
        ))}
        {files.length < MAX && (
          <button type="button" className="thumb thumb--add" onClick={() => input.current.click()}>
            <span style={{ fontSize: 24 }}>+</span>
            <span className="t-caption">캡처 추가</span>
          </button>
        )}
        <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => { add([...e.target.files]); e.target.value = '' }} />
      </div>
      <div className="card row" style={{ gap: 12, flexWrap: 'nowrap' }}>
        <Illust label="예시: 월간 보기 캡처" h={90} w={70} style={{ flex: 'none' }} />
        <div className="stack" style={{ gap: 4 }}>
          <p className="t-caption" style={{ color: 'var(--c-ink)' }}>캘린더 앱을 <b>월간 보기</b>로 바꾸고 캡처해줘</p>
          <Button variant="text" style={{ alignSelf: 'flex-start', padding: 0 }} onClick={addSample}>예시 캡처로 해보기 (데모)</Button>
        </div>
      </div>
      <div className="card note">
        <p className="t-caption" style={{ color: 'var(--c-ink)' }}>캡처는 분석 후 바로 지워. 읽은 일정 내용은 너만 볼 수 있어</p>
      </div>
      <div className="bottom">
        <Button variant="primary" disabled={!files.length} onClick={() => go('B4')}>분석하기</Button>
        <Button variant="text" onClick={() => { set({ days: allOkDays(), source: 'manual' }); go('B5-M') }}>캘린더 안 써요</Button>
      </div>
    </Screen>
  )
}

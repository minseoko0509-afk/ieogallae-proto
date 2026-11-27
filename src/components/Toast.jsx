import { useState, useCallback, useRef } from 'react'

// const [toast, show] = useToast(); show('복사했어 콕'); ... {toast}
export function useToast(ms = 1600) {
  const [msg, setMsg] = useState(null)
  const t = useRef()
  const show = useCallback((m) => {
    setMsg(m)
    clearTimeout(t.current)
    t.current = setTimeout(() => setMsg(null), ms)
  }, [ms])
  return [msg ? <div className="toast" role="status">{msg}</div> : null, show]
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    /* 프로토타입: 권한 없어도 토스트는 띄운다 */
  }
}

// 데모 컨트롤 패널 (spec.md "데모 컨트롤 패널"). 폰 프레임 오른쪽 바깥에 놓는다.
// 값을 바꾸면 단일 상태(AppState)가 바로 바뀌고, /p/{id} 화면은 resolveScreen으로 다시 분기된다.
import { useAppState } from '../state/AppState.jsx';
import { EVENT } from '../state/sampleData.js';
import {
  ROLES, ROLE_LABEL, CAPTURES, CAPTURE_LABEL,
  responseCount, need, resolveScreen, explainScreen, me, respondedNames,
} from '../state/selectors.js';
import { SCREENS, GROUPS } from '../screens/registry.js';
import './DemoPanel.css';


function Seg({ name, options, labels, value, onChange }) {
  return (
    <div className="demo-seg" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <button
          key={String(o)}
          type="button"
          role="radio"
          aria-checked={value === o}
          className={value === o ? 'on' : ''}
          onClick={() => onChange(o)}
        >
          {labels[o]}
        </button>
      ))}
    </div>
  );
}

// onJump(screenId): 화면 바로가기. onFollowState(): 지금 상태대로 /p/{id} 보기.
// currentScreen: 지금 폰 프레임에 떠 있는 화면 ID (강조 표시용, 선택)
export default function DemoPanel({ onJump, onFollowState, currentScreen }) {
  const { state, actions } = useAppState();
  const n = responseCount(state);
  const target = resolveScreen(state);
  const who = me(state);

  return (
    <aside className="demo-panel" aria-label="데모 컨트롤 패널">
      <div className="demo-head">
        <strong>데모 컨트롤</strong>
        <button type="button" className="demo-link" onClick={actions.reset}>초기화</button>
      </div>

      <section>
        <h3>역할</h3>
        <Seg name="역할" options={ROLES} labels={ROLE_LABEL} value={state.role} onChange={actions.setRole} />
        <p className="demo-note">
          {who ? `지금 "나" = ${who}` : state.role === 'responded' ? '응답자로 보려면 응답 수를 2 이상으로' : '전원 응답함: 새 이름으로 들어온 사람'}
        </p>
      </section>

      <section>
        <h3>응답 수 <span className="demo-val">{n} / {EVENT.N}</span></h3>
        <div className="demo-stepper">
          <button type="button" aria-label="응답 수 줄이기" disabled={n <= 0} onClick={() => actions.setResponseCount(n - 1)}>−</button>
          <input
            type="range" min={0} max={EVENT.N} value={n}
            aria-label="응답 수"
            onChange={(e) => actions.setResponseCount(Number(e.target.value))}
          />
          <button type="button" aria-label="응답 수 늘리기" disabled={n >= EVENT.N} onClick={() => actions.setResponseCount(n + 1)}>+</button>
        </div>
        <p className="demo-note">
          70% 기준 {need()}명 · 응답: {respondedNames(state).join(', ') || '없음'}
        </p>
      </section>

      <section>
        <h3>마감</h3>
        <Seg name="마감" options={[false, true]} labels={{ false: '마감 전', true: '마감 후' }}
          value={state.deadlinePassed} onChange={actions.setDeadlinePassed} />
        <p className="demo-note">마감 {EVENT.deadline.slice(5).replace('-', '/')}(목) {EVENT.deadlineTime}</p>
      </section>

      <section>
        <h3>확정 여부</h3>
        <Seg name="확정 여부" options={[false, true]} labels={{ false: '미확정', true: '확정' }}
          value={Boolean(state.confirmed)}
          onChange={(v) => (v ? actions.confirm() : actions.cancelConfirm())} />
        {state.confirmed && (
          <p className="demo-note">{state.confirmed.date.slice(5).replace('-', '/')} {state.confirmed.time}</p>
        )}
      </section>

      <section>
        <h3>캡처 분석</h3>
        <Seg name="캡처 분석" options={CAPTURES} labels={CAPTURE_LABEL} value={state.capture} onChange={actions.setCapture} />
      </section>

      <section className="demo-result">
        <h3>/p/{EVENT.id} 진입 시</h3>
        <p><span className="demo-chip on">{target}</span> {explainScreen(state)}</p>
        {onFollowState && (
          <button type="button" className="demo-btn" onClick={onFollowState}>이 상태로 보기</button>
        )}
      </section>

      <section>
        <h3>화면 바로가기</h3>
        {GROUPS.map((g) => (
          <div key={g.key} className="demo-group">
            <span className="demo-group-label">{g.label}</span>
            <div className="demo-chips">
              {SCREENS.filter((sc) => sc.group === g.key).map(({ id, title }) => (
                <button
                  key={id}
                  type="button"
                  className={`demo-chip${currentScreen === id ? ' on' : ''}`}
                  aria-current={currentScreen === id ? 'page' : undefined}
                  title={title}
                  onClick={() => onJump?.(id)}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
}

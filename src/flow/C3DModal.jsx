// C3-D 마감 후 70% 미만 (주도자). C1 위에 dim + 모달 2단계.
//   모달 1 "마감됐는데 n명만 답했어. 이대로 확정할까?" [아니오] / [예 → Top3 공개]
//   모달 2 "확정 안 하면 공유 링크가 안 만들어져. 그래도 미룰까?" [미룰래 → C1 유지] / [확정할래 → C3]
import { useState } from 'react';
import { useAppState } from '../state/AppState.jsx';
import { responseCount } from '../state/selectors.js';
import './C3DModal.css';

// background: 모달 뒤에 깔 화면 (보통 C1). onGoC3: C3로 이동
export default function C3DModal({ background = null, onGoC3 }) {
  const { state, actions } = useAppState();
  const [step, setStep] = useState(1);
  const n = responseCount(state);

  return (
    <div className="c3d">
      <div className="c3d-bg" aria-hidden="true">{background}</div>
      <div className="c3d-dim" />
      <div className="c3d-modal" role="alertdialog" aria-modal="true" aria-labelledby="c3d-q">
        {step === 1 ? (
          <>
            <p id="c3d-q" className="c3d-q">마감됐는데 {n}명만 답했어.<br />이대로 확정할까?</p>
            <div className="c3d-actions">
              <button type="button" className="c3d-btn2" onClick={() => setStep(2)}>아니오</button>
              <button type="button" className="c3d-btn" onClick={actions.revealEarly}>예, Top3 볼래</button>
            </div>
          </>
        ) : (
          <>
            <p id="c3d-q" className="c3d-q">확정 안 하면 공유 링크가 안 만들어져. 그래도 미룰까?</p>
            <div className="c3d-actions">
              <button type="button" className="c3d-btn2" onClick={actions.deferC3D}>미룰래</button>
              <button
                type="button"
                className="c3d-btn"
                onClick={() => { actions.revealEarly(); onGoC3?.(); }}
              >
                확정할래
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

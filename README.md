# 이어갈래? 프로토타입

연말 약속 날짜 조율 모바일 웹 프로토타입. 화면 명세는 [spec.md](spec.md), 와이어프레임은 `wireframes/`.

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # dist/ 에 정적 빌드 (아무 정적 호스팅에 올리면 됨)
```

## 구조

```
src/
  main.jsx               HashRouter + 전역 CSS
  App.jsx                무대: 폰 프레임(라우트) + 오른쪽 패널 슬롯(.side-slot)
  styles/tokens.css      디자인 토큰 (CSS 변수)
  styles/base.css        공통 클래스 (버튼, 칩, 입력, 카드, 시트, 모달 …)
  components/
    PhoneFrame.jsx       390×844 폰 프레임 + 좌측 상단 화면 ID 라벨
    ui.jsx               Screen, Illust, Button, Chip, Steps, BottomSheet, Modal
    Placeholder.jsx      아직 안 만든 화면 자리
    ScreenNav.jsx        임시 화면 바로가기 (데모 패널로 교체 예정)
  screens/
    registry.js          24개 화면 ID 목록 (그룹, 종류, base, spec URL)
    index.js             화면 ID → 컴포넌트 매핑
    <ID>.jsx             화면 하나당 파일 하나. ID에서 '-'를 뺀 이름 (B5-S → B5S.jsx)
  router/
    routes.jsx           URL 라우트, /p/:id 상태 분기 자리(resolvePlanScreen)
    ScreenHost.jsx       화면 ID를 폰 프레임에 그림. modal/sheet는 base 화면 위에 띄움
    useGo.js             화면 전환 훅: go('B2')
```

## 규약

- **화면 파일**: `src/screens/<ID>.jsx`, default export 컴포넌트. 최상위를 `<Screen>`으로 감싼다.
  modal/sheet 화면(A3-M, B5-S, C2-S, C3-D, D2)은 `<Modal>`/`<BottomSheet>`만 반환하면 된다. 뒤 화면은 ScreenHost가 깔아준다.
- **화면 전환**: `const go = useGo(); go('B6')`. 모든 화면은 `#/s/<ID>` 로도 바로 열린다.
- **실제 URL**: `#/` L0, `#/new` A1, `#/p/:id` (상태로 화면 결정), `#/p/:id/c` D1.
- **스타일**: 색·글자 크기는 `tokens.css` 변수만 쓴다. `--c-white --c-gray-1 --c-gray-2 --c-gray-3 --c-ink`,
  `--fs-title(22) --fs-body(15) --fs-caption(12)`, `--touch(44px)`. 주요 CTA만 `<Button variant="primary">`.
- **일러스트**: `<Illust label="뱁새" h={180} />` (회색 박스 + 라벨).

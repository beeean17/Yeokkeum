# Changelog

All notable changes to Saekim will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2025-12-23

### ✨ Added

#### UI/UX Enhancements
- **Resize Overlay**: 창 크기 조정 중 반투명 오버레이와 "크기 조정 중..." 메시지 표시
  - 150ms debounce로 부드러운 사용자 경험 제공
  - Pretendard 폰트로 일관된 타이포그래피
- **Pretendard Font Bundling**: 시스템 폰트 의존성 제거
  - Variable font (PretendardVariable.ttf) 번들링
  - 앱 시작 시 자동 로드 (QFontDatabase)
  - UI 전체에 일관된 폰트 적용

#### ViewToggleButton 스타일 개선
- **모든 테마 지원**: Edit/View/Split 버튼의 active/inactive 상태를 명확히 구분
  - **Nord**: Active (청록 배경/#88C0D0), Inactive (회색 배경)
  - **Dark**: Active (파란 배경/#007ACC), Inactive (어두운 회색)
  - **Catppuccin**: Active (라벤더 배경/#89b4fa), Inactive (중간 회색)
  - **White**: Active (검은 배경), Inactive (밝은 회색)
  - **Black**: Active (흰 배경), Inactive (어두운 회색)
  - **GitHub Primer**: Active (GitHub 파랑/#0366d6), Inactive (중간 회색)
- **시각적 피드백**: Bold 폰트, hover 효과, 부드러운 색상 전환

#### 파일 새로고침 기능
- **수동 새로고침**: F5 단축키 및 툴바 새로고침 버튼 추가
- **자동 새로고침**: QFileSystemWatcher를 사용한 외부 파일 변경 감지
  - 파일이 외부에서 수정될 때 자동으로 콘텐츠 리로드
  - 파일 삭제/이름 변경 등 edge case 처리

### 🐛 Fixed
- **Black Screen on Resize**: 창 크기 조정 시 에디터/프리뷰 영역이 검게 변하는 문제 해결
  - JavaScript opacity toggle (0.999 → 1)로 강제 reflow
  - 리사이즈 오버레이로 시각적 피드백 제공
- **Edit/View Button State**: 버튼 선택 상태가 불명확했던 문제 개선
  - 테마별 커스텀 스타일링
  - Active 상태의 명확한 시각적 구분

### 📝 Documentation
- **LICENSES.md**: Pretendard 폰트 라이센스 추가 (SIL OFL-1.1)
- **.gitignore**: 빌드 결과물, 임시 파일, 사용자 데이터 제외 규칙 강화
  - `*.exe`, `*.msi` 등 빌드 파일
  - `src/resources/fonts/*.zip` 폰트 압축 파일
  - `.saekim/` 사용자 세션 데이터
  - `*_OLD.*`, `*_BACKUP.*` 백업 파일

### 🔧 Technical Details
- **Font Loading**: Pretendard Variable 폰트를 main.py에서 QFontDatabase로 로드
- **Resize Handler**: 150ms debounce timer + forced webview repaint
- **File Watcher**: QFileSystemWatcher를 MainWindow에 통합
- **Theme System**: ViewToggleButton 스타일을 모든 테마 QSS 파일에 추가

---

## [1.1.0] - 2024-12-21

### ✨ Added
- **Auto-Update Feature**: GitHub Releases API 통합
  - 백그라운드 업데이트 확인 (앱 시작 2초 후)
  - 업데이트 알림 다이얼로그
  - 다운로드 진행률 표시
  - Inno Setup 설치 프로그램 자동 실행 (/SILENT 플래그)
- **Drag & Drop File Opening**: 마크다운, 텍스트, PDF 파일 드래그 앤 드롭
  - 드래그 시 시각적 오버레이 (청록색 점선 테두리)
  - PDF 파일 자동 변환 및 열기

### 🔧 Performance
- **Code Refactoring**: 82줄의 중복/불필요 코드 제거
  - `converter.py`, `main_window.py`, `title_bar.py` 등 6개 파일
- **Loading Time Optimization**: 앱 시작 시간 26% 개선
  - `backend.api` 로딩 시간: 89ms → 18ms (79% 개선)
  - 총 시작 시간: 235ms → 175ms
  - `DocumentConverter` lazy loading 구현

### 📝 Documentation
- **License Update**: AGPL-3.0로 변경 (PyMuPDF 요구사항)
- **LICENSES.md**: 실제 종속성만 포함 (420줄 → 150줄)
  - Python 의존성: PyQt6, Playwright, PyMuPDF, pdfplumber, Markdown
  - JS 의존성 (CDN): Marked.js, DOMPurify, Highlight.js, Mermaid.js, KaTeX

### 🛠️ Build & Distribution
- **Inno Setup Configuration**: `installer.iss` 버전 1.1.0 업데이트
  - 빈 Tasks 섹션 오류 수정
  - LICENSE 파일 AGPL-3.0 반영

---

## [1.0.0] - 2024-12-20

### 🎉 Initial Release

#### Core Features
- **Real-time Markdown Editing**: Split view with live preview
- **Code Highlighting**: Highlight.js 11.9.0 지원 (9개 언어)
- **Diagram Rendering**: Mermaid.js 10.6.1 지원 (9종 다이어그램)
- **Math Equations**: KaTeX 0.16.9 지원
- **Multi-tab Editing**: 여러 파일 동시 편집
- **Session Management**: 자동 세션 저장 및 복원
- **File Explorer**: 사이드바 파일 탐색기
- **Theme System**: 5개 테마 (Nord, Dark, Catppuccin, GitHub Primer, Paper)

#### Document Conversion
- **Markdown → PDF**: Playwright 기반 고품질 변환
- **PDF → Markdown**: PyMuPDF 기반 텍스트 추출
- **Table Extraction**: pdfplumber를 사용한 PDF 테이블 추출

#### UI/UX
- **Custom Title Bar**: Windows Aero Snap 지원
- **Markdown Helper**: Ctrl+Shift+D 마크다운 문법 도우미
- **Diagram Helper**: Ctrl+Shift+M 다이어그램 삽입 도우미
- **Find & Replace**: Ctrl+F 찾기, Ctrl+H 바꾸기 (정규표현식 지원)

#### Platform
- **Windows Support**: PyInstaller + Inno Setup 빌드 시스템
- **Python 3.10+**: PyQt6 6.6.0+ 기반
- **Local-First**: 오프라인 작업, 프라이버시 보호

---

## Version Comparison

| Version | Release Date | Key Features |
|---------|--------------|--------------|
| 1.2.0 | 2025-12-23 | Resize overlay, Pretendard font, ViewToggle styles, Refresh feature |
| 1.1.0 | 2024-12-21 | Auto-update, Drag & drop, Performance optimization |
| 1.0.0 | 2024-12-20 | Initial release with core features |

---

**Legend:**
- ✨ Added: 새로운 기능
- 🐛 Fixed: 버그 수정
- 🔧 Performance: 성능 개선
- 📝 Documentation: 문서 업데이트
- 🛠️ Build: 빌드/배포 관련

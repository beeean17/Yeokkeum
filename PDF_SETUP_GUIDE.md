# PDF 변환 설정 가이드

## Playwright 설치 (PDF 변환에 필요)

새김 마크다운 에디터의 PDF 변환 기능은 Playwright를 사용합니다.

## 설치 방법

### 1. Playwright 패키지 설치

```bash
pip install playwright
```

### 2. Chromium 브라우저 설치

```bash
playwright install chromium
```

이 명령어는 PDF 생성에 사용되는 Chromium 브라우저를 자동으로 다운로드합니다.

## 전체 설치 (한 번에)

```bash
pip install playwright && playwright install chromium
```

## 장점

Playwright 기반 PDF 변환의 장점:
- GTK3 런타임 불필요 (Windows에서 설치가 간편)
- 미리보기와 동일한 렌더링 결과 (Chromium 엔진 사용)
- KaTeX 수식, Mermaid 다이어그램 완벽 지원
- 완전한 CSS3 지원

## 문제 해결

### "Playwright가 설치되지 않았습니다" 오류

```bash
pip install playwright
playwright install chromium
```

### Chromium 다운로드 실패

프록시 환경에서는 다음과 같이 설정:

```bash
set HTTPS_PROXY=http://your-proxy:port
playwright install chromium
```

### 설치 후에도 작동하지 않는 경우

1. 가상환경 재활성화:
   ```bash
   venv\Scripts\activate
   pip install --upgrade playwright
   playwright install chromium
   ```

2. 앱 재시작

## 참고 링크

- Playwright 공식 문서: https://playwright.dev/python/
- 새김 GitHub: (프로젝트 GitHub 링크)

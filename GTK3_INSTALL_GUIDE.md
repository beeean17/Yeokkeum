# GTK3 설치 가이드 (Windows)

## PDF 변환 기능을 위한 GTK3 런타임 설치

새김 마크다운 에디터의 PDF 변환 기능은 WeasyPrint 라이브러리를 사용하며, Windows에서는 GTK3 런타임이 필요합니다.

## 설치 방법

### 옵션 1: 공식 설치 프로그램 사용 (권장)

1. 다음 링크에서 GTK3 런타임 설치 프로그램 다운로드:
   https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer/releases

2. 최신 버전의 `gtk3-runtime-x.x.x-x-x-x-ts-win64.exe` 다운로드

3. 설치 프로그램 실행 및 기본 옵션으로 설치

4. 설치 완료 후 새김 재시작

### 옵션 2: MSYS2 사용

```bash
# MSYS2 설치 후
pacman -S mingw-w64-x86_64-gtk3
```

### 옵션 3: GTK3 없이 사용 (제한적)

GTK3를 설치하지 않아도 다음 기능들은 정상 작동합니다:
- ✅ 마크다운 편집
- ✅ 실시간 미리보기
- ✅ 이미지 삽입
- ✅ 코드 하이라이팅
- ✅ 다이어그램 렌더링 (Mermaid)
- ✅ 수식 렌더링 (KaTeX)
- ❌ PDF 변환 (GTK3 필요)

## 설치 확인

설치가 완료되면 앱을 재시작하고 PDF 내보내기 기능을 테스트하세요.

## 문제 해결

### "cannot load library 'libgobject-2.0-0'" 오류

이 오류는 GTK3가 설치되지 않았거나 PATH에 등록되지 않았음을 의미합니다.

**해결 방법:**
1. GTK3 런타임 설치 (위 방법 참고)
2. 시스템 환경 변수 PATH에 GTK3 bin 디렉토리 추가
   - 기본 경로: `C:\Program Files\GTK3-Runtime Win64\bin`

### 설치 후에도 작동하지 않는 경우

1. 시스템 재부팅
2. 가상환경 재생성:
   ```bash
   rm -rf venv
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

## 대체 방법 (향후 계획)

향후 버전에서는 PyQt6의 내장 PDF 기능을 사용하여 GTK3 의존성을 제거할 예정입니다.

## 참고 링크

- GTK for Windows: https://www.gtk.org/docs/installations/windows/
- WeasyPrint 문서: https://doc.courtbouillon.org/weasyprint/
- 새김 GitHub Issues: (프로젝트 GitHub 링크)

@echo off
chcp 65001 > nul
echo ========================================
echo  새김 (Saekim) 설치 프로그램 빌드
echo ========================================
echo.

echo [1/3] 기존 빌드 폴더 정리...
if exist dist\Saekim.exe (
    echo   - 기존 EXE 파일 삭제 중...
    del /F /Q dist\Saekim.exe
)
if exist dist\installer (
    echo   - 기존 설치 프로그램 폴더 삭제 중...
    rmdir /S /Q dist\installer
)
echo   완료!
echo.

echo [2/3] PyInstaller로 EXE 파일 생성 중...
pyinstaller saekim.spec
if errorlevel 1 (
    echo   오류: EXE 파일 생성 실패!
    pause
    exit /b 1
)
echo   완료!
echo.

echo [3/3] Inno Setup으로 설치 프로그램 생성 중...
if exist "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" (
    "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" installer.iss
) else if exist "C:\Program Files\Inno Setup 6\ISCC.exe" (
    "C:\Program Files\Inno Setup 6\ISCC.exe" installer.iss
) else (
    echo   오류: Inno Setup이 설치되지 않았습니다!
    echo   다운로드: https://jrsoftware.org/isdl.php
    pause
    exit /b 1
)

if errorlevel 1 (
    echo   오류: 설치 프로그램 생성 실패!
    pause
    exit /b 1
)
echo   완료!
echo.

echo ========================================
echo  빌드 완료!
echo ========================================
echo.
echo 설치 프로그램 위치:
echo   dist\installer\Saekim-Setup-v1.2.0.exe
echo.
echo 파일 크기:
for %%A in (dist\installer\Saekim-Setup-v*.exe) do echo   %%~zA bytes
echo.
pause
; Inno Setup Script for Saekim (새김) Markdown Editor
; Copyright (C) 2025 윤성빈 (Yoon Seongbin)
; Licensed under AGPL-3.0

#define MyAppName "새김"
#define MyAppEnglishName "Saekim"
#define MyAppVersion "1.1.0"
#define MyAppPublisher "윤성빈"
#define MyAppURL "https://github.com/beeean17/Saekim"
#define MyAppExeName "Saekim.exe"
#define MyAppDescription "코드와 다이어그램을 자유롭게 다루는 개발자를 위한 로컬 마크다운 에디터"

[Setup]
; 기본 정보
AppId={{8A7B3C4D-5E6F-4A8B-9C0D-1E2F3A4B5C6D}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}/issues
AppUpdatesURL={#MyAppURL}/releases
AppComments={#MyAppDescription}

; 설치 경로
DefaultDirName={autopf}\{#MyAppEnglishName}
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes

; 출력 설정
OutputDir=dist\installer
OutputBaseFilename=Saekim-Setup-v{#MyAppVersion}
SetupIconFile=src\resources\icons\app_icon.ico
UninstallDisplayIcon={app}\{#MyAppExeName}

; 압축 설정
Compression=lzma2/max
SolidCompression=yes

; 권한 및 아키텍처
PrivilegesRequired=admin
PrivilegesRequiredOverridesAllowed=dialog
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64

; 라이선스
LicenseFile=Licenses\LICENSE

; UI 설정
WizardStyle=modern
DisableWelcomePage=no
ShowLanguageDialog=yes

; 버전 정보
VersionInfoVersion={#MyAppVersion}
VersionInfoCompany={#MyAppPublisher}
VersionInfoDescription={#MyAppDescription}
VersionInfoCopyright=Copyright (C) 2025 {#MyAppPublisher}
VersionInfoProductName={#MyAppName}
VersionInfoProductVersion={#MyAppVersion}

[Languages]
Name: "korean"; MessagesFile: "compiler:Languages\Korean.isl"
Name: "english"; MessagesFile: "compiler:Default.isl"

[CustomMessages]
korean.AdditionalIcons=추가 아이콘:
korean.CreateDesktopIcon=바탕화면에 바로가기 만들기
korean.CreateQuickLaunchIcon=빠른 실행 바에 바로가기 만들기
korean.LaunchProgram={#MyAppName} 실행
korean.AssociateFiles=.md 파일을 {#MyAppName}과(와) 연결

english.AdditionalIcons=Additional icons:
english.CreateDesktopIcon=Create a desktop shortcut
english.CreateQuickLaunchIcon=Create a Quick Launch shortcut
english.LaunchProgram=Launch {#MyAppName}
english.AssociateFiles=Associate .md files with {#MyAppName}

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1; Check: not IsAdminInstallMode
Name: "associatefiles"; Description: "{cm:AssociateFiles}"; GroupDescription: "파일 연결:"; Flags: unchecked

[Files]
; 메인 실행 파일
Source: "dist\Saekim.exe"; DestDir: "{app}"; Flags: ignoreversion

; 라이선스 파일
Source: "Licenses\LICENSE"; DestDir: "{app}\Licenses"; Flags: ignoreversion
Source: "Licenses\LICENSES.md"; DestDir: "{app}\Licenses"; Flags: ignoreversion; Tasks:

; README
Source: "README.md"; DestDir: "{app}"; Flags: ignoreversion isreadme

[Icons]
; 시작 메뉴 그룹
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\README"; Filename: "{app}\README.md"
Name: "{group}\{#MyAppName} 제거"; Filename: "{uninstallexe}"

; 바탕화면 바로가기
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

; 빠른 실행 바로가기
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: quicklaunchicon

[Registry]
; .md 파일 연결 (선택 사항)
Root: HKA; Subkey: "Software\Classes\.md"; ValueType: string; ValueName: ""; ValueData: "SaekimMarkdownFile"; Flags: uninsdeletevalue; Tasks: associatefiles
Root: HKA; Subkey: "Software\Classes\SaekimMarkdownFile"; ValueType: string; ValueName: ""; ValueData: "Saekim Markdown File"; Flags: uninsdeletekey; Tasks: associatefiles
Root: HKA; Subkey: "Software\Classes\SaekimMarkdownFile\DefaultIcon"; ValueType: string; ValueName: ""; ValueData: "{app}\{#MyAppExeName},0"; Tasks: associatefiles
Root: HKA; Subkey: "Software\Classes\SaekimMarkdownFile\shell\open\command"; ValueType: string; ValueName: ""; ValueData: """{app}\{#MyAppExeName}"" ""%1"""; Tasks: associatefiles

; 프로그램 등록
Root: HKA; Subkey: "Software\{#MyAppEnglishName}"; Flags: uninsdeletekeyifempty
Root: HKA; Subkey: "Software\{#MyAppEnglishName}\{#MyAppVersion}"; ValueType: string; ValueName: "InstallPath"; ValueData: "{app}"; Flags: uninsdeletekey

[Run]
; 설치 완료 후 실행 옵션
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
; 사용자 데이터는 삭제하지 않음 (설정 파일 등)
Type: filesandordirs; Name: "{app}\temp"

[Code]
// 이전 버전 확인 및 제거
function GetUninstallString(): String;
var
  sUnInstPath: String;
  sUnInstallString: String;
begin
  sUnInstPath := ExpandConstant('Software\Microsoft\Windows\CurrentVersion\Uninstall\{#emit SetupSetting("AppId")}_is1');
  sUnInstallString := '';
  if not RegQueryStringValue(HKLM, sUnInstPath, 'UninstallString', sUnInstallString) then
    RegQueryStringValue(HKCU, sUnInstPath, 'UninstallString', sUnInstallString);
  Result := sUnInstallString;
end;

function IsUpgrade(): Boolean;
begin
  Result := (GetUninstallString() <> '');
end;

function UnInstallOldVersion(): Integer;
var
  sUnInstallString: String;
  iResultCode: Integer;
begin
  Result := 0;
  sUnInstallString := GetUninstallString();
  if sUnInstallString <> '' then begin
    sUnInstallString := RemoveQuotes(sUnInstallString);
    if Exec(sUnInstallString, '/SILENT /NORESTART /SUPPRESSMSGBOXES','', SW_HIDE, ewWaitUntilTerminated, iResultCode) then
      Result := 3
    else
      Result := 2;
  end else
    Result := 1;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if (CurStep=ssInstall) then
  begin
    if (IsUpgrade()) then
    begin
      UnInstallOldVersion();
    end;
  end;
end;

"""
Update Dialog Module
Provides UI for update notifications and download progress.
"""

from PyQt6.QtWidgets import (
    QDialog, QVBoxLayout, QHBoxLayout, QLabel, 
    QPushButton, QProgressBar, QTextEdit
)
from PyQt6.QtCore import Qt, QThread, pyqtSignal
from PyQt6.QtGui import QFont

from utils.update_manager import UpdateManager, UpdateInfo
from utils.design_manager import DesignManager


class DownloadThread(QThread):
    """Background thread for downloading updates"""
    progress = pyqtSignal(int, int)  # downloaded, total
    finished = pyqtSignal(object)  # path or None
    
    def __init__(self, update_manager: UpdateManager, download_url: str):
        super().__init__()
        self.update_manager = update_manager
        self.download_url = download_url
    
    def run(self):
        path = self.update_manager.download_update(
            self.download_url,
            progress_callback=lambda d, t: self.progress.emit(d, t)
        )
        self.finished.emit(path)


class UpdateDialog(QDialog):
    """Dialog showing update availability and download progress"""
    
    def __init__(self, update_info: UpdateInfo, parent=None):
        super().__init__(parent)
        self.update_info = update_info
        self.update_manager = UpdateManager()
        self.installer_path = None
        self.download_thread = None
        
        self.setWindowTitle("업데이트 사용 가능")
        self.setFixedWidth(450)
        self.setWindowFlags(self.windowFlags() & ~Qt.WindowType.WindowContextHelpButtonHint)
        
        self.setup_ui()
    
    def setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setSpacing(15)
        layout.setContentsMargins(20, 20, 20, 20)
        
        # Title
        title = QLabel(f"새김 {self.update_info.version} 업데이트")
        title.setFont(DesignManager.get_font("large"))
        title.setStyleSheet("font-weight: bold;")
        layout.addWidget(title)
        
        # Current version info
        version_label = QLabel(f"현재 버전: v{UpdateManager.CURRENT_VERSION}")
        version_label.setStyleSheet("color: gray;")
        layout.addWidget(version_label)
        
        # Release notes
        if self.update_info.release_notes:
            notes_label = QLabel("변경 사항:")
            layout.addWidget(notes_label)
            
            notes = QTextEdit()
            notes.setReadOnly(True)
            notes.setMaximumHeight(150)
            notes.setPlainText(self.update_info.release_notes)
            layout.addWidget(notes)
        
        # Progress bar (hidden initially)
        self.progress_bar = QProgressBar()
        self.progress_bar.setVisible(False)
        self.progress_bar.setTextVisible(True)
        layout.addWidget(self.progress_bar)
        
        # Status label
        self.status_label = QLabel("")
        self.status_label.setVisible(False)
        layout.addWidget(self.status_label)
        
        # Buttons
        button_layout = QHBoxLayout()
        button_layout.setSpacing(10)
        
        self.skip_btn = QPushButton("나중에")
        self.skip_btn.clicked.connect(self.reject)
        button_layout.addWidget(self.skip_btn)
        
        button_layout.addStretch()
        
        self.download_btn = QPushButton("다운로드 및 설치")
        self.download_btn.setDefault(True)
        self.download_btn.clicked.connect(self.start_download)
        button_layout.addWidget(self.download_btn)
        
        layout.addLayout(button_layout)
    
    def start_download(self):
        """Start downloading the update"""
        self.download_btn.setEnabled(False)
        self.skip_btn.setEnabled(False)
        self.progress_bar.setVisible(True)
        self.status_label.setVisible(True)
        self.status_label.setText("다운로드 준비 중...")
        
        self.download_thread = DownloadThread(
            self.update_manager,
            self.update_info.download_url
        )
        self.download_thread.progress.connect(self.on_progress)
        self.download_thread.finished.connect(self.on_download_finished)
        self.download_thread.start()
    
    def on_progress(self, downloaded: int, total: int):
        """Update progress bar"""
        if total > 0:
            percent = int(downloaded * 100 / total)
            self.progress_bar.setValue(percent)
            mb_downloaded = downloaded / (1024 * 1024)
            mb_total = total / (1024 * 1024)
            self.status_label.setText(f"다운로드 중... {mb_downloaded:.1f} / {mb_total:.1f} MB")
    
    def on_download_finished(self, path):
        """Handle download completion"""
        if path:
            self.installer_path = path
            self.status_label.setText("다운로드 완료! 설치를 시작합니다...")
            
            # Launch installer
            if self.update_manager.install_update(path):
                self.status_label.setText("설치 프로그램을 시작했습니다. 앱을 종료합니다...")
                # Close app to allow installation
                if self.parent():
                    self.parent().close()
                self.accept()
            else:
                self.status_label.setText("설치 프로그램 시작 실패")
                self.download_btn.setEnabled(True)
                self.skip_btn.setEnabled(True)
        else:
            self.status_label.setText("다운로드 실패. 다시 시도해주세요.")
            self.download_btn.setEnabled(True)
            self.skip_btn.setEnabled(True)
            self.progress_bar.setValue(0)
    
    def closeEvent(self, event):
        """Clean up on close"""
        if self.download_thread and self.download_thread.isRunning():
            self.download_thread.terminate()
            self.download_thread.wait()
        super().closeEvent(event)

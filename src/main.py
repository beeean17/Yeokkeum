"""
새김 (Saekim) 마크다운 에디터 - 메인 진입점

This file serves as the application entry point.
Initializes the PyQt6 application and creates the main window.
"""

import sys
import os
from pathlib import Path
from PyQt6.QtWidgets import QApplication
from PyQt6.QtCore import Qt

# Suppress GTK3 GLib-GIO warnings on Windows (harmless UWP app scanning messages)
if sys.platform == 'win32':
    os.environ['G_MESSAGES_DEBUG'] = ''
    # Set AppUserModelID to show correct icon in taskbar
    import ctypes
    myappid = 'saekim.editor.1.0' # arbitrary string
    ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID(myappid)

# Add src directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from windows.main_window import MainWindow
from utils.logger import setup_logger


def main():
    """Main application entry point"""
    # Setup logger
    logger = setup_logger()
    logger.info("새김 마크다운 에디터 시작")

    # Enable high DPI scaling
    QApplication.setHighDpiScaleFactorRoundingPolicy(
        Qt.HighDpiScaleFactorRoundingPolicy.PassThrough
    )

    # Create application
    app = QApplication(sys.argv)
    app.setApplicationName("새김")
    app.setOrganizationName("Saekim")
    app.setApplicationDisplayName("새김 - 마크다운 에디터")

    # Set application icon
    icon_path = Path(__file__).parent / 'resources' / 'icons' / 'icon.png'
    if icon_path.exists():
        from PyQt6.QtGui import QIcon
        app.setWindowIcon(QIcon(str(icon_path)))

    # Create and show main window with empty content
    window = MainWindow(initial_file=None, initial_content="")
    window.show()

    logger.info("애플리케이션 윈도우 표시 완료")

    # Start event loop
    sys.exit(app.exec())


if __name__ == "__main__":
    main()

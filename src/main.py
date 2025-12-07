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

# Add src directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from windows.main_window import MainWindow
from utils.logger import setup_logger


def main():
    """Main application entry point"""
    # Setup logger
    logger = setup_logger()
    logger.info("새김 마크다운 에디터 시작")

    # Configure DPI awareness for Windows
    if sys.platform == 'win32':
        try:
            from ctypes import windll
            # Set DPI awareness (Windows 10 version 1607+)
            windll.shcore.SetProcessDpiAwareness(2)  # PROCESS_PER_MONITOR_DPI_AWARE
        except Exception as e:
            logger.warning(f"DPI awareness 설정 실패: {e}")

    # Enable high DPI scaling BEFORE creating QApplication
    # PyQt6 has high DPI support enabled by default
    QApplication.setHighDpiScaleFactorRoundingPolicy(
        Qt.HighDpiScaleFactorRoundingPolicy.PassThrough
    )

    # Create application
    app = QApplication(sys.argv)
    app.setApplicationName("새김")
    app.setOrganizationName("Saekim")
    app.setApplicationDisplayName("새김 - 마크다운 에디터")

    # Create and show main window with empty content
    window = MainWindow(initial_file=None, initial_content="")
    window.show()

    logger.info("애플리케이션 윈도우 표시 완료")

    # Start event loop
    sys.exit(app.exec())


if __name__ == "__main__":
    main()

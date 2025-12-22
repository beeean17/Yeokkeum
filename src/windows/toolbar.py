"""
Toolbar component for formatting actions
"""

from PyQt6.QtWidgets import QToolBar
from PyQt6.QtGui import QAction
from PyQt6.QtCore import Qt


class ToolBar(QToolBar):
    """Toolbar with formatting buttons"""

    def __init__(self, parent):
        super().__init__(parent)
        self.parent = parent
        self.setMovable(False)
        self.setFloatable(False)
        self.create_actions()

    def create_actions(self):
        """Create toolbar actions"""
        # File explorer toggle
        explorer_action = QAction("파일 탐색기", self)
        explorer_action.setCheckable(True)
        explorer_action.setChecked(True)
        explorer_action.setShortcut("F9")
        explorer_action.setStatusTip("파일 탐색기 표시/숨기기")
        explorer_action.triggered.connect(self.toggle_file_explorer)
        self.addAction(explorer_action)

        # Refresh current file
        refresh_action = QAction("새로고침", self)
        refresh_action.setShortcut("F5")
        refresh_action.setStatusTip("현재 파일 다시 불러오기")
        refresh_action.triggered.connect(self.refresh_current_file)
        self.addAction(refresh_action)

    def toggle_file_explorer(self):
        """Toggle file explorer visibility"""
        if self.parent.file_explorer.isVisible():
            self.parent.file_explorer.hide()
        else:
            self.parent.file_explorer.show()

    def refresh_current_file(self):
        """Reload current file from disk"""
        if hasattr(self.parent, 'reload_current_file'):
            self.parent.reload_current_file()

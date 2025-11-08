"""
Status bar component for displaying information
"""

from PyQt6.QtWidgets import QStatusBar, QLabel
from PyQt6.QtCore import Qt


class StatusBar(QStatusBar):
    """Status bar showing file info, cursor position, and word count"""

    def __init__(self, parent):
        super().__init__(parent)
        self.parent = parent
        self.setup_widgets()

    def setup_widgets(self):
        """Setup status bar widgets"""
        # File path label (left side)
        self.file_label = QLabel("새 문서")
        self.file_label.setAlignment(Qt.AlignmentFlag.AlignLeft)
        self.addWidget(self.file_label)

        # Add stretch to push other widgets to the right
        self.addPermanentWidget(QLabel(""), 1)

        # Cursor position label
        self.position_label = QLabel("Line 1, Col 1")
        self.position_label.setAlignment(Qt.AlignmentFlag.AlignRight)
        self.position_label.setMinimumWidth(120)
        self.addPermanentWidget(self.position_label)

        # Separator
        separator1 = QLabel("|")
        separator1.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.addPermanentWidget(separator1)

        # Word count label
        self.word_count_label = QLabel("0 단어")
        self.word_count_label.setAlignment(Qt.AlignmentFlag.AlignRight)
        self.word_count_label.setMinimumWidth(100)
        self.addPermanentWidget(self.word_count_label)

        # Separator
        separator2 = QLabel("|")
        separator2.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.addPermanentWidget(separator2)

        # Character count label
        self.char_count_label = QLabel("0 글자")
        self.char_count_label.setAlignment(Qt.AlignmentFlag.AlignRight)
        self.char_count_label.setMinimumWidth(100)
        self.addPermanentWidget(self.char_count_label)

    def update_file_path(self, file_path):
        """Update file path display"""
        if file_path:
            self.file_label.setText(file_path)
        else:
            self.file_label.setText("새 문서")

    def update_position(self, line, column):
        """Update cursor position display"""
        self.position_label.setText(f"Line {line}, Col {column}")

    def update_word_count(self, word_count, char_count):
        """Update word and character count"""
        self.word_count_label.setText(f"{word_count} 단어")
        self.char_count_label.setText(f"{char_count} 글자")

    def show_message(self, message, timeout=3000):
        """Show temporary message"""
        self.showMessage(message, timeout)

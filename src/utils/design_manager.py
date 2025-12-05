"""
Design Manager
Centralizes management of icons and fonts for the application.
"""

from PyQt6.QtGui import QFont

class DesignManager:
    # Font Families
    FONT_FAMILY = "Pretendard, 'Segoe UI', 'Roboto', sans-serif"
    CODE_FONT_FAMILY = "'Consolas', 'Monaco', monospace"

    class Icons:
        # Window Controls
        MINIMIZE = "─"
        MAXIMIZE = "□"
        RESTORE = "❐"
        CLOSE = "✕"
        HAMBURGER = "☰"

        # File Explorer
        NEW_FILE = "+ New"
        OPEN_FOLDER = "📂"
        IMPORT_EXPORT = "⬇️"
        BACK = "←"
        FORWARD = "→"
        UP = "↑"
        SETTINGS = "⚙️ Settings"

        # Web Toolbar
        UNDO = "↩️"
        REDO = "↪️"
        BOLD = "<b>B</b>"
        ITALIC = "<i>I</i>"
        HEADING = "H1"
        LINK = "🔗"
        IMAGE = "🖼️"
        TABLE = "📋"
        CODE_BLOCK = "}"
        
        # Web Helpers
        MARKDOWN = '<span class="helper-icon">MD</span>'
        KATEX = '<span class="helper-icon">fx</span>'
        MERMAID = '<span class="helper-icon">◇</span>'
        FONT_DEC = "A-"
        FONT_INC = "A+"
        WORD_COUNT = "0 단어" # Initial text, not really an icon but part of the bar

        # Web Preview
        SYNC_SCROLL = "🔗"

    @staticmethod
    def get_font(style="body"):
        """Get QFont for specific style"""
        font = QFont()
        if style == "code":
            font.setFamily("Consolas") # Fallback to system mono
        else:
            font.setFamily("Pretendard") # Fallback to system sans
            
        if style == "header":
            font.setPointSize(12)
            font.setBold(True)
        elif style == "body":
            font.setPointSize(10)
        elif style == "small":
            font.setPointSize(9)
            
        return font

    @staticmethod
    def get_web_icons():
        """Return dictionary of icons for Web UI injection"""
        return {
            "btn-undo": DesignManager.Icons.UNDO,
            "btn-redo": DesignManager.Icons.REDO,
            "btn-bold": DesignManager.Icons.BOLD,
            "btn-italic": DesignManager.Icons.ITALIC,
            "btn-heading": DesignManager.Icons.HEADING,
            "btn-link": DesignManager.Icons.LINK,
            "btn-insert-image": DesignManager.Icons.IMAGE,
            "btn-insert-table": DesignManager.Icons.TABLE,
            "btn-code-block": DesignManager.Icons.CODE_BLOCK,
            "btn-markdown-helper": DesignManager.Icons.MARKDOWN,
            "btn-katex-helper": DesignManager.Icons.KATEX,
            "btn-mermaid-helper": DesignManager.Icons.MERMAID,
            "btn-font-decrease": DesignManager.Icons.FONT_DEC,
            "btn-font-increase": DesignManager.Icons.FONT_INC,
            "btn-sync-scroll": DesignManager.Icons.SYNC_SCROLL
        }

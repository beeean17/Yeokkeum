from PyQt6.QtWidgets import (QDialog, QVBoxLayout, QHBoxLayout, QLabel, 
                             QPushButton, QListWidget, QTextEdit, QWidget, QSplitter)
from PyQt6.QtCore import Qt, QUrl
from PyQt6.QtGui import QDesktopServices, QFont

from utils.design_manager import DesignManager
from utils.license_data import PROJECT_INFO, DEPENDENCIES, LICENSE_AGPL_3

class LicenseDialog(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("라이선스 정보 (License Information)")
        self.setMinimumSize(800, 600)
        self.setFont(DesignManager.get_font("body"))
        
        layout = QVBoxLayout(self)
        
        # 1. Header Section (Project Info)
        header_widget = QWidget()
        header_layout = QVBoxLayout(header_widget)
        header_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        title_label = QLabel(f"{PROJECT_INFO['name']} v{PROJECT_INFO['version']}")
        title_font = DesignManager.get_font("h2")
        title_font.setBold(True)
        title_label.setFont(title_font)
        title_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        desc_label = QLabel(PROJECT_INFO['description'])
        desc_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        copyright_label = QLabel(PROJECT_INFO['copyright'])
        copyright_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        license_label = QLabel(f"Licensed under {PROJECT_INFO['license']}")
        license_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        header_layout.addWidget(title_label)
        header_layout.addWidget(desc_label)
        header_layout.addWidget(copyright_label)
        header_layout.addWidget(license_label)
        header_layout.addSpacing(10)
        
        # Source Code Link Button
        btn_source = QPushButton("소스 코드 다운로드 (GitHub)")
        btn_source.setCursor(Qt.CursorShape.PointingHandCursor)
        btn_source.setStyleSheet("""
            QPushButton {
                background-color: #2da44e;
                color: white;
                padding: 8px 16px;
                border-radius: 6px;
                font-weight: bold;
            }
            QPushButton:hover {
                background-color: #2c974b;
            }
        """)
        btn_source.clicked.connect(lambda: QDesktopServices.openUrl(QUrl(PROJECT_INFO['source_url'])))
        header_layout.addWidget(btn_source)
        
        layout.addWidget(header_widget)
        layout.addSpacing(20)
        
        # 2. Dependencies Section (Splitter)
        splitter = QSplitter(Qt.Orientation.Horizontal)
        
        # Left: List of components
        self.list_widget = QListWidget()
        self.list_widget.setFixedWidth(250)
        self.list_widget.currentRowChanged.connect(self.on_item_changed)
        
        # Right: Details view
        self.details_text = QTextEdit()
        self.details_text.setReadOnly(True)
        
        splitter.addWidget(self.list_widget)
        splitter.addWidget(self.details_text)
        
        layout.addWidget(QLabel("오픈소스 라이선스 및 고지사항:"))
        layout.addWidget(splitter, 1) # Give it stretch factor
        
        # Populate List
        # Add Project itself first
        self.list_widget.addItem(PROJECT_INFO['name'])
        
        for dep in DEPENDENCIES:
            self.list_widget.addItem(dep['name'])
            
        # Select first item
        self.list_widget.setCurrentRow(0)
        
        # Close Button
        btn_close = QPushButton("닫기")
        btn_close.clicked.connect(self.accept)
        layout.addWidget(btn_close, 0, Qt.AlignmentFlag.AlignRight)
        
    def on_item_changed(self, row):
        if row == 0:
            # Show Project License
            text = f"""<h1>{PROJECT_INFO['name']}</h1>
            <p><strong>Version:</strong> {PROJECT_INFO['version']}</p>
            <p><strong>Copyright:</strong> {PROJECT_INFO['copyright']}</p>
            <p><strong>License:</strong> {PROJECT_INFO['license']}</p>
            <p><a href="{PROJECT_INFO['source_url']}">{PROJECT_INFO['source_url']}</a></p>
            <hr>
            <h3>License Text:</h3>
            <pre>{LICENSE_AGPL_3}</pre>
            """
        else:
            # Show Dependency License
            dep_index = row - 1
            if 0 <= dep_index < len(DEPENDENCIES):
                dep = DEPENDENCIES[dep_index]
                text = f"""<h1>{dep['name']}</h1>
                <p><strong>Description:</strong> {dep.get('description', '')}</p>
                <p><strong>License:</strong> {dep['license']}</p>
                <p><strong>Copyright:</strong> {dep.get('copyright', 'See project page')}</p>
                <p><strong>Website:</strong> <a href="{dep['url']}">{dep['url']}</a></p>
                <hr>
                <h3>License Text:</h3>
                <pre>{dep.get('license_text', 'See license file')}</pre>
                """
            else:
                text = ""
                
        self.details_text.setHtml(text)

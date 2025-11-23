"""
메인 윈도우 클래스

Defines the main application window with:
- UI layout setup
- Backend connection
- Event handling
"""

from pathlib import Path
from PyQt6.QtWidgets import QMainWindow
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtWebChannel import QWebChannel
from PyQt6.QtCore import QUrl

from .menu_bar import MenuBar
from .toolbar import ToolBar
from .status_bar import StatusBar
from backend.api import BackendAPI


class MainWindow(QMainWindow):
    """Main application window"""

    def __init__(self, initial_file=None, initial_content=None):
        super().__init__()
        self.setWindowTitle("새김 - 마크다운 에디터")
        self.setGeometry(100, 100, 1200, 800)

        # Store initial file info
        self.current_file = initial_file
        self.initial_content = initial_content if initial_content else ""

        # Update window title if file is provided
        if initial_file:
            file_name = Path(initial_file).name
            self.setWindowTitle(f"{file_name} - 새김")

        self.setup_ui()
        self.setup_backend()
        self.setup_menu_and_toolbar()

    def setup_ui(self):
        """Initialize UI components"""
        # Create web view for the editor UI
        self.webview = QWebEngineView()

        # Load the HTML UI
        ui_path = Path(__file__).parent.parent / 'ui' / 'index.html'

        if not ui_path.exists():
            print(f"Warning: UI file not found at {ui_path}")

        # Set as central widget
        self.setCentralWidget(self.webview)

        # Enable DevTools and settings
        from PyQt6.QtWebEngineCore import QWebEngineSettings, QWebEnginePage

        # Capture console messages for debugging
        class WebPage(QWebEnginePage):
            def javaScriptConsoleMessage(self, level, message, lineNumber, sourceID):
                print(f"[JS Console] {message} (line {lineNumber})")

        page = WebPage(self.webview)
        self.webview.setPage(page)

        settings = page.settings()
        settings.setAttribute(
            QWebEngineSettings.WebAttribute.JavascriptEnabled,
            True
        )
        # Enable remote URLs for CDN resources
        settings.setAttribute(
            QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls,
            True
        )

        # Connect loadFinished signal to set initial content
        self.webview.loadFinished.connect(self.on_webview_loaded)

        # Load the HTML file
        self.webview.load(QUrl.fromLocalFile(str(ui_path)))

        print(f"[OK] UI loaded from: {ui_path}")
        print("[OK] JavaScript console logging enabled")

    def on_webview_loaded(self, ok):
        """Called when webview finishes loading"""
        if not ok:
            return

        # Set current file path if provided
        if self.current_file:
            escaped_path = self.current_file.replace('\\', '\\\\')
            js_file_code = f"""
                if (typeof window.setCurrentFile === 'function') {{
                    window.setCurrentFile("{escaped_path}");
                }}
            """
            self.webview.page().runJavaScript(js_file_code)

        # Set initial content if provided
        if self.initial_content:
            # Escape the content for JavaScript
            escaped_content = self.initial_content.replace('\\', '\\\\')
            escaped_content = escaped_content.replace('`', '\\`')
            escaped_content = escaped_content.replace('$', '\\$')

            # Set the initial content in the editor
            js_code = f"""
                if (typeof window.setEditorContent === 'function') {{
                    window.setEditorContent(`{escaped_content}`);
                }} else {{
                    // Wait for editor to be ready
                    setTimeout(function() {{
                        if (typeof window.setEditorContent === 'function') {{
                            window.setEditorContent(`{escaped_content}`);
                        }}
                    }}, 500);
                }}
            """
            self.webview.page().runJavaScript(js_code)
            print(f"[OK] Initial content loaded ({len(self.initial_content)} chars)")

    def setup_menu_and_toolbar(self):
        """Setup menu bar, toolbar, and status bar"""
        # Create menu bar
        self.menu_bar = MenuBar(self)
        self.setMenuBar(self.menu_bar)

        # Create toolbar
        self.toolbar = ToolBar(self)
        self.addToolBar(self.toolbar)

        # Create status bar
        self.status_bar = StatusBar(self)
        self.setStatusBar(self.status_bar)

        print("[OK] Menu bar, toolbar, and status bar initialized")

    def setup_backend(self):
        """Setup backend connection with QWebChannel"""
        # Create QWebChannel
        self.channel = QWebChannel()

        # Create backend API instance
        self.backend = BackendAPI(self)

        # Register backend object (accessible from JS as 'backend')
        self.channel.registerObject("backend", self.backend)

        # Set the channel on the web page
        self.webview.page().setWebChannel(self.channel)

        print("[OK] QWebChannel setup complete - backend API registered")

"""
Startup profiling script for Saekim
Measures import times for each module
"""
import time
import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent))

print("=== Saekim Startup Profiling ===\n")

total_start = time.time()

# Measure individual imports
timings = []

start = time.time()
from PyQt6.QtWidgets import QApplication
timings.append(("PyQt6.QtWidgets", time.time() - start))

start = time.time()
from PyQt6.QtWebEngineWidgets import QWebEngineView
timings.append(("PyQt6.QtWebEngineWidgets", time.time() - start))

start = time.time()
from PyQt6.QtWebChannel import QWebChannel
timings.append(("PyQt6.QtWebChannel", time.time() - start))

start = time.time()
from utils.logger import setup_logger
timings.append(("utils.logger", time.time() - start))

start = time.time()
from utils.design_manager import DesignManager
timings.append(("utils.design_manager", time.time() - start))

start = time.time()
from utils.theme_manager import ThemeManager
timings.append(("utils.theme_manager", time.time() - start))

start = time.time()
from backend.api import BackendAPI
timings.append(("backend.api", time.time() - start))

start = time.time()
from backend.converter import DocumentConverter
timings.append(("backend.converter", time.time() - start))

start = time.time()
from backend.tab_manager import TabManager
timings.append(("backend.tab_manager", time.time() - start))

start = time.time()
from backend.session_manager import SessionManager
timings.append(("backend.session_manager", time.time() - start))

start = time.time()
from backend.file_manager import FileManager
timings.append(("backend.file_manager", time.time() - start))

start = time.time()
from windows.file_explorer import FileExplorer
timings.append(("windows.file_explorer", time.time() - start))

start = time.time()
from windows.title_bar import TitleBar
timings.append(("windows.title_bar", time.time() - start))

start = time.time()
from windows.settings_dialog import SettingsDialog
timings.append(("windows.settings_dialog", time.time() - start))

total_time = time.time() - total_start

# Sort by time (slowest first)
timings.sort(key=lambda x: x[1], reverse=True)

print("Import times (sorted by duration):\n")
for name, duration in timings:
    bar = "#" * int(duration * 20)
    print(f"{name:30} {duration:.3f}s {bar}")

print(f"\n{'='*50}")
print(f"Total import time: {total_time:.3f}s")

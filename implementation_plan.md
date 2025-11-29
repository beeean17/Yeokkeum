# File Explorer Feature Implementation Plan

## Goal Description
Add a file explorer side panel (similar to VS Code's Project Explorer) to the Saekim Markdown Editor. This will allow users to browse files and directories directly within the application and open them by double-clicking.

## User Review Required
> [!NOTE]
> The file explorer will be implemented as a `QDockWidget` on the left side of the window. It will use the native system file icons and structure.
> A toggle button will be added to the toolbar and View menu to show/hide the explorer.

## Detailed User Flow Analysis

### 1. Toggle File Explorer
- **User Action**: Click "Project Explorer" toggle button (Toolbar or View Menu).
- **Logic**:
    - Check current visibility of `FileExplorer` dock widget.
    - If visible -> Hide.
    - If hidden -> Show.
- **Visual Feedback**: The side panel appears/disappears. The toggle button state (if checkable) updates.

### 2. Open File from Explorer
- **User Action**: Double-click a file in the File Explorer.
- **Logic**:
    1. **Check Unsaved Changes**: Call `self.backend.file_manager.is_file_modified()`.
    2. **Condition**:
        - **If Modified**: Show "Unsaved Changes" dialog (Save / Don't Save / Cancel).
            - **Save**: Call `save_file()`. If successful, proceed to step 3. If cancel/fail, abort.
            - **Don't Save**: Proceed to step 3.
            - **Cancel**: Abort operation.
        - **If Not Modified**: Proceed to step 3.
    3. **Open File**: Call `self.backend.file_manager.open_file(selected_path)`.
    4. **Update UI**:
        - Send content to WebView: `window.setEditorContent(content)`.
        - Update Window Title: `새김 - {filename}`.
        - Update `current_file` in `BackendAPI` (handled by `file_manager.open_file`).

## Proposed Changes

### UI Components

#### [NEW] [file_explorer.py](file:///c:/Users/yoons/Documents/Github/Term_Project/Saekim/src/windows/file_explorer.py)
Create a new `FileExplorer` class inheriting from `QDockWidget`.
- **Components**:
    - `QFileSystemModel`: To handle file system data.
    - `QTreeView`: To display the file tree.
- **Features**:
    - Initialize with a root directory (default to current working directory or project root).
    - Filter to show relevant files (or all files).
    - Signal `file_selected(str)` emitted when a file is double-clicked.

### Main Window Integration

#### [MODIFY] [main_window.py](file:///c:/Users/yoons/Documents/Github/Term_Project/Saekim/src/windows/main_window.py)
- Import `FileExplorer`.
- In `setup_ui` (or a new `setup_dock_widgets` method):
    - Initialize `FileExplorer`.
    - Add it to `Qt.DockWidgetArea.LeftDockWidgetArea`.
    - Create a toggle action: `self.file_explorer.toggleViewAction()`.
    - Set icon for the toggle action (e.g., folder icon).
- Implement `open_file_by_path(self, file_path)` method:
    - **Safety Check**: Check `self.backend.file_manager.is_file_modified()`.
        - If modified, show `QMessageBox.question` (Save/Discard/Cancel).
        - Handle response (Save -> `self.backend.save_file()`, Discard -> proceed, Cancel -> return).
    - Call `self.backend.file_manager.open_file(file_path)`.
    - If successful:
        - Update the WebView content (logic similar to `BackendAPI.open_file_dialog`).
        - Update window title.
- Connect `FileExplorer.file_selected` signal to `open_file_by_path`.

#### [MODIFY] [menu_bar.py](file:///c:/Users/yoons/Documents/Github/Term_Project/Saekim/src/windows/menu_bar.py)
- Add "Project Explorer" toggle action to the "View" menu.

#### [MODIFY] [toolbar.py](file:///c:/Users/yoons/Documents/Github/Term_Project/Saekim/src/windows/toolbar.py)
- Add "Project Explorer" toggle action to the toolbar (leftmost or appropriate position).

## Verification Plan

### Manual Verification
1. **Launch Application**: Run `python src/main.py`.
2. **Check UI**: Verify that the "Project Explorer" panel appears on the left side.
3. **Navigation**: Expand/collapse folders in the tree view.
4. **Open File**: Double-click a `.md` file in the explorer.
    - **Expected**: The file content loads in the editor area.
    - **Expected**: The window title updates to the file name.
5. **Toggle Explorer**: Click the "Project Explorer" button in the toolbar or View menu.
    - **Expected**: The side panel should show/hide.
6. **Open Non-Text File**: Double-click a binary file (e.g., `.exe` or `.png` if visible).
    - **Expected**: Should handle gracefully (either ignore or show error, or `FileManager` handles the error).

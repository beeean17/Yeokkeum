"""
File Manager Module
Handles all file I/O operations for markdown files
"""

import json
from pathlib import Path
from typing import Optional, Tuple
from datetime import datetime


class FileManager:
    """Manages file operations for markdown documents"""

    def __init__(self):
        self.current_file: Optional[Path] = None
        self.is_modified: bool = False
        self.encoding: str = 'utf-8'

    def open_file(self, file_path: str) -> Tuple[bool, str, str]:
        """
        Open a markdown file

        Args:
            file_path: Path to the file to open

        Returns:
            Tuple of (success, content, error_message)
        """
        try:
            path = Path(file_path)

            if not path.exists():
                return False, "", f"File not found: {file_path}"

            if not path.is_file():
                return False, "", f"Not a file: {file_path}"

            # Check file extension
            allowed_extensions = ['.md', '.txt', '.markdown']
            if path.suffix.lower() not in allowed_extensions:
                return False, "", f"Unsupported file type: {path.suffix}"

            # Read file content
            with open(path, 'r', encoding=self.encoding) as f:
                content = f.read()

            self.current_file = path
            self.is_modified = False

            return True, content, ""

        except UnicodeDecodeError as e:
            return False, "", f"Encoding error: {str(e)}. Try UTF-8 encoding."
        except PermissionError:
            return False, "", f"Permission denied: {file_path}"
        except Exception as e:
            return False, "", f"Error opening file: {str(e)}"

    def save_file(self, content: str, file_path: Optional[str] = None) -> Tuple[bool, str]:
        """
        Save content to a file

        Args:
            content: The markdown content to save
            file_path: Optional path to save to (if None, uses current_file)

        Returns:
            Tuple of (success, error_message)
        """
        try:
            # Determine target path
            if file_path:
                path = Path(file_path)
            elif self.current_file:
                path = self.current_file
            else:
                return False, "No file path specified"

            # Ensure parent directory exists
            path.parent.mkdir(parents=True, exist_ok=True)

            # Add .md extension if no extension provided
            if not path.suffix:
                path = path.with_suffix('.md')

            # Write content
            with open(path, 'w', encoding=self.encoding) as f:
                f.write(content)

            self.current_file = path
            self.is_modified = False

            return True, ""

        except PermissionError:
            return False, f"Permission denied: {path}"
        except Exception as e:
            return False, f"Error saving file: {str(e)}"

    def get_current_file_path(self) -> str:
        """Get the current file path as string"""
        if self.current_file:
            return str(self.current_file.absolute())
        return ""

    def get_current_file_name(self) -> str:
        """Get the current file name"""
        if self.current_file:
            return self.current_file.name
        return "Untitled"

    def mark_modified(self, modified: bool = True):
        """Mark the document as modified or unmodified"""
        self.is_modified = modified

    def is_file_modified(self) -> bool:
        """Check if the current file has unsaved changes"""
        return self.is_modified

    def new_file(self):
        """Create a new file (clear current state)"""
        self.current_file = None
        self.is_modified = False

    def get_file_info(self) -> dict:
        """Get information about the current file"""
        if not self.current_file or not self.current_file.exists():
            return {
                "name": "Untitled",
                "path": "",
                "size": 0,
                "modified": False,
                "exists": False
            }

        stat = self.current_file.stat()

        return {
            "name": self.current_file.name,
            "path": str(self.current_file.absolute()),
            "size": stat.st_size,
            "modified_time": datetime.fromtimestamp(stat.st_mtime).isoformat(),
            "modified": self.is_modified,
            "exists": True
        }

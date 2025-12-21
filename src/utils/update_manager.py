"""
Update Manager Module
Handles checking for updates via GitHub Releases API and downloading updates.
"""

import os
import sys
import json
import tempfile
import subprocess
from pathlib import Path
from typing import Optional, Callable, Tuple
from dataclasses import dataclass
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError

from utils.logger import get_logger

logger = get_logger()


@dataclass
class UpdateInfo:
    """Information about an available update"""
    version: str
    download_url: str
    release_notes: str
    file_size: int = 0


class UpdateManager:
    """
    Manages application updates via GitHub Releases.
    
    Usage:
        manager = UpdateManager()
        update = manager.check_for_updates()
        if update:
            manager.download_update(update.download_url, progress_callback)
            manager.install_update(installer_path)
    """
    
    GITHUB_REPO = "beeean17/Saekim"
    CURRENT_VERSION = "1.2.0"
    API_URL = f"https://api.github.com/repos/{GITHUB_REPO}/releases/latest"
    
    def __init__(self):
        self.temp_dir = Path(tempfile.gettempdir()) / 'saekim_updates'
        self.temp_dir.mkdir(exist_ok=True)
    
    @staticmethod
    def parse_version(version_str: str) -> Tuple[int, ...]:
        """Parse version string to tuple for comparison (e.g., 'v1.2.0' -> (1, 2, 0))"""
        # Remove 'v' prefix if present
        clean = version_str.lstrip('vV')
        try:
            return tuple(int(x) for x in clean.split('.'))
        except ValueError:
            return (0, 0, 0)
    
    def check_for_updates(self) -> Optional[UpdateInfo]:
        """
        Check GitHub Releases for a newer version.
        
        Returns:
            UpdateInfo if a newer version is available, None otherwise.
        """
        try:
            logger.info("Checking for updates...")
            
            # Create request with User-Agent (required by GitHub API)
            request = Request(
                self.API_URL,
                headers={'User-Agent': f'Saekim/{self.CURRENT_VERSION}'}
            )
            
            with urlopen(request, timeout=10) as response:
                data = json.loads(response.read().decode('utf-8'))
            
            latest_version = data.get('tag_name', '')
            
            # Compare versions
            latest = self.parse_version(latest_version)
            current = self.parse_version(self.CURRENT_VERSION)
            
            if latest > current:
                # Find the installer asset
                download_url = None
                file_size = 0
                
                for asset in data.get('assets', []):
                    name = asset.get('name', '')
                    if name.endswith('.exe') and 'Setup' in name:
                        download_url = asset.get('browser_download_url')
                        file_size = asset.get('size', 0)
                        break
                
                if download_url:
                    logger.info(f"Update available: {latest_version}")
                    return UpdateInfo(
                        version=latest_version,
                        download_url=download_url,
                        release_notes=data.get('body', ''),
                        file_size=file_size
                    )
                else:
                    logger.warning("Update found but no installer asset available")
                    return None
            else:
                logger.info("Already on latest version")
                return None
                
        except HTTPError as e:
            logger.error(f"HTTP error checking for updates: {e.code}")
            return None
        except URLError as e:
            logger.error(f"Network error checking for updates: {e.reason}")
            return None
        except Exception as e:
            logger.error(f"Error checking for updates: {e}")
            return None
    
    def download_update(
        self,
        download_url: str,
        progress_callback: Optional[Callable[[int, int], None]] = None
    ) -> Optional[Path]:
        """
        Download the update installer.
        
        Args:
            download_url: URL to download
            progress_callback: Optional callback(downloaded_bytes, total_bytes)
            
        Returns:
            Path to downloaded installer, or None on failure.
        """
        try:
            logger.info(f"Downloading update from: {download_url}")
            
            # Extract filename from URL
            filename = download_url.split('/')[-1]
            installer_path = self.temp_dir / filename
            
            request = Request(
                download_url,
                headers={'User-Agent': f'Saekim/{self.CURRENT_VERSION}'}
            )
            
            with urlopen(request, timeout=60) as response:
                total_size = int(response.headers.get('Content-Length', 0))
                downloaded = 0
                chunk_size = 8192
                
                with open(installer_path, 'wb') as f:
                    while True:
                        chunk = response.read(chunk_size)
                        if not chunk:
                            break
                        f.write(chunk)
                        downloaded += len(chunk)
                        
                        if progress_callback:
                            progress_callback(downloaded, total_size)
            
            logger.info(f"Download complete: {installer_path}")
            return installer_path
            
        except Exception as e:
            logger.error(f"Error downloading update: {e}")
            return None
    
    def install_update(self, installer_path: Path) -> bool:
        """
        Launch the installer and exit the application.
        
        Args:
            installer_path: Path to the downloaded installer
            
        Returns:
            True if installer was launched successfully.
        """
        try:
            if not installer_path.exists():
                logger.error(f"Installer not found: {installer_path}")
                return False
            
            logger.info(f"Launching installer: {installer_path}")
            
            # Launch installer with /SILENT for seamless update
            # /CLOSEAPPLICATIONS will close running instances
            subprocess.Popen(
                [str(installer_path), '/SILENT', '/CLOSEAPPLICATIONS'],
                creationflags=subprocess.DETACHED_PROCESS | subprocess.CREATE_NEW_PROCESS_GROUP
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Error launching installer: {e}")
            return False
    
    def cleanup(self):
        """Remove temporary update files"""
        try:
            import shutil
            if self.temp_dir.exists():
                shutil.rmtree(self.temp_dir)
        except Exception as e:
            logger.warning(f"Error cleaning up update files: {e}")

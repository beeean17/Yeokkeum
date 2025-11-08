"""
로깅 유틸리티

Provides logging configuration for the application.
"""

import logging
import sys
from pathlib import Path
from datetime import datetime


def setup_logger(name="saekim", level=logging.INFO):
    """
    Setup application logger

    Args:
        name: Logger name
        level: Logging level (default: INFO)

    Returns:
        Logger instance
    """
    logger = logging.getLogger(name)
    logger.setLevel(level)

    # Avoid duplicate handlers
    if logger.handlers:
        return logger

    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(level)

    # Formatter
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    console_handler.setFormatter(formatter)

    logger.addHandler(console_handler)

    return logger


def get_logger(name="saekim"):
    """
    Get the application logger instance

    Args:
        name: Logger name (default: "saekim")

    Returns:
        Logger instance
    """
    logger = logging.getLogger(name)
    if not logger.handlers:
        return setup_logger(name)
    return logger

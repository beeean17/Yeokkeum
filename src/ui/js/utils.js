/**
 * Utility functions for the Saekim editor
 */

const Utils = {
    /**
     * Debounce function to limit rapid function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function to limit function execution rate
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Count words in text
     * @param {string} text - Text to count words in
     * @returns {number} Word count
     */
    countWords(text) {
        if (!text || text.trim().length === 0) return 0;
        return text.trim().split(/\s+/).length;
    },

    /**
     * Count characters in text
     * @param {string} text - Text to count characters in
     * @returns {number} Character count
     */
    countCharacters(text) {
        return text ? text.length : 0;
    },

    /**
     * Get cursor position in textarea
     * @param {HTMLTextAreaElement} element - Textarea element
     * @returns {{line: number, column: number}} Position object
     */
    getCursorPosition(element) {
        const text = element.value.substring(0, element.selectionStart);
        const lines = text.split('\n');
        return {
            line: lines.length,
            column: lines[lines.length - 1].length + 1
        };
    },

    /**
     * Format date to string
     * @param {Date} date - Date object
     * @returns {string} Formatted date string
     */
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    },

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {string} type - Type: 'success', 'error', 'info', 'warning'
     */
    showToast(message, type = 'info') {
        // TODO: Implement toast notification UI
        console.log(`[${type.toUpperCase()}] ${message}`);
    },

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Success status
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            return false;
        }
    }
};

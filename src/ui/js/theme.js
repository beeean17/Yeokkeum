/**
 * Theme management module
 */

const ThemeModule = {
    currentTheme: 'light',
    THEME_KEY: 'saekim_theme',

    /**
     * Initialize theme
     */
    init() {
        // Load saved theme or detect system preference
        this.loadTheme();

        // Listen for system theme changes - REMOVED
        // if (window.matchMedia) {
        //     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        //         if (!localStorage.getItem(this.THEME_KEY)) {
        //             // Only auto-switch if user hasn't set a preference
        //             this.setTheme(e.matches ? 'dark' : 'light', false);
        //         }
        //     });
        // }

        // Setup theme toggle button - REMOVED
        // const themeButton = document.getElementById('btn-theme');
        // if (themeButton) {
        //     themeButton.addEventListener('click', () => {
        //         this.toggleTheme();
        //     });
        // }

        console.log('✅ Theme 모듈 초기화 완료:', this.currentTheme);
    },

    /**
     * Load theme from localStorage or detect system preference
     */
    loadTheme() {
        const savedTheme = localStorage.getItem(this.THEME_KEY);

        if (savedTheme) {
            this.setTheme(savedTheme, false);
        } else {
            // Default to dark if no preference
            this.setTheme('dark', false);
        }
    },

    /**
     * Set theme
     * @param {string} theme - 'light' or 'dark'
     * @param {boolean} save - Whether to save to localStorage (default: true)
     */
    setTheme(theme, save = true) {
        if (theme !== 'light' && theme !== 'dark') {
            console.error('❌ Invalid theme:', theme);
            return;
        }

        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);

        if (save) {
            localStorage.setItem(this.THEME_KEY, theme);
        }

        // Update theme toggle button
        this.updateThemeButton();

        console.log('🎨 테마 변경:', theme);
    },

    /**
     * Update theme toggle button appearance
     */
    updateThemeButton() {
        const themeButton = document.getElementById('btn-theme');
        if (!themeButton) return;

        if (this.currentTheme === 'dark') {
            themeButton.textContent = '🌙';
            themeButton.title = '다크 모드 (라이트 모드로 전환하려면 클릭)';
        } else {
            themeButton.textContent = '☀️';
            themeButton.title = '라이트 모드 (다크 모드로 전환하려면 클릭)';
        }
    },

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },

    /**
     * Get current theme
     */
    getCurrentTheme() {
        return this.currentTheme;
    },

    /**
     * Check if dark theme is active
     */
    isDarkTheme() {
        return this.currentTheme === 'dark';
    },

    /**
     * Load specific theme CSS file
     * @param {string} cssFile - Filename of the CSS file (e.g., 'nord.css')
     */
    loadThemeCSS(cssFile) {
        const linkElement = document.getElementById('theme-stylesheet');
        if (linkElement) {
            linkElement.href = `css/themes/${cssFile}`;
            console.log('🎨 테마 CSS 로드:', cssFile);
        } else {
            console.error('❌ Theme stylesheet link element not found');
        }
    }
};

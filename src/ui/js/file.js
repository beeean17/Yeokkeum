/**
 * File operations module
 */

const FileModule = {
    /**
     * Create new file
     */
    newFile() {
        if (typeof App !== 'undefined') {
            App.newFile();
        }
    },

    /**
     * Open file
     */
    async openFile() {
        if (typeof App !== 'undefined') {
            await App.openFile();
        }
    },

    /**
     * Save file
     */
    async saveFile() {
        if (typeof App !== 'undefined') {
            await App.saveFile();
        }
    },

    /**
     * Save file as (with new name)
     */
    async saveFileAs() {
        if (typeof App !== 'undefined') {
            await App.saveFileAs();
        }
    },

    /**
     * Export to PDF
     */
    async exportToPDF() {
        if (!App.backend) {
            if (typeof Utils !== 'undefined') {
                Utils.showToast('PDF 내보내기는 앱에서만 사용할 수 있습니다', 'warning');
            }
            return;
        }

        try {
            const content = EditorModule.getContent();
            console.log('📄 PDF로 내보내기...', content.length, 'characters');

            // Call backend to export to PDF
            App.backend.export_to_pdf(content, (resultJson) => {
                const result = JSON.parse(resultJson);

                if (result.success) {
                    console.log('✅ PDF 생성 성공:', result.filepath);
                    if (typeof Utils !== 'undefined') {
                        Utils.showToast('PDF를 생성했습니다', 'success');
                    }
                } else if (result.error !== 'Cancelled') {
                    console.error('❌ PDF 생성 실패:', result.error);
                    if (typeof Utils !== 'undefined') {
                        Utils.showToast('PDF 생성 실패: ' + result.error, 'error');
                    }
                }
            });
        } catch (error) {
            console.error('❌ PDF 내보내기 실패:', error);
            if (typeof Utils !== 'undefined') {
                Utils.showToast('PDF 내보내기에 실패했습니다', 'error');
            }
        }
    },

    /**
     * Export to DOCX
     */
    async exportToDOCX() {
        if (!App.backend) {
            if (typeof Utils !== 'undefined') {
                Utils.showToast('DOCX 내보내기는 앱에서만 사용할 수 있습니다', 'warning');
            }
            return;
        }

        try {
            const content = EditorModule.getContent();
            console.log('📄 DOCX로 내보내기...', content.length, 'characters');

            // Call backend to export to DOCX
            App.backend.export_to_docx(content, (resultJson) => {
                const result = JSON.parse(resultJson);

                if (result.success) {
                    console.log('✅ DOCX 생성 성공:', result.filepath);
                    if (typeof Utils !== 'undefined') {
                        Utils.showToast('DOCX를 생성했습니다', 'success');
                    }
                } else if (result.error !== 'Cancelled') {
                    console.error('❌ DOCX 생성 실패:', result.error);
                    if (typeof Utils !== 'undefined') {
                        Utils.showToast('DOCX 생성 실패: ' + result.error, 'error');
                    }
                }
            });
        } catch (error) {
            console.error('❌ DOCX 내보내기 실패:', error);
            if (typeof Utils !== 'undefined') {
                Utils.showToast('DOCX 내보내기에 실패했습니다', 'error');
            }
        }
    },

    /**
     * Export to HTML
     */
    exportToHTML() {
        if (!App.backend) {
            // Fallback for browser mode
            try {
                const content = PreviewModule.currentContent;
                const blob = new Blob([content], { type: 'text/html' });
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = 'document.html';
                a.click();

                URL.revokeObjectURL(url);

                if (typeof Utils !== 'undefined') {
                    Utils.showToast('HTML 파일로 내보냈습니다', 'success');
                }
            } catch (error) {
                console.error('❌ HTML 내보내기 실패:', error);
                if (typeof Utils !== 'undefined') {
                    Utils.showToast('HTML 내보내기에 실패했습니다', 'error');
                }
            }
            return;
        }

        try {
            const content = EditorModule.getContent();
            console.log('📄 HTML로 내보내기...');

            // Call backend to export to HTML
            App.backend.export_to_html(content, (resultJson) => {
                const result = JSON.parse(resultJson);

                if (result.success) {
                    console.log('✅ HTML 생성 성공:', result.filepath);
                    if (typeof Utils !== 'undefined') {
                        Utils.showToast('HTML을 생성했습니다', 'success');
                    }
                } else if (result.error !== 'Cancelled') {
                    console.error('❌ HTML 생성 실패:', result.error);
                    if (typeof Utils !== 'undefined') {
                        Utils.showToast('HTML 생성 실패: ' + result.error, 'error');
                    }
                }
            });
        } catch (error) {
            console.error('❌ HTML 내보내기 실패:', error);
            if (typeof Utils !== 'undefined') {
                Utils.showToast('HTML 내보내기에 실패했습니다', 'error');
            }
        }
    },

    /**
     * Import from file
     */
    async importFile(file) {
        try {
            const text = await file.text();
            EditorModule.setContent(text);
            Utils.showToast(`${file.name} 파일을 불러왔습니다`, 'success');
        } catch (error) {
            console.error('❌ 파일 가져오기 실패:', error);
            Utils.showToast('파일 가져오기에 실패했습니다', 'error');
        }
    }
};

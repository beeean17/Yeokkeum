/**
 * CodeMirror 6 Setup
 * Initialize CodeMirror editor with markdown support
 */

import { EditorView, basicSetup } from 'https://cdn.jsdelivr.net/npm/codemirror@6.0.1/dist/index.js';
import { EditorState } from 'https://cdn.jsdelivr.net/npm/@codemirror/state@6.4.0/dist/index.js';
import { markdown } from 'https://cdn.jsdelivr.net/npm/@codemirror/lang-markdown@6.2.4/dist/index.js';
import { oneDark } from 'https://cdn.jsdelivr.net/npm/@codemirror/theme-one-dark@6.1.2/dist/index.js';

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeMirror);
} else {
    initCodeMirror();
}

function initCodeMirror() {
    const editorElement = document.getElementById('editor');

    if (!editorElement) {
        console.error('❌ Editor element not found');
        return;
    }

    const initialContent = `# 여기에 마크다운을 작성하세요...

## 환영합니다!

새김 마크다운 에디터에 오신 것을 환영합니다.

### 주요 기능
- 실시간 미리보기
- 코드 하이라이팅
- 다이어그램 렌더링 (Mermaid.js)
- 수식 렌더링 (KaTeX)
- PDF/DOCX 변환

시작하려면 이 텍스트를 지우고 작성을 시작하세요!
`;

    // Create EditorState
    const startState = EditorState.create({
        doc: initialContent,
        extensions: [
            basicSetup,
            markdown(),
            EditorView.lineWrapping,
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    // Notify app of content change
                    const content = update.state.doc.toString();

                    // Update preview
                    if (typeof PreviewModule !== 'undefined') {
                        PreviewModule.update(content);
                    }

                    // Mark as modified
                    if (typeof App !== 'undefined') {
                        App.markDirty();
                        App.saveState(); // Auto-save to localStorage
                    }

                    // Update word count
                    updateWordCount(content);
                }
            })
        ]
    });

    // Create EditorView
    window.editorView = new EditorView({
        state: startState,
        parent: editorElement
    });

    // Expose getter/setter for compatibility
    window.EditorModule = {
        getContent() {
            return window.editorView.state.doc.toString();
        },

        setContent(content) {
            window.editorView.dispatch({
                changes: {
                    from: 0,
                    to: window.editorView.state.doc.length,
                    insert: content
                }
            });
        },

        init() {
            console.log('✅ CodeMirror 6 initialized');
            // Trigger initial preview
            const content = window.editorView.state.doc.toString();
            if (typeof PreviewModule !== 'undefined') {
                PreviewModule.update(content);
            }
        }
    };

    // Initial word count
    updateWordCount(initialContent);

    console.log('✅ CodeMirror 6 editor created');
}

function updateWordCount(content) {
    const words = content.trim().split(/\s+/).filter(w => w.length > 0).length;
    const chars = content.length;

    const wordCountElement = document.getElementById('word-count');
    if (wordCountElement) {
        wordCountElement.textContent = `${words} 단어, ${chars} 글자`;
    }
}

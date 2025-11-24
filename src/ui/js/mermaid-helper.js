/**
 * Mermaid Helper Module
 * Provides searchable Mermaid diagram templates with Korean/English keywords
 */

const MermaidHelperModule = {
    isOpen: false,
    dialog: null,
    searchInput: null,
    resultsContainer: null,
    suggestionsContainer: null,
    previewContainer: null,

    /**
     * Mermaid diagram templates database with Korean/English keywords
     */
    database: [
        // === Flowchart (순서도) ===
        {
            category: '순서도 (Flowchart)',
            keywords: ['순서도', 'flowchart', '플로우차트', '흐름도', '기본'],
            name: '기본 순서도',
            description: '위에서 아래로 흐르는 기본 순서도',
            template: `flowchart TD
    A[시작] --> B{조건}
    B -->|Yes| C[처리 1]
    B -->|No| D[처리 2]
    C --> E[종료]
    D --> E`
        },
        {
            category: '순서도 (Flowchart)',
            keywords: ['순서도', 'flowchart', '가로', '좌우', 'horizontal', 'LR'],
            name: '가로 순서도',
            description: '왼쪽에서 오른쪽으로 흐르는 순서도',
            template: `flowchart LR
    A[시작] --> B[처리 1]
    B --> C[처리 2]
    C --> D[종료]`
        },
        {
            category: '순서도 (Flowchart)',
            keywords: ['노드', 'node', '사각형', 'box', 'rectangle'],
            name: '사각형 노드',
            description: '기본 사각형 노드',
            template: `flowchart TD
    A[사각형 노드]`
        },
        {
            category: '순서도 (Flowchart)',
            keywords: ['노드', 'node', '둥근', 'rounded', '라운드'],
            name: '둥근 사각형 노드',
            description: '모서리가 둥근 사각형',
            template: `flowchart TD
    A(둥근 사각형)`
        },
        {
            category: '순서도 (Flowchart)',
            keywords: ['노드', 'node', '원', 'circle', '동그라미'],
            name: '원형 노드',
            description: '원형 노드',
            template: `flowchart TD
    A((원형 노드))`
        },
        {
            category: '순서도 (Flowchart)',
            keywords: ['노드', 'node', '마름모', 'diamond', '조건', 'condition', '분기'],
            name: '마름모 (조건)',
            description: '조건 분기용 마름모 노드',
            template: `flowchart TD
    A{조건 분기}`
        },
        {
            category: '순서도 (Flowchart)',
            keywords: ['노드', 'node', '육각형', 'hexagon'],
            name: '육각형 노드',
            description: '육각형 모양 노드',
            template: `flowchart TD
    A{{육각형 노드}}`
        },
        {
            category: '순서도 (Flowchart)',
            keywords: ['노드', 'node', '평행사변형', 'parallelogram', '입출력', 'io'],
            name: '평행사변형 (입출력)',
            description: '입출력 표현용 평행사변형',
            template: `flowchart TD
    A[/입력/]
    B[\\출력\\]`
        },
        {
            category: '순서도 (Flowchart)',
            keywords: ['노드', 'node', '데이터베이스', 'database', 'db', '실린더'],
            name: '데이터베이스 (실린더)',
            description: '데이터베이스 표현용 실린더',
            template: `flowchart TD
    A[(데이터베이스)]`
        },
        {
            category: '순서도 (Flowchart)',
            keywords: ['화살표', 'arrow', '연결', 'link', '선'],
            name: '화살표 종류',
            description: '다양한 연결선 스타일',
            template: `flowchart LR
    A --> B
    C --- D
    E -.-> F
    G ==> H
    I --텍스트--> J
    K -->|라벨| L`
        },
        {
            category: '순서도 (Flowchart)',
            keywords: ['서브그래프', 'subgraph', '그룹', 'group', '묶음'],
            name: '서브그래프',
            description: '노드 그룹화',
            template: `flowchart TB
    subgraph 그룹1
        A[노드 A]
        B[노드 B]
    end
    subgraph 그룹2
        C[노드 C]
        D[노드 D]
    end
    A --> C
    B --> D`
        },
        {
            category: '순서도 (Flowchart)',
            keywords: ['스타일', 'style', '색상', 'color', '꾸미기'],
            name: '노드 스타일링',
            description: '노드에 색상 적용',
            template: `flowchart TD
    A[빨간 노드]
    B[파란 노드]
    C[초록 노드]
    style A fill:#f96,stroke:#333
    style B fill:#69f,stroke:#333
    style C fill:#6f9,stroke:#333`
        },

        // === Sequence Diagram (시퀀스 다이어그램) ===
        {
            category: '시퀀스 다이어그램',
            keywords: ['시퀀스', 'sequence', '순차', '메시지', '기본'],
            name: '기본 시퀀스',
            description: '참가자 간 메시지 흐름',
            template: `sequenceDiagram
    participant A as 사용자
    participant B as 서버
    A->>B: 요청
    B-->>A: 응답`
        },
        {
            category: '시퀀스 다이어그램',
            keywords: ['시퀀스', 'sequence', '활성화', 'activate', 'deactivate'],
            name: '활성화 표시',
            description: '참가자 활성 구간 표시',
            template: `sequenceDiagram
    participant A as 클라이언트
    participant B as 서버
    A->>+B: 요청
    B-->>-A: 응답`
        },
        {
            category: '시퀀스 다이어그램',
            keywords: ['시퀀스', 'sequence', '반복', 'loop', '루프'],
            name: '반복 (Loop)',
            description: '반복 구간 표시',
            template: `sequenceDiagram
    participant A as 클라이언트
    participant B as 서버
    loop 매 1초마다
        A->>B: 상태 확인
        B-->>A: 상태 응답
    end`
        },
        {
            category: '시퀀스 다이어그램',
            keywords: ['시퀀스', 'sequence', '조건', 'alt', 'else', '분기'],
            name: '조건 분기 (Alt)',
            description: '조건에 따른 분기',
            template: `sequenceDiagram
    participant A as 사용자
    participant B as 시스템
    A->>B: 로그인 요청
    alt 성공
        B-->>A: 환영 메시지
    else 실패
        B-->>A: 오류 메시지
    end`
        },
        {
            category: '시퀀스 다이어그램',
            keywords: ['시퀀스', 'sequence', '선택', 'opt', 'optional'],
            name: '선택적 (Opt)',
            description: '선택적 실행 구간',
            template: `sequenceDiagram
    participant A as 사용자
    participant B as 시스템
    A->>B: 요청
    opt 캐시 있음
        B-->>A: 캐시된 결과
    end
    B-->>A: 새 결과`
        },
        {
            category: '시퀀스 다이어그램',
            keywords: ['시퀀스', 'sequence', '노트', 'note', '메모'],
            name: '노트 추가',
            description: '설명 노트 추가',
            template: `sequenceDiagram
    participant A as 사용자
    participant B as 서버
    Note over A: 클라이언트 측
    A->>B: 요청
    Note over B: 처리 중...
    Note over A,B: 양쪽에 걸친 노트
    B-->>A: 응답`
        },
        {
            category: '시퀀스 다이어그램',
            keywords: ['시퀀스', 'sequence', '화살표', 'arrow', '메시지 종류'],
            name: '메시지 종류',
            description: '다양한 메시지 화살표',
            template: `sequenceDiagram
    participant A
    participant B
    A->B: 실선 (동기)
    A-->B: 점선
    A->>B: 실선 화살표
    A-->>B: 점선 화살표
    A-xB: 실선 X
    A--xB: 점선 X`
        },

        // === Class Diagram (클래스 다이어그램) ===
        {
            category: '클래스 다이어그램',
            keywords: ['클래스', 'class', 'UML', '기본', '객체'],
            name: '기본 클래스',
            description: '속성과 메서드가 있는 클래스',
            template: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
        +move()
    }`
        },
        {
            category: '클래스 다이어그램',
            keywords: ['클래스', 'class', '상속', 'inheritance', 'extends'],
            name: '상속 관계',
            description: '클래스 상속 표현',
            template: `classDiagram
    Animal <|-- Dog
    Animal <|-- Cat
    class Animal {
        +String name
        +makeSound()
    }
    class Dog {
        +bark()
    }
    class Cat {
        +meow()
    }`
        },
        {
            category: '클래스 다이어그램',
            keywords: ['클래스', 'class', '구현', 'interface', 'implements'],
            name: '인터페이스 구현',
            description: '인터페이스 구현 관계',
            template: `classDiagram
    class Flyable {
        <<interface>>
        +fly()
    }
    class Bird {
        +fly()
        +sing()
    }
    Flyable <|.. Bird`
        },
        {
            category: '클래스 다이어그램',
            keywords: ['클래스', 'class', '관계', 'relation', '연관', 'association'],
            name: '관계 종류',
            description: '클래스 간 다양한 관계',
            template: `classDiagram
    classA <|-- classB : 상속
    classC *-- classD : 구성
    classE o-- classF : 집합
    classG --> classH : 연관
    classI -- classJ : 링크
    classK ..> classL : 의존
    classM ..|> classN : 구현`
        },
        {
            category: '클래스 다이어그램',
            keywords: ['클래스', 'class', '다중성', 'multiplicity', 'cardinality'],
            name: '다중성 표시',
            description: '관계의 다중성 표현',
            template: `classDiagram
    Customer "1" --> "*" Order : places
    Order "*" --> "1..*" Product : contains
    class Customer {
        +String name
    }
    class Order {
        +Date date
    }
    class Product {
        +String name
        +float price
    }`
        },

        // === State Diagram (상태 다이어그램) ===
        {
            category: '상태 다이어그램',
            keywords: ['상태', 'state', '상태머신', '기본', 'state machine'],
            name: '기본 상태 다이어그램',
            description: '상태 전이 표현',
            template: `stateDiagram-v2
    [*] --> 대기
    대기 --> 처리중 : 시작
    처리중 --> 완료 : 성공
    처리중 --> 오류 : 실패
    완료 --> [*]
    오류 --> 대기 : 재시도`
        },
        {
            category: '상태 다이어그램',
            keywords: ['상태', 'state', '복합', 'composite', '중첩'],
            name: '복합 상태',
            description: '중첩된 상태 표현',
            template: `stateDiagram-v2
    [*] --> 활성
    state 활성 {
        [*] --> 유휴
        유휴 --> 실행중 : 시작
        실행중 --> 유휴 : 정지
    }
    활성 --> 비활성 : 종료
    비활성 --> [*]`
        },
        {
            category: '상태 다이어그램',
            keywords: ['상태', 'state', '분기', 'fork', 'join', '병렬'],
            name: '분기와 합류',
            description: '병렬 상태 처리',
            template: `stateDiagram-v2
    [*] --> 시작
    시작 --> fork1
    state fork1 <<fork>>
    fork1 --> 작업A
    fork1 --> 작업B
    작업A --> join1
    작업B --> join1
    state join1 <<join>>
    join1 --> 종료
    종료 --> [*]`
        },
        {
            category: '상태 다이어그램',
            keywords: ['상태', 'state', '선택', 'choice', '조건'],
            name: '조건 분기',
            description: '조건에 따른 상태 전이',
            template: `stateDiagram-v2
    [*] --> 확인중
    확인중 --> choice1
    state choice1 <<choice>>
    choice1 --> 승인 : 조건 만족
    choice1 --> 거부 : 조건 불만족
    승인 --> [*]
    거부 --> [*]`
        },
        {
            category: '상태 다이어그램',
            keywords: ['상태', 'state', '노트', 'note', '메모'],
            name: '상태에 노트 추가',
            description: '상태 설명 노트',
            template: `stateDiagram-v2
    [*] --> 대기
    대기 --> 처리중
    note right of 대기
        사용자 입력을
        기다리는 상태
    end note
    처리중 --> 완료
    note left of 처리중 : 데이터 처리 중
    완료 --> [*]`
        },

        // === ER Diagram (개체-관계 다이어그램) ===
        {
            category: 'ER 다이어그램',
            keywords: ['ER', 'ERD', '개체관계', 'entity', '데이터베이스', 'DB'],
            name: '기본 ERD',
            description: '엔티티와 관계 표현',
            template: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    PRODUCT ||--o{ LINE_ITEM : "ordered in"`
        },
        {
            category: 'ER 다이어그램',
            keywords: ['ER', 'ERD', '속성', 'attribute', '필드', 'field'],
            name: '엔티티 속성',
            description: '엔티티에 속성 추가',
            template: `erDiagram
    CUSTOMER {
        int id PK
        string name
        string email
        date created_at
    }
    ORDER {
        int id PK
        int customer_id FK
        date order_date
        float total
    }
    CUSTOMER ||--o{ ORDER : places`
        },
        {
            category: 'ER 다이어그램',
            keywords: ['ER', 'ERD', '관계', 'relation', '카디널리티', 'cardinality'],
            name: '관계 종류',
            description: '다양한 관계 표현',
            template: `erDiagram
    A ||--|| B : "1:1 필수"
    C ||--o| D : "1:0..1"
    E ||--o{ F : "1:N"
    G }o--o{ H : "M:N"`
        },

        // === Gantt Chart (간트 차트) ===
        {
            category: '간트 차트',
            keywords: ['간트', 'gantt', '프로젝트', '일정', 'schedule', '타임라인'],
            name: '기본 간트 차트',
            description: '프로젝트 일정 표현',
            template: `gantt
    title 프로젝트 일정
    dateFormat YYYY-MM-DD
    section 기획
        요구사항 분석    :a1, 2024-01-01, 7d
        설계             :a2, after a1, 5d
    section 개발
        구현             :b1, after a2, 14d
        테스트           :b2, after b1, 7d
    section 배포
        배포 준비        :c1, after b2, 3d
        출시             :c2, after c1, 1d`
        },
        {
            category: '간트 차트',
            keywords: ['간트', 'gantt', '마일스톤', 'milestone', '이정표'],
            name: '마일스톤 추가',
            description: '중요 이정표 표시',
            template: `gantt
    title 프로젝트 마일스톤
    dateFormat YYYY-MM-DD
    section 1분기
        Phase 1     :a1, 2024-01-01, 30d
        리뷰        :milestone, m1, after a1, 0d
    section 2분기
        Phase 2     :a2, after m1, 30d
        릴리스      :milestone, m2, after a2, 0d`
        },
        {
            category: '간트 차트',
            keywords: ['간트', 'gantt', '상태', 'status', 'done', 'active', 'crit'],
            name: '작업 상태 표시',
            description: '완료/진행/중요 상태',
            template: `gantt
    title 작업 상태
    dateFormat YYYY-MM-DD
    section 작업
        완료된 작업     :done, a1, 2024-01-01, 5d
        진행중 작업     :active, a2, after a1, 5d
        중요 작업       :crit, a3, after a2, 5d
        예정 작업       :a4, after a3, 5d`
        },

        // === Pie Chart (파이 차트) ===
        {
            category: '파이 차트',
            keywords: ['파이', 'pie', '원형', '비율', 'chart', '그래프'],
            name: '기본 파이 차트',
            description: '데이터 비율 표현',
            template: `pie title 브라우저 점유율
    "Chrome" : 65
    "Safari" : 20
    "Firefox" : 10
    "기타" : 5`
        },
        {
            category: '파이 차트',
            keywords: ['파이', 'pie', '설문', 'survey', '통계'],
            name: '설문 결과',
            description: '설문 응답 비율',
            template: `pie showData
    title 만족도 조사
    "매우 만족" : 42
    "만족" : 30
    "보통" : 18
    "불만족" : 7
    "매우 불만족" : 3`
        },

        // === Mindmap (마인드맵) ===
        {
            category: '마인드맵',
            keywords: ['마인드맵', 'mindmap', '브레인스토밍', '아이디어', '개념도'],
            name: '기본 마인드맵',
            description: '계층적 아이디어 표현',
            template: `mindmap
    root((중심 주제))
        주제 1
            세부 1-1
            세부 1-2
        주제 2
            세부 2-1
            세부 2-2
        주제 3
            세부 3-1`
        },
        {
            category: '마인드맵',
            keywords: ['마인드맵', 'mindmap', '프로젝트', '계획', '구조'],
            name: '프로젝트 구조',
            description: '프로젝트 구성 요소',
            template: `mindmap
    root((프로젝트))
        프론트엔드
            React
            CSS
            API 연동
        백엔드
            Node.js
            데이터베이스
            인증
        인프라
            AWS
            CI/CD
            모니터링`
        },

        // === Git Graph ===
        {
            category: 'Git 그래프',
            keywords: ['git', '깃', '브랜치', 'branch', '커밋', 'commit'],
            name: '기본 Git 그래프',
            description: 'Git 브랜치 히스토리',
            template: `gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit`
        },
        {
            category: 'Git 그래프',
            keywords: ['git', '깃', 'feature', '기능', '브랜치'],
            name: 'Feature 브랜치',
            description: 'Feature 브랜치 워크플로우',
            template: `gitGraph
    commit id: "init"
    branch develop
    commit id: "dev-1"
    branch feature/login
    commit id: "login-1"
    commit id: "login-2"
    checkout develop
    merge feature/login
    branch feature/signup
    commit id: "signup-1"
    checkout develop
    merge feature/signup
    checkout main
    merge develop tag: "v1.0"`
        },

        // === Timeline ===
        {
            category: '타임라인',
            keywords: ['타임라인', 'timeline', '연대기', '역사', '이력'],
            name: '기본 타임라인',
            description: '시간순 이벤트 표현',
            template: `timeline
    title 프로젝트 연혁
    2020 : 프로젝트 시작
         : 팀 구성
    2021 : 베타 출시
         : 사용자 피드백 수집
    2022 : 정식 출시
         : 글로벌 확장
    2023 : 1000만 사용자 달성`
        },

        // === Quadrant Chart ===
        {
            category: '사분면 차트',
            keywords: ['사분면', 'quadrant', '매트릭스', 'matrix', '우선순위'],
            name: '우선순위 매트릭스',
            description: '긴급/중요도 매트릭스',
            template: `quadrantChart
    title 우선순위 매트릭스
    x-axis 낮은 긴급도 --> 높은 긴급도
    y-axis 낮은 중요도 --> 높은 중요도
    quadrant-1 즉시 처리
    quadrant-2 계획 수립
    quadrant-3 위임
    quadrant-4 제거
    작업A: [0.8, 0.9]
    작업B: [0.3, 0.8]
    작업C: [0.7, 0.3]
    작업D: [0.2, 0.2]`
        },

        // === XY Chart ===
        {
            category: 'XY 차트',
            keywords: ['차트', 'chart', '그래프', 'graph', '선', 'line', '막대', 'bar'],
            name: '선 그래프',
            description: '데이터 추이 표현',
            template: `xychart-beta
    title "월별 매출"
    x-axis [1월, 2월, 3월, 4월, 5월, 6월]
    y-axis "매출 (만원)" 0 --> 500
    line [100, 150, 200, 250, 300, 400]`
        },
        {
            category: 'XY 차트',
            keywords: ['차트', 'chart', '막대', 'bar', '비교'],
            name: '막대 그래프',
            description: '카테고리별 비교',
            template: `xychart-beta
    title "분기별 실적"
    x-axis [Q1, Q2, Q3, Q4]
    y-axis "실적" 0 --> 100
    bar [30, 45, 60, 80]`
        },

        // === Requirement Diagram ===
        {
            category: '요구사항 다이어그램',
            keywords: ['요구사항', 'requirement', '기능', 'feature', '명세'],
            name: '요구사항 명세',
            description: '시스템 요구사항 표현',
            template: `requirementDiagram
    requirement 사용자_인증 {
        id: REQ-001
        text: 사용자는 이메일로 로그인할 수 있어야 한다
        risk: high
        verifymethod: test
    }

    functionalRequirement 비밀번호_암호화 {
        id: REQ-002
        text: 비밀번호는 암호화되어 저장되어야 한다
        risk: high
        verifymethod: inspection
    }

    사용자_인증 - derives -> 비밀번호_암호화`
        },

        // === Block Diagram ===
        {
            category: '블록 다이어그램',
            keywords: ['블록', 'block', '시스템', 'system', '아키텍처', 'architecture'],
            name: '시스템 블록도',
            description: '시스템 구성 요소',
            template: `block-beta
    columns 3
    Frontend["프론트엔드"]:1
    space:1
    Backend["백엔드"]:1

    space:3

    DB[("데이터베이스")]:3

    Frontend --> Backend
    Backend --> DB`
        }
    ],

    /**
     * Initialize the module
     */
    init() {
        this.createDialog();
        this.bindEvents();
        this.bindToolbarButton();
        console.log('[MermaidHelper] Initialized with', this.database.length, 'templates');
    },

    /**
     * Bind toolbar button event
     */
    bindToolbarButton() {
        const btn = document.getElementById('btn-mermaid-helper');
        if (btn) {
            btn.addEventListener('click', () => this.toggle());
        }
    },

    /**
     * Create the dialog HTML
     */
    createDialog() {
        const dialog = document.createElement('div');
        dialog.id = 'mermaid-helper-dialog';
        dialog.className = 'mermaid-helper-dialog';
        dialog.style.display = 'none';

        dialog.innerHTML = `
            <div class="dialog-header">
                <h3>Mermaid 다이어그램 도우미</h3>
                <button class="close-btn" id="mermaid-helper-close">&times;</button>
            </div>
            <div class="dialog-body">
                <div class="search-container">
                    <input type="text" id="mermaid-search" placeholder="검색어 입력 (예: 순서도, 시퀀스, 클래스...)" autocomplete="off">
                    <div id="mermaid-suggestions" class="suggestions-container"></div>
                </div>
                <div class="mermaid-content">
                    <div id="mermaid-results" class="results-container">
                        <div class="results-placeholder">
                            <p>검색어를 입력하거나 카테고리를 선택하세요.</p>
                            <p class="hint">한글 또는 영어로 검색할 수 있습니다.</p>
                        </div>
                    </div>
                    <div id="mermaid-preview" class="preview-container">
                        <div class="preview-header">미리보기</div>
                        <div id="mermaid-preview-content" class="preview-content">
                            <p class="preview-placeholder">템플릿을 선택하면 미리보기가 표시됩니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);
        this.dialog = dialog;
        this.searchInput = dialog.querySelector('#mermaid-search');
        this.resultsContainer = dialog.querySelector('#mermaid-results');
        this.suggestionsContainer = dialog.querySelector('#mermaid-suggestions');
        this.previewContainer = dialog.querySelector('#mermaid-preview-content');
    },

    /**
     * Bind event handlers
     */
    bindEvents() {
        // Close button
        const closeBtn = this.dialog.querySelector('#mermaid-helper-close');
        closeBtn.addEventListener('click', () => this.close());

        // Search input
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length > 0) {
                this.showSuggestions(query);
                this.search(query);
            } else {
                this.clearSuggestions();
                this.showAllCategories();
            }
        });

        // Handle keyboard navigation
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.focusNextSuggestion();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.focusPrevSuggestion();
            } else if (e.key === 'Enter') {
                const focused = this.suggestionsContainer.querySelector('.suggestion-item.focused');
                if (focused) {
                    e.preventDefault();
                    focused.click();
                }
            }
        });

        // Click outside to close
        this.dialog.addEventListener('click', (e) => {
            if (e.target === this.dialog) {
                this.close();
            }
        });

        // Keyboard shortcut (Ctrl/Cmd + Shift + M to open)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
                e.preventDefault();
                this.toggle();
            }
        });
    },

    /**
     * Show all categories when no search
     */
    showAllCategories() {
        const categories = [...new Set(this.database.map(item => item.category))];

        let html = '<div class="category-list">';
        categories.forEach(category => {
            const items = this.database.filter(item => item.category === category);
            html += `
                <div class="category-section">
                    <h4 class="category-title" data-category="${category}">${category} (${items.length})</h4>
                </div>
            `;
        });
        html += '</div>';

        this.resultsContainer.innerHTML = html;

        // Bind category click events
        this.resultsContainer.querySelectorAll('.category-title').forEach(title => {
            title.addEventListener('click', () => {
                this.showCategoryItems(title.dataset.category);
            });
        });
    },

    /**
     * Show items in a category
     */
    showCategoryItems(category) {
        const items = this.database.filter(item => item.category === category);
        this.renderResults(items, category);
    },

    /**
     * Show autocomplete suggestions
     */
    showSuggestions(query) {
        const lowerQuery = query.toLowerCase();
        const suggestions = new Set();

        this.database.forEach(item => {
            item.keywords.forEach(keyword => {
                if (keyword.toLowerCase().startsWith(lowerQuery) && keyword.toLowerCase() !== lowerQuery) {
                    suggestions.add(keyword);
                }
            });
        });

        if (suggestions.size > 0) {
            const sortedSuggestions = Array.from(suggestions).slice(0, 8);
            this.suggestionsContainer.innerHTML = sortedSuggestions
                .map(s => `<div class="suggestion-item" data-value="${s}">${this.highlightMatch(s, query)}</div>`)
                .join('');
            this.suggestionsContainer.style.display = 'block';

            this.suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.searchInput.value = item.dataset.value;
                    this.clearSuggestions();
                    this.search(item.dataset.value);
                    this.searchInput.focus();
                });
            });
        } else {
            this.clearSuggestions();
        }
    },

    /**
     * Highlight matching part of suggestion
     */
    highlightMatch(text, query) {
        const index = text.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) return text;
        return text.substring(0, index) +
               '<strong>' + text.substring(index, index + query.length) + '</strong>' +
               text.substring(index + query.length);
    },

    /**
     * Clear suggestions
     */
    clearSuggestions() {
        this.suggestionsContainer.innerHTML = '';
        this.suggestionsContainer.style.display = 'none';
    },

    /**
     * Focus next suggestion
     */
    focusNextSuggestion() {
        const items = this.suggestionsContainer.querySelectorAll('.suggestion-item');
        if (items.length === 0) return;

        const focused = this.suggestionsContainer.querySelector('.suggestion-item.focused');
        if (focused) {
            focused.classList.remove('focused');
            const next = focused.nextElementSibling || items[0];
            next.classList.add('focused');
        } else {
            items[0].classList.add('focused');
        }
    },

    /**
     * Focus previous suggestion
     */
    focusPrevSuggestion() {
        const items = this.suggestionsContainer.querySelectorAll('.suggestion-item');
        if (items.length === 0) return;

        const focused = this.suggestionsContainer.querySelector('.suggestion-item.focused');
        if (focused) {
            focused.classList.remove('focused');
            const prev = focused.previousElementSibling || items[items.length - 1];
            prev.classList.add('focused');
        } else {
            items[items.length - 1].classList.add('focused');
        }
    },

    /**
     * Search database
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        const results = [];

        this.database.forEach(item => {
            const matchScore = item.keywords.reduce((score, keyword) => {
                const lowerKeyword = keyword.toLowerCase();
                if (lowerKeyword === lowerQuery) return Math.max(score, 100);
                if (lowerKeyword.startsWith(lowerQuery)) return Math.max(score, 80);
                if (lowerKeyword.includes(lowerQuery)) return Math.max(score, 60);
                return score;
            }, 0);

            // Also check name and description
            if (item.name.toLowerCase().includes(lowerQuery)) {
                results.push({ ...item, score: Math.max(matchScore, 70) });
            } else if (matchScore > 0) {
                results.push({ ...item, score: matchScore });
            }
        });

        results.sort((a, b) => b.score - a.score);
        this.renderResults(results);
    },

    /**
     * Render search results
     */
    renderResults(results, categoryTitle = null) {
        if (results.length === 0) {
            this.resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>검색 결과가 없습니다.</p>
                    <p class="hint">다른 키워드로 검색해 보세요.</p>
                </div>
            `;
            return;
        }

        let html = '';

        if (categoryTitle) {
            html += `<button class="back-btn" id="back-to-categories">&larr; 카테고리 목록</button>`;
        }

        // Group by category
        const grouped = {};
        results.forEach(item => {
            if (!grouped[item.category]) {
                grouped[item.category] = [];
            }
            grouped[item.category].push(item);
        });

        for (const [category, items] of Object.entries(grouped)) {
            html += `<div class="result-category"><h4>${category}</h4>`;
            items.forEach((item, index) => {
                const itemId = `mermaid-item-${this.hashCode(item.template)}`;
                html += `
                    <div class="result-item" data-template="${this.escapeHtml(item.template)}" data-id="${itemId}">
                        <div class="result-info">
                            <span class="result-name">${item.name}</span>
                            <span class="result-description">${item.description}</span>
                        </div>
                        <div class="result-actions">
                            <button class="btn-preview" data-template="${this.escapeHtml(item.template)}">미리보기</button>
                            <button class="btn-insert" data-template="${this.escapeHtml(item.template)}">삽입</button>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }

        this.resultsContainer.innerHTML = html;

        // Bind back button
        const backBtn = this.resultsContainer.querySelector('#back-to-categories');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showAllCategories());
        }

        // Bind button events
        this.resultsContainer.querySelectorAll('.btn-preview').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showPreview(btn.dataset.template);
            });
        });

        this.resultsContainer.querySelectorAll('.btn-insert').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.insertTemplate(btn.dataset.template);
            });
        });

        // Click on result item to preview
        this.resultsContainer.querySelectorAll('.result-item').forEach(item => {
            item.addEventListener('click', () => {
                // Remove selected class from all items
                this.resultsContainer.querySelectorAll('.result-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                this.showPreview(item.dataset.template);
            });
        });
    },

    /**
     * Show Mermaid preview
     */
    async showPreview(template) {
        const previewContent = this.previewContainer;

        // Create unique ID for this render
        const renderId = 'mermaid-preview-' + Date.now();

        previewContent.innerHTML = `<div id="${renderId}" class="mermaid-render">${template}</div>`;

        // Render with Mermaid
        if (typeof mermaid !== 'undefined') {
            try {
                // Remove any previous render
                delete mermaid.mermaidAPI;

                await mermaid.run({
                    nodes: [document.getElementById(renderId)]
                });
            } catch (e) {
                console.error('[MermaidHelper] Preview error:', e);
                previewContent.innerHTML = `
                    <div class="preview-error">
                        <p>미리보기를 생성할 수 없습니다.</p>
                        <pre>${this.escapeHtml(template)}</pre>
                    </div>
                `;
            }
        } else {
            previewContent.innerHTML = `<pre>${this.escapeHtml(template)}</pre>`;
        }
    },

    /**
     * Insert template into editor
     */
    insertTemplate(template) {
        const codeBlock = '\n```mermaid\n' + template + '\n```\n';

        if (typeof EditorModule !== 'undefined' && EditorModule.insertText) {
            EditorModule.insertText(codeBlock);
            this.close();
        } else {
            this.copyToClipboard(codeBlock);
            alert('에디터에 직접 삽입할 수 없습니다. 템플릿이 클립보드에 복사되었습니다.');
        }
    },

    /**
     * Copy to clipboard
     */
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('[MermaidHelper] Copied to clipboard');
        }).catch(err => {
            console.error('[MermaidHelper] Copy failed:', err);
        });
    },

    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Simple hash code for unique IDs
     */
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    },

    /**
     * Open dialog
     */
    open() {
        this.dialog.style.display = 'flex';
        this.isOpen = true;
        this.searchInput.value = '';
        this.showAllCategories();
        this.clearSuggestions();
        this.previewContainer.innerHTML = '<p class="preview-placeholder">템플릿을 선택하면 미리보기가 표시됩니다.</p>';
        setTimeout(() => this.searchInput.focus(), 100);
    },

    /**
     * Close dialog
     */
    close() {
        this.dialog.style.display = 'none';
        this.isOpen = false;
    },

    /**
     * Toggle dialog
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    MermaidHelperModule.init();
});

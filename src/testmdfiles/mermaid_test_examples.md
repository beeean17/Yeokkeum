# Mermaid 다이어그램 테스트 예제 모음

## 1. 플로우차트 (Flowchart)

### 간단한 플로우차트
```mermaid
flowchart TD
    A[시작] --> B{조건 확인}
    B -->|Yes| C[처리 1]
    B -->|No| D[처리 2]
    C --> E[종료]
    D --> E
```

### 복잡한 플로우차트
```mermaid
flowchart LR
    A[크리스마스] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[Car]
```

## 2. 시퀀스 다이어그램 (Sequence Diagram)

### 로그인 시퀀스
```mermaid
sequenceDiagram
    participant 사용자
    participant 웹앱
    participant 서버
    participant DB

    사용자->>웹앱: 로그인 클릭
    웹앱->>서버: POST /login
    서버->>DB: SELECT user
    DB-->>서버: User data
    서버-->>웹앱: JWT Token
    웹앱-->>사용자: 로그인 성공
```

### 주문 처리 시퀀스
```mermaid
sequenceDiagram
    actor 고객
    participant 장바구니
    participant 결제시스템
    participant 재고관리

    고객->>장바구니: 상품 추가
    고객->>결제시스템: 결제 요청
    결제시스템->>재고관리: 재고 확인
    재고관리-->>결제시스템: 재고 있음
    결제시스템->>결제시스템: 결제 처리
    결제시스템-->>고객: 결제 완료
```

## 3. 클래스 다이어그램 (Class Diagram)

### 간단한 클래스 구조
```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
        +eat()
    }
    class Dog {
        +String breed
        +bark()
        +fetch()
    }
    class Cat {
        +String color
        +meow()
        +scratch()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

### 상세한 클래스 다이어그램
```mermaid
classDiagram
    class User {
        -String id
        -String email
        -String password
        +login()
        +logout()
        +updateProfile()
    }
    class Post {
        -String id
        -String title
        -String content
        -Date createdAt
        +create()
        +update()
        +delete()
    }
    class Comment {
        -String id
        -String text
        -Date createdAt
        +add()
        +remove()
    }
    User "1" --> "*" Post : writes
    Post "1" --> "*" Comment : has
    User "1" --> "*" Comment : writes
```

## 4. 상태 다이어그램 (State Diagram)

### 주문 상태
```mermaid
stateDiagram-v2
    [*] --> 주문접수
    주문접수 --> 결제대기
    결제대기 --> 결제완료
    결제대기 --> 결제실패
    결제완료 --> 배송준비
    배송준비 --> 배송중
    배송중 --> 배송완료
    배송완료 --> [*]
    결제실패 --> 주문취소
    주문취소 --> [*]
```

### 로그인 상태
```mermaid
stateDiagram-v2
    [*] --> 로그아웃
    로그아웃 --> 로그인중: 로그인 시도
    로그인중 --> 로그인완료: 성공
    로그인중 --> 로그아웃: 실패
    로그인완료 --> 로그아웃: 로그아웃
    로그인완료 --> 세션만료: 타임아웃
    세션만료 --> 로그아웃
```

## 5. ER 다이어그램 (Entity Relationship)

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses

    CUSTOMER {
        string id PK
        string name
        string email
        date registered
    }
    ORDER {
        string id PK
        date orderDate
        string status
        float total
    }
    LINE-ITEM {
        string id PK
        int quantity
        float price
    }
    DELIVERY-ADDRESS {
        string id PK
        string street
        string city
        string zipCode
    }
```

## 6. 간트 차트 (Gantt Chart)

### 프로젝트 일정
```mermaid
gantt
    title 새김 에디터 개발 일정
    dateFormat  YYYY-MM-DD
    section 설계
    요구사항 분석       :a1, 2024-11-01, 7d
    UI/UX 디자인       :a2, after a1, 5d
    아키텍처 설계      :a3, after a2, 3d
    section 개발
    기본 에디터        :b1, 2024-11-16, 10d
    미리보기 기능      :b2, 2024-11-20, 7d
    다이어그램 렌더링  :b3, after b2, 5d
    PDF 변환          :b4, after b3, 7d
    section 테스트
    단위 테스트        :c1, after b4, 5d
    통합 테스트        :c2, after c1, 3d
```

### 스프린트 계획
```mermaid
gantt
    title 스프린트 1 & 2
    dateFormat  YYYY-MM-DD
    section Sprint 1
    Story 1 :s1, 2024-11-13, 3d
    Story 2 :s2, 2024-11-14, 4d
    Story 3 :s3, after s1, 2d
    section Sprint 2
    Story 4 :s4, 2024-11-20, 5d
    Story 5 :s5, after s4, 3d
```

## 7. 파이 차트 (Pie Chart)

### 프로그래밍 언어 사용 비율
```mermaid
pie title 2024 프로그래밍 언어 사용률
    "Python" : 42
    "JavaScript" : 28
    "Java" : 15
    "C++" : 8
    "기타" : 7
```

### 프로젝트 시간 분배
```mermaid
pie title 개발 시간 분배
    "코딩" : 45
    "디버깅" : 25
    "회의" : 15
    "문서작성" : 10
    "기타" : 5
```

## 8. 타임라인 (Git Graph)

```mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    branch feature
    checkout feature
    commit
    checkout main
    merge feature
```

## 9. 마인드맵 (Mind Map)

```mermaid
mindmap
  root((새김 에디터))
    기능
      에디터
        마크다운 편집
        문법 강조
        자동완성
      미리보기
        실시간 렌더링
        스크롤 동기화
      변환
        PDF 내보내기
        DOCX 변환
    기술
      프론트엔드
        HTML/CSS/JS
        CodeMirror
        Mermaid
      백엔드
        Python
        PyQt6
        WeasyPrint
    목표
      개발자 친화적
      오프라인 사용
      빠른 성능
```

## 10. 요구사항 다이어그램

```mermaid
requirementDiagram
    requirement 마크다운편집 {
        id: 1
        text: 사용자는 마크다운을 편집할 수 있어야 한다
        risk: high
        verifymethod: test
    }
    requirement 실시간미리보기 {
        id: 2
        text: 입력 즉시 미리보기가 업데이트되어야 한다
        risk: medium
        verifymethod: inspection
    }
    requirement PDF변환 {
        id: 3
        text: 마크다운을 PDF로 변환할 수 있어야 한다
        risk: low
        verifymethod: demonstration
    }
    마크다운편집 - satisfies -> 실시간미리보기
    마크다운편집 - refines -> PDF변환
```

## 11. 사용자 여정 (User Journey)

```mermaid
journey
    title 새김 에디터 사용 여정
    section 시작
      앱 실행: 5: 사용자
      새 파일 생성: 4: 사용자
    section 작성
      마크다운 작성: 5: 사용자
      미리보기 확인: 5: 사용자
      다이어그램 추가: 4: 사용자
    section 저장
      파일 저장: 5: 사용자
      PDF 내보내기: 4: 사용자
    section 종료
      앱 종료: 5: 사용자
```

---

## 테스트 방법

1. 위의 코드 블록을 하나씩 복사해서 에디터에 붙여넣기
2. 오른쪽 미리보기에서 다이어그램이 렌더링되는지 확인
3. 터미널에서 `[JS Console]` 메시지 확인
4. 문제가 있으면 에러 메시지 복사해서 공유

## 예상 결과

각 다이어그램이 깔끔하게 렌더링되어야 하며, 터미널에는:
- `🔍 Found X Mermaid code blocks`
- `✅ Rendered X Mermaid diagrams`

이런 메시지가 나타나야 합니다.



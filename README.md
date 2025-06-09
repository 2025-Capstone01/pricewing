
# Pricewing(크롤링 기반 가격 변동 추적기)
![Image](https://github.com/user-attachments/assets/259efe39-2fbe-419c-b2c0-b96709db771a)
![image](https://github.com/user-attachments/assets/73744a67-52b2-4584-b497-949786985575)

**프라이스윙은 무신사 플랫폼을 기반으로 사용자가 입력한 상품의 가격 변동 이력을 시각화하고 가격 하락 시 웹 및 이메일을 통해 알림을 받을 수 있도록 설계된 웹 기반 가격 추적 및 분석 서비스입니다. 이 플랫폼은 상품의 가격 데이터를 자동으로 수집하고, 가격 추세를 시각화된 그래프와 함께 OpenAI의 ChatGPT API를 활용한 자연어 요약을 제공함으로써 사용자가 최적의 구매 시점을 판단할 수 있도록 지원합니다.**

**프론트엔드는 React 기반의 SPA(Single Page Application) 구조로 개발되었습니다. 상품 검색, 가격 그래프 출력, AI 분석 결과 표시, 관심 상품 관리 등의 기능으로 구성되어 있습니다.**

**백엔드는 Node.js 기반 Express 프레임워크로 구성된 RESTful API를 사용하며, Firebase Authentication을 통해 사용자 인증을 처리하고, 가입 정보는 AWS RDS(MySQL)와 실시간 연동됩니다. 
전체 서비스는 AWS EC2 인스턴스에 배포되었으며, 데이터베이스는 AWS RDS(MySQL)를 활동해 운영됩니다. 또한 서버 운영 자동화를 위해 Lambda와 EventBridge를 활용하여 EC2 인스턴스의 자동 시작/종료 시스템도 구축하였습니다.**

### 작품명
작품명은 프라이스윙(Pricewing)이고 무신사 상품의 가격 변동을 추적하고 시각화하는 웹 기반 서비스입니다. 이름의 뜻은 프라이스(가격) + 스윙(흔들리다)을 합성하여 가격이 일정하지 않고 지속적으로 오르내리는 움직임을 표현했습니다. 웹사이트가 실시간으로 가격 변동을 추적하고 사용자에게 이를 효과적으로 알리는 서비스를 제공한다는 의미를 담고 있습니다. 단순한 가격 표시를 넘어서, 가격 추세를 분석하고 알림을 통해 합리적 소비를 유도하는 기능을 통해 사용자의 구매 경험을 개선하고자 하는 것을 목표로 합니다.

### 기능 소개
![image](https://github.com/user-attachments/assets/6cd4b755-32bb-48f5-94bc-ceea769b4f48)

### 페이지 구성도
![image](https://github.com/user-attachments/assets/43edab0f-8a0b-4839-ab40-d9a5e37b5346)
![image](https://github.com/user-attachments/assets/98cab832-bba8-4314-8ba3-31797165bb0f)
![image](https://github.com/user-attachments/assets/32c7361e-976f-4f18-9364-74d36958797e)

### 클래스 다이어그램
![image](https://github.com/user-attachments/assets/c3cff6cf-417c-43ff-8a29-0c2d5cdc4732)
- `Main` : 전체 페이지의 라우팅 담당
- `Home_page` : 사용자가 상품 링크를 입력하면 해당 상품을 분석해 보여주는 메인 화면
- `MyPage` : 로그인한 사용자가 관심 상품을 확인할 수 있는 개인 페이지
- `SignIn` : 이메일/비밀번호 로그인과 구글 로그인 처리
- `SignUp` : 신규 유저 등록, 이메일+비밀번호 기반 계정 생성
- `Header` : 로그인 상태, 알림, 이동 버튼 등을 표시하는 공통 상단 컴포넌트
- `useNavigationHandler` : 쉬운 페이지 전환을 위한 페이지 이동 전용 훅

### 데이터베이스 ER 다이어그램
![image](https://github.com/user-attachments/assets/8822b8e6-6f9c-4302-93f0-00dc79eecc27)

### 데이터베이스 스키마
![image](https://github.com/user-attachments/assets/b1e91944-bc8e-439f-8c16-83eb1b4f5b64)

### 데이터베이스 설명
- `상품 테이블(products)` : 무신사에서 크롤링한 각 상품 정보를 저장하는 테이블로 상품 ID를 기본키로 사용한다. 상품명, 정가, 이미지 링크, 상품 링크, 카테고리 ID 등으로 구성되어 있다. 가격 이력 조회 및 사용자 관심상품과의 연동을 위한 중심 테이블이다.

- `가격 이력 테이블(price_history)` : 상품 가격의 데이터 변동을 기록하는 테이블로 상품 ID와 확인 시점(checked_at)의 복합 기본키를 사용해 동일 시간대의 중복 기록을 방지한다. 가격 추이 분석, 할인 감지, AI 요약 분석 등에 활용된다.

- `관심 상품 테이블(likes)` : 사용자가 관심을 표시한 상품 정보를 저장한다. 사용자 ID와 상품 ID의 복합 기본키를 통해 하나의 사용자가 동일 상품을 중복 등록할 수 없도록 설정되어 있다. 알림 기능과 연결되며, 카테고리 ID, 좋아요 당시 가격, 마지막 알림 시각 정보도 함께 저장된다.

- `카테고리 테이블(categories)` : 각 상품이 속한 패션 카테고리를 정의한 테이블로이다. 카테고리 ID는 auto_increment로 자동 증가되며, 중복되지 않는 이름을 UNIQUE로 관리한다. 카테고리는 가방, 바지, 상의, 신발, 아우터, 원피스/스커트 총 6개로 분류된다.

- `사용자 테이블(user)` : 웹사이트에 가입된 사용자 계정을 저장하며, user_id를 기본키로 사용한다. 이메일은 UNIQUE 제약으로 중복을 방지하며, 비밀번호와 가입 시각(created_at)이 함께 저장된다. Firebase와 연동되어 회원가입 시 실시간으로 이 테이블에 데이터가 등록된다.

- `알림 기록 테이블(alert_log)` : 관심 상품의 가격 변동이 감지되었을 때 사용자에게 발송된 알림을 기록하는 테이블이다. 알림 ID를 기본키로 하며 어떤 사용자가 어떤 상품에 대해 얼마에, 언제 알림을 받았는지를 추적 가능하다. 알림 중복 방지 및 로그 관리에 사용된다.

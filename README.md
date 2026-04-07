# QA 자동화 테스트 프로젝트

Selenium과 pytest를 활용한 웹 서비스 자동화 테스트 프로젝트입니다.

## 테스트 항목

### 네이버 검색 테스트
- 검색어 입력 후 결과 페이지 정상 이동 검증
- 빈 검색어 입력 시 동작 검증

### Tapas 로그인 테스트
- 이메일/패스워드 로그인 정상 동작 검증
- CAPTCHA 감지 시 자동 스킵 처리

## 사용 기술
- Python
- Selenium
- pytest
- pytest-html

## 실행 방법
```bash
pip install selenium pytest pytest-html chromedriver-autoinstaller
pytest
```

## 테스트 결과
pytest 실행 시 report.html 파일로 결과 자동 생성
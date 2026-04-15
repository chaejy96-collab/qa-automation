# QA 자동화 테스트 프로젝트

Selenium과 pytest로 **웹 자동화 테스트**를 공부하고 있습니다.

## 테스트 항목

### 네이버 검색 테스트
- 검색어 입력 후 결과 페이지 검증
- 빈 검색어 동작 확인  
- 블로그 탭 클릭 검증

### Tapas 로그인 테스트
- 정상 로그인 검증
- 로그인 실패 에러 검증

### 시나리오 테스트
- 네이버 검색 → 블로그 → 첫 결과 클릭 검증

## 사용 기술
🐍 Python + Selenium + pytest
📊 pytest-html 리포트
🔄 GitHub Actions CI


## 실행 방법
```bash
pip install selenium pytest pytest-html
pytest
```

## CI 설정
✅ 매일 오후 2시 자동 실행
✅ Actions 탭 → report.zip → report.html 확인


---

**지금 **Selenium/pytest** 공부하며 직접 구현 중입니다!**  
**CI까지 연결해보고 있습니다** 📈
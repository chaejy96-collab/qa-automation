from selenium.webdriver.support import expected_conditions as EC

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()

def test_naver_search_scenario(driver):
    driver.get("https://www.naver.com")

    # 1. 검색
    search_box = driver.find_element(By.CSS_SELECTOR, "#query")
    search_box.send_keys("아이묭")
    search_box.send_keys(Keys.ENTER)

    # 2. 로딩 대기
    WebDriverWait(driver, 10).until(EC.title_contains("아이묭"))

    # 3. 블로그 탭 클릭
    blog_button = driver.find_element(By.CSS_SELECTOR, "#lnb > div.lnb_group > div > div.lnb_nav_area._nav_area_root > div > div.api_flicking_wrap._conveyer_root > div:nth-child(2) > a")
    blog_button.click()

    # 4. 블로그 탭 로딩 대기
    WebDriverWait(driver, 10).until(EC.title_contains("블로그"))

    # 5. 첫 번째 결과 클릭
    results = driver.find_elements(By.CSS_SELECTOR, "span.sds-comps-text-type-headline1")
    results[0].click()

    # 6. 새 탭으로 전환
    driver.switch_to.window(driver.window_handles[-1])

    # 7. 새 탭 URL 검증 (네이버가 아닌 다른 페이지로 이동했는지)
    assert "blog.naver.com" in driver.current_url, f"테스트 실패! URL: {driver.current_url}"
    print(f"✅ 블로그 페이지 이동 확인! URL: {driver.current_url}")
from selenium.webdriver.support import expected_conditions as EC

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import chromedriver_autoinstaller
from selenium.webdriver.support.wait import WebDriverWait


@pytest.fixture
def driver():
    chromedriver_autoinstaller.install()
    driver = webdriver.Chrome()
    yield driver
    driver.quit()


def test_naver_search(driver):
    driver.get("https://www.naver.com")

    search_box = driver.find_element(By.CSS_SELECTOR, "#query")
    search_box.send_keys("QA 자동화")
    search_box.send_keys(Keys.ENTER)

    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    WebDriverWait(driver, 10).until(EC.title_contains("QA 자동화"))

    assert "QA 자동화" in driver.title, f"테스트 실패! 제목: {driver.title}"
    print("✅ 테스트 통과!")

def test_empty_search(driver):
    driver.get("https://www.naver.com")

    search_box = driver.find_element(By.CSS_SELECTOR, "#query")
    search_box.send_keys("")
    search_box.send_keys(Keys.ENTER)

    WebDriverWait(driver, 10).until(EC.title_contains("네이버 검색"))
    assert "NAVER" not in driver.title, f"테스트 실패! 제목: {driver.title}"
    print("✅ 빈 검색어 테스트 통과!")
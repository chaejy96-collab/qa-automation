import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import chromedriver_autoinstaller
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.fixture
def driver():
    chromedriver_autoinstaller.install()
    driver = webdriver.Chrome()
    yield driver
    driver.quit()

def test_naver_search(driver):
    driver.get("https://www.naver.com")

    search_box = driver.find_element(By.CSS_SELECTOR, "#query")
    search_box.send_keys("손아섭 두산")
    search_box.send_keys(Keys.ENTER)

    WebDriverWait(driver, 10).until(EC.title_contains("손아섭 두산"))

    assert "손아섭 두산" in driver.title, f"테스트 실패 : {driver.title}"
    print("✅ 테스트 통과!")

def test_empty_search(driver):
    driver.get("https://www.naver.com")

    search_box = driver.find_element(By.CSS_SELECTOR, "#query")
    search_box.send_keys("")
    search_box.send_keys(Keys.ENTER)

    WebDriverWait(driver, 10).until(EC.title_contains("네이버 검색"))

    assert "네이버 검색" in driver.title, f"테스트 실패 : {driver.title}"
    print("✅ 테스트 통과!")

def test_blog_search(driver):
    driver.get("https://www.naver.com")

    search_box = driver.find_element(By.CSS_SELECTOR, "#query")
    search_box.send_keys("손아섭")
    search_box.send_keys(Keys.ENTER)

    WebDriverWait(driver, 10).until(EC.title_contains("손아섭"))

    blog_button = driver.find_element(By.CSS_SELECTOR, "#lnb > div.lnb_group > div > div.lnb_nav_area._nav_area_root > div > div.api_flicking_wrap._conveyer_root > div:nth-child(5) > a")
    blog_button.click()

    WebDriverWait(driver, 10).until(EC.title_contains("블로그"))
    assert "블로그" in driver.title, f"테스트 실패 : {driver.title}"
    print("✅ 테스트 통과!")
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
    driver.get("http://www.naver.com")

    search_box = driver.find_element(By.CSS_SELECTOR, "#query")
    search_box.send_keys("손아섭 두산")
    search_box.send_keys(Keys.ENTER)


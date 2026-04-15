from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import pytest
import chromedriver_autoinstaller

@pytest.fixture
def driver():
    chromedriver_autoinstaller.install()

    options = Options()
    options.add_argument("--headless=new")   # 핵심
    options.add_argument("--no-sandbox")     # CI 필수
    options.add_argument("--disable-dev-shm-usage")  # 메모리 이슈 방지

    driver = webdriver.Chrome(options=options)
    yield driver
    driver.quit()
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import chromedriver_autoinstaller
import pytest

@pytest.fixture
def driver():
    chromedriver_autoinstaller.install()

    options = Options()
    options.add_argument("--headless=new")  # 중요
    options.add_argument("--no-sandbox")    # CI 필수
    options.add_argument("--disable-dev-shm-usage")  # 메모리 이슈 방지
    options.add_argument("--window-size=1920,1080")

    driver = webdriver.Chrome(options=options)
    yield driver
    driver.quit()
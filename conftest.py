import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import chromedriver_autoinstaller

@pytest.fixture
def driver():
    chromedriver_autoinstaller.install()

    chrome_options = Options()
    chrome_options.add_argument("--headless=new")   # ⭐ 핵심
    chrome_options.add_argument("--no-sandbox")     # ⭐ 필수
    chrome_options.add_argument("--disable-dev-shm-usage")  # ⭐ 필수
    chrome_options.add_argument("--window-size=1920,1080")

    driver = webdriver.Chrome(options=chrome_options)

    yield driver
    driver.quit()
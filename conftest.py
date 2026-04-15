import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import chromedriver_autoinstaller

@pytest.fixture
def driver():
    chromedriver_autoinstaller.install()

    options = Options()
    options.add_argument("--headless=new")  # 필수
    options.add_argument("--no-sandbox")    # 필수
    options.add_argument("--disable-dev-shm-usage")  # 필수

    driver = webdriver.Chrome(options=options)
    yield driver
    driver.quit()
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import chromedriver_autoinstaller
import os

@pytest.fixture
def driver():
    chromedriver_autoinstaller.install()

    options = Options()

    if os.environ.get("HEADLESS") == "true":
        options.add_argument("--headless=new")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-gpu")
        options.add_argument("--remote-debugging-port=9222")  # ⭐ 중요
        options.add_argument("--window-size=1920,1080")
        options.add_argument("--single-process")  # ⭐ 추가
        options.add_argument("--disable-extensions")  # ⭐ 추가

    driver = webdriver.Chrome(options=options)
    yield driver
    driver.quit()
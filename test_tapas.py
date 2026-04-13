import pytest
from selenium import webdriver
from selenium.common import NoSuchElementException, TimeoutException
from selenium.webdriver.common.by import By
import chromedriver_autoinstaller
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


@pytest.fixture
def driver():
    chromedriver_autoinstaller.install()
    driver = webdriver.Chrome()
    yield driver
    driver.quit()


def test_tapas_login(driver):
    wait = WebDriverWait(driver, 15)

    driver.get("https://tapas.io/")

    login_button = driver.find_element(By.CSS_SELECTOR, "#__next > div > nav > div > div:nth-child(1) > div > div > div.flex.space-x-12 > a:nth-child(1)")
    login_button.click()

    email_input = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "input[type='email']")))
    email_input.send_keys("dktjero@yopmail.com")

    password_input = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "input[type='password']")))
    password_input.send_keys("tapas")

    try:
        iframe = driver.find_element(By.CSS_SELECTOR, "iframe[src*='recaptcha']")
        driver.switch_to.frame(iframe)
        driver.find_element(By.CSS_SELECTOR, "#rc-anchor-container")
        driver.save_screenshot("captcha_detected.png")
        pytest.skip("CAPTCHA 감지됨 - 테스트 스킵")
    except NoSuchElementException:
        driver.switch_to.default_content()

    submit_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']")))
    submit_button.click()

    try:
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "img.rounded-100")))
        print("✅ 로그인 성공!")
    except TimeoutException:
        assert False, "로그인 실패 - 프로필 이미지를 찾을 수 없음"

def test_tapas_login_fail(driver):
    wait = WebDriverWait(driver, 15)
    driver.get("https://tapas.io/")

    login_button = driver.find_element(By.CSS_SELECTOR, "#__next > div > nav > div > div:nth-child(1) > div > div > div.flex.space-x-12 > a:nth-child(1)")
    login_button.click()

    email_input = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "input[type='email']")))
    email_input.send_keys("dktjero@yopmail.com")

    password_input = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "input[type='password']")))
    password_input.send_keys("notpassword")

    submit_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']")))
    submit_button.click()

    error_message = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "#page-wrap > div > div > div.error-bg > div > p")))
    assert "That email or password doesn't match" in error_message.text, f"테스트 실패! 메시지: {error_message.text}"
    print("✅ 로그인 실패 메시지 정상 출력!")
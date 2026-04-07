import time
from selenium import webdriver
from selenium.common import NoSuchElementException,TimeoutException
from selenium.webdriver.common.by import By
import chromedriver_autoinstaller
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


chromedriver_autoinstaller.install()
driver = webdriver.Chrome()

driver.get("https://tapas.io/")

wait = WebDriverWait(driver, 15)

login_button = "#__next > div > nav > div > div:nth-child(1) > div > div > div.flex.space-x-12 > a:nth-child(1)"
login_button = driver.find_element(By.CSS_SELECTOR, login_button)
login_button.click()


email_input = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "input[type='email']")))
email_input.send_keys("dktjero@yopmail.com")

password_input = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "input[type='password']")))
password_input.send_keys("tapas")
time.sleep(2)

try:
    # 캡차 iframe으로 전환 시도
    iframe = driver.find_element(By.CSS_SELECTOR, "iframe[src*='recaptcha']")
    driver.switch_to.frame(iframe)

    # iframe 내 캡차 박스 탐색
    captcha_element = driver.find_element(By.CSS_SELECTOR, "#rc-anchor-container")
    print("CAPTCHA detected inside iframe. Manual intervention required.")
    driver.save_screenshot("captcha_detected_iframe.png")
    driver.quit()
    exit(1)

except NoSuchElementException:
    # 캡차 iframe 또는 캡차 자체가 없으면 원래 상태로 복귀 후 계속함
    driver.switch_to.default_content()
    print("No CAPTCHA detected, continuing login.")
except Exception as e:
    print(f"Error during CAPTCHA check: {e}")
    driver.switch_to.default_content()

try:
    submit_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']")))
    submit_button.click()
except TimeoutException:
    print("Submit button not clickable, possibly due to other reasons.")
    driver.save_screenshot("submit_button_not_clickable.png")
    driver.quit()
    exit(1)

try:
    success_indicator = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "img.rounded-100")))
    print("Login PASS")
except TimeoutException:
    print("Login FAIL")

driver.quit()

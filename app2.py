import time
from selenium import webdriver
from selenium.webdriver.common.by import By
import chromedriver_autoinstaller

chromedriver_autoinstaller.install()
driver = webdriver.Chrome()
driver.get("https://www.naver.com")
time.sleep(5)

css_selector = "#shortcutArea > ul > li:nth-child(5) > a > span.service_name"
element = driver.find_element(By.CSS_SELECTOR, css_selector)

print(element.text)

element.click()
time.sleep(5)
driver.quit()

input()
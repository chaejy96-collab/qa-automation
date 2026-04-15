import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()


driver.get("https://www.naver.com")
try:
    selector2 = "#shortcutArea > ul > li:nth-child(6) > a > span.service_name"
    WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, selector2))
    )
except:
    print("예외 발생")
print("다음 코드 실행")



# time.sleep(3)
#
# title = driver.title
# print(title, "이 타이틀이다")
#
# adress = driver.current_url
# print(adress, "가 현재주소다")
# input()

# driver.get("https://www.naver.com")
# time.sleep(2)
# driver.get("https://www.google.com")
#
# driver.back()
# time.sleep(2)
#
# driver.forward()
# time.sleep(2)
#
# driver.refresh()
# time.sleep(2)
# print("동작 끝")
# input()









css_selector = "#shortcutArea > ul > li:nth-child(5) > a > span.service_name"
element = driver.find_element(By.CSS_SELECTOR, css_selector)

print(element.text)

element.click()
time.sleep(5)
driver.quit()

input()
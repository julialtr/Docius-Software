from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from bs4 import BeautifulSoup

import time

chromeOptions = Options()
chromeOptions.add_argument("--headless")
chromeOptions.add_argument("--no-sandbox")
chromeOptions.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=chromeOptions)

url = "https://www.giassi.com.br/"

driver.get(url)
time.sleep(3)

conteudoPesquisa = "Café"

barraPesquisa = driver.find_element(By.CLASS_NAME, "vtex-input-prefix__group")
barraPesquisa.click()
time.sleep(2)

barraPesquisa = driver.find_element(By.CLASS_NAME, "vtex-styleguide-9-x-input")

barraPesquisa.send_keys(conteudoPesquisa)
barraPesquisa.send_keys(Keys.RETURN)
time.sleep(3)

cookies = driver.find_element(By.ID, "cookiescript_injected")

if cookies.is_displayed():
    driver.execute_script("arguments[0].remove();", cookies)  

while True:
    try:
        botaoVerMais = driver.find_element(By.CLASS_NAME, "vtex-search-result-3-x-buttonShowMore")
        botaoVerMais.click()
        time.sleep(2)

    except Exception as e:
        break

soup = BeautifulSoup(driver.page_source, 'html.parser')
resultados = soup.find_all('div', class_="vtex-search-result-3-x-galleryItem")

for item in resultados:
    nome = item.find('span', class_="vtex-product-summary-2-x-productBrand")
    precoInteiro = item.find_all('p', class_="giassi-apps-custom-0-x-priceUnit")
    preco = ''
    
    if precoInteiro:
        preco += precoInteiro[-1].text

    if preco == '':
        preco = "Indisponível"
    
    if nome and preco:
        print(f"{nome.text} - {preco}")

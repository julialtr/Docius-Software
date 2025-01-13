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

url = "https://www.bistek.com.br/"

driver.get(url)
time.sleep(3)

conteudoPesquisa = "Leite Condensado"

barraPesquisa = driver.find_element(By.CLASS_NAME, "bistek-custom-apps-0-x-swp-icon-search")
barraPesquisa.click()
time.sleep(2)

barraPesquisa = driver.find_element(By.CLASS_NAME, "avantivtexio-multi-items-search-1-x-searchBar--search-custom")
barraPesquisa.send_keys(conteudoPesquisa)
barraPesquisa.send_keys(Keys.RETURN)
time.sleep(3)

soup = BeautifulSoup(driver.page_source, 'html.parser')
resultados = soup.find_all('div', class_="vtex-search-result-3-x-galleryItem")

for item in resultados:
    nome = item.find('span', class_="vtex-product-summary-2-x-productBrand")
    precoInteiro = item.find_all('span', class_="vtex-product-price-1-x-currencyInteger")
    precoDecimal = item.find_all('span', class_="vtex-product-price-1-x-currencyDecimal")
    precoFracao = item.find_all('span', class_="vtex-product-price-1-x-currencyFraction")
    preco = ''
    
    if precoInteiro:
        preco += precoInteiro[-1].text
    
    if precoFracao:
        preco += precoFracao[-1].text
    
    if precoFracao:
        preco += precoFracao[-1].text
    
    if nome and preco:
        print(f"{nome.text} - {preco}")

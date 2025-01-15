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

url = "https://www.deliveryfort.com.br/"

driver.get(url)
time.sleep(3)

conteudoPesquisa = "café"

ignorarCEP = driver.find_element(By.CLASS_NAME, "modalCep-content--see-more")
ignorarCEP.click()

botao_pesquisa = driver.find_element(By.CSS_SELECTOR, ".search__submit")
driver.execute_script("arguments[0].click();", botao_pesquisa)
time.sleep(2)

barraPesquisa = driver.find_element(By.CLASS_NAME, "search__input")

barraPesquisa.send_keys(conteudoPesquisa)
barraPesquisa.send_keys(Keys.RETURN)
time.sleep(3)

while True:
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    resultados = soup.find_all('div', class_="shelf-item")

    for item in resultados:
        nome = ''
        nomeElemento = item.find('h3', class_="shelf-item__title")
        nomeElemento = nomeElemento.find('a')

        if nomeElemento:
            nome = nomeElemento.text

        preco = ''
        precoElemento = item.find('span', class_="shelf-item__best-price")
        precoElemento = precoElemento.find('strong')

        if precoElemento:
            preco = precoElemento.text

        if preco == '':
            preco = "Indisponível"

        if nome and preco:
            print(f"{nome} - {preco}")

    paginas = soup.find_all('li', class_="pagination-button")
    clicarProximaPagina = False

    for pagina in paginas[:-1]:
        if clicarProximaPagina:
            link = pagina.find('a')

            if link:
                href = link.get('href')
                elemento = driver.find_element(By.XPATH, f"//a[@href='{href}']")
                driver.execute_script("arguments[0].click();", elemento)
            break
        
        if "pagination-current" in pagina.get('class', []):
            clicarProximaPagina = True
            continue

    if clicarProximaPagina == False:
        break
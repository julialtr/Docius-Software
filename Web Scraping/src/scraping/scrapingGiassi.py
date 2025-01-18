from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from bs4 import BeautifulSoup
from constants.enums import Mercados
from constants.interfaces import Produto

import time
import re

def scraping(driver, url, conteudoPesquisa):
    try:
        produtos = []

        driver.get(url)
        time.sleep(3)

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
        itens = soup.find_all('div', class_="vtex-search-result-3-x-galleryItem")  

        for item in itens:
            nome = item.find('span', class_="vtex-product-summary-2-x-productBrand").text
            preco = item.find('p', class_="giassi-apps-custom-0-x-priceUnit")

            if preco is None:
                 continue
            
            preco = preco.text
            
            precoFormatado = re.search(r'\d+,\d+', preco)
            if precoFormatado:
                precoFormatado = precoFormatado.group()
                precoFormatado = precoFormatado.replace(',', '.')

            if nome == '' or preco == '':
                continue

            produtos.append(Produto(nome, float(precoFormatado), Mercados.GIASSI.value))

        return produtos, 200
    
    except Exception as e:
        return {"error": f"{e}"}, 400

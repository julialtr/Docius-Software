from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from bs4 import BeautifulSoup
from constants.enums import Mercados
from constants.interfaces import Produto

import time
import re

def scraping(driver, url, conteudoPesquisa):
    try:
        produtos = []
        wait = WebDriverWait(driver, 3)

        driver.get(url)

        cookies = driver.find_element(By.ID, "privacytools-banner-consent")
        driver.execute_script("arguments[0].remove();", cookies)

        cookies = WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.CLASS_NAME, "cc-btn.cc-deny")))
        cookies.click()

        ignorarCEP = driver.find_element(By.CLASS_NAME, "modalCep-content--see-more")
        ignorarCEP.click()  

        botaoPesquisa = driver.find_element(By.CSS_SELECTOR, ".search__submit")
        driver.execute_script("arguments[0].click();", botaoPesquisa)
        time.sleep(2)   

        barraPesquisa = driver.find_element(By.CLASS_NAME, "search__input") 
        barraPesquisa.send_keys(conteudoPesquisa)
        barraPesquisa.send_keys(Keys.RETURN)
        time.sleep(3)   

        while True:
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            itens = soup.find_all('div', class_="shelf-item")  

            for item in itens:
                nomeElemento = item.find('h3', class_="shelf-item__title")
                nome = nomeElemento.find('a').text  

                precoElemento = item.find('span', class_="shelf-item__best-price")
                preco = precoElemento.find('strong').text

                if nome == '' or preco == '':
                    continue

                precoFormatado = preco.strip()

                precoFormatado = re.search(r'\d+,\d+', precoFormatado)
                if precoFormatado:
                    precoFormatado = precoFormatado.group()
                    precoFormatado = precoFormatado.replace(',', '.')

                produtos.append(Produto(nome, float(precoFormatado), Mercados.FORT.value))  

            paginas = soup.find_all('li', class_="pagination-button")
            clicarProximaPagina = False 

            for pagina in paginas[:-1]:
                if clicarProximaPagina:
                    linkProximaPagina = pagina.find('a') 

                    if linkProximaPagina:
                        href = linkProximaPagina.get('href')
                        elemento = driver.find_element(By.XPATH, f"//a[@href='{href}']")
                        driver.execute_script("arguments[0].click();", elemento)

                    break
                
                if "pagination-current" in pagina.get('class', []):
                    clicarProximaPagina = True
                    continue    

            if clicarProximaPagina == False:
                break

        return produtos, 200
    
    except Exception as e:
        return { 
            "mensagem": f"{e}",
            "dados": None
        }, 400

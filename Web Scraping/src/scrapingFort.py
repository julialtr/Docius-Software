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

                produtos.append(Produto(nome, precoFormatado, Mercados.FORT.value))  

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

        return produtos
    
    except Exception as e:
        print(f"Ocorreu um erro na busca dos preços do mercado Fort: {e}")

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from bs4 import BeautifulSoup

import time
import re

def scraping(driver, url, conteudoPesquisa):
    try:
        produtos = []
        wait = WebDriverWait(driver, 3)

        driver.get(url)

        cookies = driver.find_elements(By.ID, "privacytools-banner-consent")
        if cookies and cookies[0].is_displayed():
            driver.execute_script("arguments[0].remove();", cookies[0])
            
        cookies_btn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "cc-btn.cc-deny")))
        cookies_btn.click()

        ignorarCEP = driver.find_element(By.CLASS_NAME, "modalCep-content--see-more")
        ignorarCEP.click()

        botaoPesquisa = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".search__submit")))
        driver.execute_script("arguments[0].click();", botaoPesquisa)
        time.sleep(2)   

        barraPesquisa = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "search__input")))
        barraPesquisa.send_keys(conteudoPesquisa)
        barraPesquisa.send_keys(Keys.RETURN)
        time.sleep(3)   

        while True:
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            itens = soup.find_all('div', class_="shelf-item")  

            for item in itens:
                nomeElemento = item.find('h3', class_="shelf-item__title")
                precoElemento = item.find('span', class_="shelf-item__best-price")

                if not nomeElemento or not precoElemento:
                    continue

                nomeLink = nomeElemento.find('a')
                precoValor = precoElemento.find('strong')

                if not nomeLink or not precoValor:
                    continue

                nome = nomeLink.text.strip()
                preco = precoValor.text.strip()

                if nome == '' or preco == '':
                    continue

                match_preco = re.search(r'\d+,\d+', preco)
                if not match_preco:
                    continue

                precoFormatado = match_preco.group().replace(',', '.')

                try:
                    produtos.append(Produto(nome, float(precoFormatado), Mercados.FORT.value))
                except Exception as e:
                    continue

            paginas = soup.find_all('li', class_="pagination-button")
            clicarProximaPagina = False
            proximaHref = None

            for pagina in paginas[:-1]:
                if clicarProximaPagina:
                    link = pagina.find('a')
                    if link and link.get('href'):
                        proximaHref = link.get('href')
                    break

                if "pagination-current" in pagina.get('class', []):
                    clicarProximaPagina = True

            if not proximaHref:
                break

            try:
                proximoElemento = driver.find_element(By.XPATH, f"//a[@href='{proximaHref}']")
                driver.execute_script("arguments[0].click();", proximoElemento)
                time.sleep(2)
            except Exception as e:
                break

        return produtos, 200
    
    except Exception as e:
        return {
            "mensagem": str(e),
            "dados": None
        }, 400

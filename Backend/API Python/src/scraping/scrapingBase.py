from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

from constants.enums import Mercados
import constants.links

from . import scrapingFort
from . import scrapingGiassi

def scraping(ids_mercados, texto_pesquisa):
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    service = Service('/usr/bin/chromedriver')
    driver = webdriver.Chrome(service=service, options=options)

    produtos = []

    for idMercado in ids_mercados:
        if idMercado == Mercados.FORT.value:
            url = constants.links.LINK_FORT
            novosProdutos, httpResult = scrapingFort.scraping(driver, url, texto_pesquisa)

            if httpResult == 400:
                driver.quit()
                return novosProdutos, httpResult

            produtos.extend(novosProdutos)
        elif idMercado == Mercados.GIASSI.value:
            url = constants.links.LINK_GIASSI
            novosProdutos, httpResult = scrapingGiassi.scraping(driver, url, texto_pesquisa)

            if httpResult == 400:
                driver.quit()
                return novosProdutos, httpResult

            produtos.extend(novosProdutos)

    produtos = [
        {"nome": produto[0], "preco": produto[1], "id_mercado": produto[2]}
        for produto in produtos
    ]

    driver.quit()
    return produtos, 200

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from constants.enums import Mercados
import constants.links

from . import scrapingFort
from . import scrapingGiassi
import json

def scraping(ids_mercados, texto_pesquisa):
    chromeOptions = Options()
    chromeOptions.add_argument("--headless")
    chromeOptions.add_argument("--no-sandbox")
    chromeOptions.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=chromeOptions)

    produtos = []

    for idMercado in ids_mercados:
        if idMercado == Mercados.FORT.value:
            url = constants.links.LINK_FORT
            novosProdutos, httpResult = scrapingFort.scraping(driver, url, texto_pesquisa)

            if httpResult == 400:
                return novosProdutos, httpResult

            produtos.extend(novosProdutos)
        elif idMercado == Mercados.GIASSI.value:
            url = constants.links.LINK_GIASSI
            novosProdutos, httpResult = scrapingGiassi.scraping(driver, url, texto_pesquisa)

            if httpResult == 400:
                return novosProdutos, httpResult

            produtos.extend(novosProdutos)

    produtos = [
        {"nome": produto[0], "preco": produto[1], "id_mercado": produto[2]}
        for produto in produtos
    ]

    return produtos, 200

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from constants.enums import Mercados
import constants.links

import scrapingFort
import scrapingGiassi

chromeOptions = Options()
chromeOptions.add_argument("--headless")
chromeOptions.add_argument("--no-sandbox")
chromeOptions.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=chromeOptions)

mercados = [1, 2]
conteudoPesquisa = "Café"

produtos = []

for mercado in mercados:
    if mercado == Mercados.FORT.value:
        url = constants.links.LINK_FORT
        produtos.extend(scrapingFort.scraping(driver, url, conteudoPesquisa))
    elif mercado == Mercados.GIASSI.value:
        url = constants.links.LINK_GIASSI
        produtos.extend(scrapingGiassi.scraping(driver, url, conteudoPesquisa))

for produto in produtos:
    print(f"{produto.nome} - {produto.preco} - {produto.idMercado}")

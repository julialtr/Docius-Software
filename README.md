Docius é um software desenvolvido para um TCC de Ciências da Computação. A ideia dele é ser um software voltado para a gestão integrada de confeitarias por encomendas.

# Tecnologias:

## Web Scraping
O Web Scraping é uma técnica utilizada para coletar dados de sites, transformando-os em dados estruturados para uso. Nesse caso, sua utilidade é coletar preços de sites de acordo com um texto de pesquisa de entrada, trazendo uma cotação de preços para o software.
- Bibliotecas: Selenium e BeautifulSoup
- Linguagem: Python

## Docker
O Docker é utilizado para criar contêiners específicos da aplicação, fazendo-os rodar em um ambiente isolado e exclusivo. Ele simula um ambiente de desenvolvimento virtualizado, adaptado com as dependências necessárias para o funcionamento do projeto.
- Docker para API em Python
- Docker para Banco de Dados

# Arquitetura:
## API
-  Objetivo: Fornecer os dados adquiridos pelo Web Scraping
-  Biblioteca: Flask
-  Linguagem: Python

## API
- Objetivo: Fazer a conexão e realizar operações sobre o banco de dados
- Biblioteca: ASP .Net Core e Entity Framework
- Linguagem: C#

## Banco de Dados
- Objetivo: Armanezar os dados do software fornecendo um banco de dados base com as empresas e um banco de dados exclusivo para os dados de cada empresa
- Tipo: Relacional
- SGBD: PostgresSQL

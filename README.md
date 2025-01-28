Docius é um software desenvolvido para um TCC de Ciências da Computação. A ideia dele é ser um software voltado para a gestão integrada de confeitarias por encomendas, utilizando tecnologias inovadoras.

# Tecnologias:

## Web Scraping
O Web Scraping é uma técnica utilizada para coletar dados de sites, transformando-os em dados estruturados para uso. Nesse caso, sua utilidade é coletar preços de sites de acordo com um texto de pesquisa de entrada, trazendo uma cotação de preços para o software.
- Bibliotecas: Selenium e BeautifulSoup
- Linguagem: Python

## Docker
O Docker é utilizado para criar contêiners específicos da aplicação, fazendo-os rodar em um ambiente isolado e exclusivo. Ele simula um ambiente de desenvolvimento virtualizado, adaptado com as dependências necessárias para o funcionamento do projeto.
- Docker para API em Python
- Docker para Banco de Dados

## Entity Framework
O Entity Framework é utilizado para fazer a conexão entre a API e o banco de dados de maneira mais eficiente. Com ele, foram criadas as tabelas do banco de dados, que são migradas para o banco de dados. Essa ferramenta garante praticidade na criação e no versionamento das tabelas após alterações. 

# Arquitetura:
## API
-  Objetivo: Fornecer os dados adquiridos pelo Web Scraping
-  Biblioteca: Flask
-  Linguagem: Python

## API
- Objetivo: Fazer a conexão e realizar operações sobre o banco de dados
- Biblioteca: ASP .Net Core
- Linguagem: C#

## Banco de Dados
- Objetivo: Armanezar os dados do software fornecendo um banco de dados base com as empresas e um banco de dados exclusivo para os dados de cada empresa
- Tipo: Relacional
- SGBD: PostgresSQL

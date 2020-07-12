# Crawler

Crawler criado com o objetivo de pesquisa de itens no Mercado Livre, retornando uma lista de resultados no formato JSON;

## Tecnologias

- Nodejs v12.18.2
- NPM v6.14.5
- Axios
- Express
- Cheerio

## Pré-Requisitos

Necessário para execução do projeto:
- Nodejs 
- NPM
- executar npm install


## Instalação / Execução

Executar os comandos:

- npm install (instalar dependedências / criação pasta node_modules)
- npm run dev (executar aplicação)
- Acessar http://localhost:3000

## Exemplo chamada

URL: http://localhost:3000/crawler

{
	"search":"celular",
	"limit":15
}
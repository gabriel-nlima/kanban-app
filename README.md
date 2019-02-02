# Quadro Kanban app

Quadro Kanban simples com React e Redux, API usando o framework Fastify e banco de dados MongoDB.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requisitos

- [NodeJS](https://nodejs.org)
- MongoDB

## Feito com 

### Front-end

- ReactJS
- Redux
- React Router
- Bootstrap
- Axios

### Back-end API

- Fastify
- fastify-mongodb
- fastify-swagger
- mongodb

## Uso

Na raiz do projeto e em server/fastify, rodar o seguinte comando:
```bash
 npm i
```
Para iniciar o front-end:
```bash
 npm start
```
E para iniciar a API:
```bash
 nodemon index
```
Para rodar os testes, na raiz do projeto:
```bash
npm test
```

O quadro abrirá em localhost:3000, adicione uma tarefa e uma collection será criada no MongoDB automaticamente.

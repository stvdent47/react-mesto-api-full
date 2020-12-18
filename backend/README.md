# Проект Mesto фронтенд + бэкенд

## Директории

`/public` — статика, полученная в результате билда фронтенд-приложения на Реакте  
`/data` — JSON-файлы для временной эмуляции работы с базой данных  
`/routes` — папка с файлами роутера  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## npm scripts:
### frontend
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
### backend
`npm run start` — starts node.js server
`npm run dev` — starts node.js server with nodemon


### .env on backend must contain:
`NODE_ENV`

`SECRET_KEY` — for jwt token
`MONGO_URL` — for launching mongo

`CORS_ORIGIN` — for accepting fetches from specific domains

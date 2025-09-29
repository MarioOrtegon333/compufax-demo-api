# compufax-demo-api

API Node.js con Express y Sequelize para clientes, direcciones y ordenes.

## Instalación

```
npm install
```

## Ejecución

```
npm start
```

La API estará disponible en http://localhost:3000

## Endpoints principales

- `/clientes` CRUD de clientes
- `/direcciones` CRUD de direcciones
- `/ordenes` CRUD de ordenes

Configura la conexión a MySQL en `src/models/index.js` según tus credenciales.

## Estructura basada en eventos-api
Incluye middlewares, helpers y organización modular.

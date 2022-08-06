<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Pokedex
## Development

1. Clone the repo
2. Run
   ```
    yarn install
   ```
3. Install @nestjs/cli
   ```
    npm i -g @nestjs/cli
   ```
4. Run the database
   ```
    docker-compose up -d
   ```
5. Clonar el archivo ```.env.example``` y renombrar la copia a ```.env```
6. Llenar las variables de entorno definidas en el ```.env```
7. Ejecutar la aplicación en dev:
   ```
   yarn start:dev
   ```
8. Seed the local database
   ```
    GET http://localhost:3000/api/v2/seed
   ```

### Tech Stack
1. Nestjs
2. Typescript
3. Mongo
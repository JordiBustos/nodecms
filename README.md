# NodeCMS

NodeCMS es un CMS creado con React.js, Express.js, Node.js y Postgresql que le permite al usuario crear dinámicamente tablas en la base de datos.

Es decir, el usuario puede crear una tabla Noticias y luego crear instancias de esas noticias, con los campos custom que desee, con los tipos de datos que aporta postgresql.

# Instalación

## Git clone

- git clone https://github.com/JordiBustos/nodecms.git
- cd nodecms

## Variables de entorno

- touch .env

Se requiere previamente una base de datos POSTGRESQL

Completar las siguientes variables de entorno para realizar la conexión a la db.
DATABASE_URL,
DATABASE_PORT,
DATABASE_HOST,
DATABASE_USER,
DATABASE_PASSWORD

## Post clone

- mkdir src/config
- npm install
- cd frontend
- npm install

## Ejecutar

- npm start
- cd frontend
- npm run dev

## Endpoint

- **Método:** GET
- **URL:** `api/entities`

Retorna todas las entidades creadas en la base de datos.

- **Método:** POST
- **URL:** `api/entities`

Crea una nueva entidad en la base de datos.

#### Argumentos

| Nombre       | Tipo    | Descripción                                         |
| ------------ | ------- | --------------------------------------------------- |
| name         | string  | Nombre de la tabla a crear                          |
| fields_types | arr[str]| Array con los tipos de datos de los fields          |
| fields_names | arr[str]| Array con los nombres de los fields                 |
| desc         | str     | Descripcion opcional


GET    /api/entities/{name} retorna la entidad llamada name
DELETE /api/entities/{name} elimina la entidad llamada name
UPDATE /api/entities/{name} actualiza la entidad con los valores pasados en el body

GET    /api/instances/{tableName} retorna todas los contenidos de la entidad
POST   /api/instances/{tableName} agrega un contenido a la entidad

GET    /api/instances/{tableName}/{name} retorna un contenido de la tabla de la entidad
UPDATE /api/instances/{tableName}/{name} actualiza un elemento de la tabla de la entidad
DELETE /api/instances/{tableName}/{name} elimina un elemento de la tabla de la entidad

## TODO
- frontend para interactuar a través de formularios
- taxonomías como drupal

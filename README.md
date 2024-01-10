# NodeCMS

NodeCMS es un CMS creado con Express.js, Node.js y Postgresql que le permite al usuario crear dinámicamente tablas en la base de datos.

Es decir, el usuario puede crear una tabla Noticias y luego crear instancias de esas noticias, con los campos custom que desee, con los tipos de datos que aporta postgresql.

## Endpoint

GET    /api/entities retorna todas las entidades creadas.
POST   /api/entities crea una nueva entidad en la base de datos.

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

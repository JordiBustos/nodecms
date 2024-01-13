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

## TODO

- frontend para interactuar a través de formularios
- taxonomías como drupal
- update entities modifications in src/config

## Endpoint

- **Método:** GET
- **URL:** `api/entities`

Retorna todas las entidades creadas en la base de datos.

---

- **Método:** POST
- **URL:** `api/entities`

Crea una nueva entidad en la base de datos.

#### Argumentos

| Nombre       | Tipo     | Descripción                                |
| ------------ | -------- | ------------------------------------------ |
| name         | string   | Nombre de la tabla a crear                 |
| fields_types | arr[str] | Array con los tipos de datos de los fields |
| fields_names | arr[str] | Array con los nombres de los fields        |
| desc         | str      | Descripcion opcional                       |

---

- **Método:** GET
- **URL:** `api/entities/{name}`

Retorna la entidad llamada name y un diccionario con la key "msg" y "value" con la informacion de la misma.

---

- **Método:** DELETE
- **URL:** `api/entities/{name}`

Elimina la entidad llamada name de la base de datos.

---

- **Método:** PUT
- **URL:** `api/entities/{name}`

Actualiza la entidad name con los valores pasados en el body.

---

- **Método:** GET
- **URL:** `api/instances/{tableName}`

Retorna todas los instancias de la entidad tableName.

---

- **Método:** POST
- **URL:** `api/instances/{tableName}`

Agrega un contenido a la entidad, se deben enviar los campos especificados a la hora de crear la entidad.

---

- **Método:** GET
- **URL:** `api/instances/{tableName}/{name}`

Retorna la instancia name dentro de la tabla de la entidad tableName correspondiente.

---

- **Método:** PUT
- **URL:** `api/instances/{tableName}/{name}`

Actualiza la instancia name de la tabla de la entidad tableName con los datos del body.

---

- **Método:** DELETE
- **URL:** `api/instances/{tableName}/{name}`

Elimina la instancia name de la tabla de la entidad tableName.

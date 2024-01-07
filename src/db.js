const { Sequelize } = require("sequelize");

const db = new Sequelize({
  database: "postgres",
  host: "localhost",
  port: "5432",
  username: "postgres",
  password: "1234",
  dialect: "postgres",
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = db;

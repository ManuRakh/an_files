const { Sequelize, DataTypes } = require('sequelize');

const dotenv = require("dotenv");
dotenv.config();

// const sequelize = new Sequelize({
//   username: process.env.username,
//   password: process.env.password,
//   database: process.env.database,
//   config: {
//     host: process.env.host,
//     dialect: "mysql"
//   }
// });
const sequelize = new Sequelize(process.env.database, process.env.db_username, process.env.password, {
  host: process.env.host,
  dialect: "mysql"
});


sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully.",
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = {
  sequelize
};

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { dialect: "postgres" }
);

//checking if connection is done
sequelize.authenticate().then(() => {
  console.log(`Database connected to discover`)
}).catch((err) => {
  console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
db.users = require('./Model/userModel').default (sequelize, DataTypes)

//exporting the module
module.exports = db

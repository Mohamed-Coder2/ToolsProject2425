const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { dialect: 'postgres' }
);

sequelize.authenticate().then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  console.log(err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require('./Model/userModel').default (sequelize, DataTypes);
db.orders = require('./Model/orderModel')(sequelize, DataTypes);

// Define associations
db.users.hasMany(db.orders, { foreignKey: 'userId', sourceKey: 'uid', onDelete: 'CASCADE' });
db.orders.belongsTo(db.users, { foreignKey: 'userId', targetKey: 'uid' });

// Export the db object
module.exports = db;

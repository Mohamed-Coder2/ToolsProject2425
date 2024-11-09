// Model/orderModel.js
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    package_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipping_method: {
      type: DataTypes.STRING,
    },
    sender_address: {
      type: DataTypes.STRING,
    },
    tracking_number: {
      type: DataTypes.STRING,
    },
    package_weight: {
      type: DataTypes.FLOAT,
    },
    description_of_contents: {
      type: DataTypes.STRING,
    },
    delivery_time: {
      type: DataTypes.STRING,
    },
    receiver_name: {
      type: DataTypes.STRING,
    },
    shipping_date: {
      type: DataTypes.DATE,
    },
    receiver_address: {
      type: DataTypes.STRING,
    },
    routing_number: {
      type: DataTypes.STRING,
    },
    package_dimensions: {
      type: DataTypes.STRING,
    },
    declared_value: {
      type: DataTypes.FLOAT,
    },
    additional_notes: {
      type: DataTypes.TEXT,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false, // Foreign key for the user
    },
  });

  // Establish relationship
  Order.belongsTo(sequelize.models.User, { foreignKey: 'uid' });

  return Order;
};

// orderController.js
const db = require('../db');
const Order = require('../Model/orderModel'); 

// Function to create an order
const createOrder = async (req, res) => {
    const { uid } = 1;
    const orderData = { ...req.body, uid };

    try {
        const newOrder = await Order.create(orderData);
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Function to get orders by user
const getOrdersByUser = async (req, res) => {
    const { uid } = req.user;

    try {
        const orders = await Order.findAll({ where: { uid } });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error: error.message });
    }
};

// Export the functions correctly
module.exports = { createOrder, getOrdersByUser };

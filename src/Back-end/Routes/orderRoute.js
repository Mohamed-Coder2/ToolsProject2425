const express = require('express');
const { createOrder, getOrdersByUser } = require('../Controllers/orderController'); // Import as an object

const router = express.Router();

// Define the routes
router.post('/create', createOrder);
router.get('/user', getOrdersByUser);

module.exports = router;

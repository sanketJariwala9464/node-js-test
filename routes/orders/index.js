const express = require('express');
const router = express.Router();

const { OrderController } = require('../../controller');
const { OrderValidation } = require('../../requests');

router.post('/', OrderValidation.createOrder, OrderController.createOrder);

router.put('/', OrderValidation.updateOrder, OrderController.updateOrder);

router.delete('/', OrderValidation.deleteOrder, OrderController.deleteOrder);

router.get('/', OrderController.getOrders);

router.get('/:id', OrderController.getSingleOrder);

module.exports = router;
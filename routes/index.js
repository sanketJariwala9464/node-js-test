const express = require("express");
const router = express.Router();

const orders = require("./orders");

router.use("/order-service", orders);

module.exports = router;
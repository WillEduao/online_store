const express = require('express');
const router = express.Router();

const { getAllProducts } = require('../controller/business/api_controller');
router.get('/products', getAllProducts);

module.exports = router;

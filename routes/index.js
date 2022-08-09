const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product_controller');

router.get('/products', productsController.allProducts);
router.use('/products', require('./product'));

module.exports = router;
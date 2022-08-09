
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product_controller');

// route to create product 
router.post('/create', productsController.create);

// route to delete product 
router.delete('/:id', productsController.delete);

// route to update product by increase in quantity
router.post('/:id/update_quantity', productsController.updateProduct);

module.exports = router;
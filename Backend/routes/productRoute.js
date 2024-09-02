const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth');
const { createProduct, updateProductById,deleteProductById,getAllProducts } = require('../controllers/ProductControllers');


router.post('/addproduct',authorize.auth,authorize.admin,createProduct);
router.put('/update/:id',updateProductById);
router.delete('/delete/:id',deleteProductById);
router.get('/getProducts',getAllProducts);



module.exports = router;
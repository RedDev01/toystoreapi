const express = require('express');
const router = express.Router();

router.use(express.json());

const productCtrl = require('../controller/productController');


router.route('/products')
    .get(productCtrl.displayProducts)
    .post(productCtrl.createProducts)
    .patch(productCtrl.updateProducts)
    .delete(productCtrl.deleteProducts)

module.exports = router;
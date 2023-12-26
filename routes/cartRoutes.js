const express = require('express');
const router = express.Router();

router.use(express.json());

const cartCtrl = require('../controller/cartController');


router.route('/cart')
    .get(cartCtrl.displayCart)
    .post(cartCtrl.createCart)
    .patch(cartCtrl.updateCart)
    .delete(cartCtrl.deleteItemOnCart)

module.exports = router;
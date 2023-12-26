const express = require('express');
const router = express.Router();


router.use(express.json())

const customerOrderCtrl = require('../controller/customerOrderController');

router.route('/customerorder')
    .get(customerOrderCtrl.displayOrder)
    .post(customerOrderCtrl.placeOrder)
    .delete(customerOrderCtrl.deleteOrder)


module.exports = router;
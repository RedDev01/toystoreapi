const express = require('express');
const router = express.Router();

router.use(express.json());

const usersCtrl = require('../controller/usersController');


router.route('/users')
    .get(usersCtrl.displayUsers)
    .post(usersCtrl.createNewUsers) 

router.route('/userlogin')
    .post(usersCtrl.loginUser)

module.exports = router;
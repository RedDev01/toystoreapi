const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

router.use(express.json());

const usersAuthCtrl = require('../controller/userAuthController');


router.route('/authusers')
   .get(usersAuthCtrl.getUserInfo)
        
module.exports = router;
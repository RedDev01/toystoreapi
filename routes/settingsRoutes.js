const express = require('express');
const router = express.Router();

router.use(express.json());

const settingsCtrl = require('../controller/settingsController');


router.route('/settings')
    .get(settingsCtrl.displaySettings)
    .post(settingsCtrl.createSettings)
    .patch(settingsCtrl.updateSettings)
    .delete(settingsCtrl.deleteSettings)

module.exports = router;
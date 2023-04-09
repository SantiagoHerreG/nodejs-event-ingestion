var router = require('express').Router();
const controller = require('../controllers/analytics');

router.post('/', controller.postAnalytics);

router.get('/', controller.getAnalytics);

module.exports = router;
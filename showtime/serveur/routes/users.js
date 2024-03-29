var express = require('express');
var router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');


// import controller for index
const userController = require('../controllers/user.controller');

router.get('/', userController.home );
router.get('/me', authMiddleware.validToken, userController.me );



module.exports = router;

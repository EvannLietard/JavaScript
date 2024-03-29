const express = require('express');
const router = express.Router();

const jsonController = require('../controllers/json.controller');

// general middlewares
//router.use( jsonController.random );
router.use( jsonController.toDate);

// link controllers to route paths
router.get('/', jsonController.parameters );
router.get('/random', jsonController.parametersRandom);

module.exports = router;


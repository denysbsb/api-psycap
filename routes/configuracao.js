var express = require('express');
var router = express.Router();
var controller = require('../controllers/ConfiguracaoController');

router.get('/', controller.find);

module.exports = router;
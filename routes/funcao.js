var express = require('express');
var router = express.Router();

var controller = require('../controllers/FuncaoController');

router.get('/', controller.getAll);

module.exports = router;
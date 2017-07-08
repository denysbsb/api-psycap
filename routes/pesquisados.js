var express = require('express');
var router = express.Router();

var PesquisadosController = require('../controllers/PesquisadosController');

router.get('/:_id', PesquisadosController.getById);
router.post('/', PesquisadosController.create);
router.delete('/', PesquisadosController.remove);

module.exports = router;



var express = require('express');
var router = express.Router();

var RegrasContrapartidaController = require('../controllers/RegrasContrapartidaController');

router.get('/list/:_ID_PROGRAMA', RegrasContrapartidaController.listRules);

module.exports = router;



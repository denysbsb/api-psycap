var express = require('express');
var router = express.Router();

var UsuarioController = require('../controllers/UsuarioController');

router.get('/login', UsuarioController.login);
router.get('/usuario/todos', UsuarioController.getAll);
router.post('/cadastro', UsuarioController.create);
router.post('/recuperarsenha', UsuarioController.recuperarsenha);
router.delete('/', UsuarioController.remove);

module.exports = router;



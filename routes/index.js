var express = require('express');
var router = express.Router();

router.get('/',function(req, res){
  res.status(201);
  res.send("WS SICONV - V1.0");
});

router.use('/programas', require('./programas'));
router.use('/favoritos', require('./favoritos'));
router.use('/localidade', require('./localidade'));
router.use('/funcao', require('./funcao'));
router.use('/oportunidades', require('./oportunidades'));
router.use('/pesquisados', require('./pesquisados'));
router.use('/usuario', require('./usuario'));
router.use('/regras', require('./regrasContrapartida'));
router.use('/configuracao', require('./configuracao'));
router.use('/proposta', require('./proposta'));


module.exports = router;
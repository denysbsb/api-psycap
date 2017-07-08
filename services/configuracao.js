var models  = require('../models');
var sequelize = require('../db/sequelize');

function configuracaoService() {}

configuracaoService.prototype.list = function(id) {
    return models.configuracao.findAll();
};

module.exports = new configuracaoService();
var models  = require('../models');
var sequelize = require('../db/sequelize');

function regrasContrapartidaService() {}

regrasContrapartidaService.prototype.list = function(id) {
    return models.regras_contrapartida.findAll({
        where: {
            ID_PROGRAMA: id
        }
    });
};

module.exports = new regrasContrapartidaService();
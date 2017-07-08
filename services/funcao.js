var models  = require('../models');

function funcaoService() {}

funcaoService.prototype.create = function(data) {
    return models.funcao.create({
        username: data.username
    });
};

funcaoService.prototype.remove = function(id) {
    return models.funcao.destroy({
        where: {
            id: id
        }
    });
};

funcaoService.prototype.findAll = function() {
    return models.funcao.findAll();
};

funcaoService.prototype.find = function(id) {
    return models.funcao().find({
        where: { id: id }
    });
};

module.exports = new funcaoService();
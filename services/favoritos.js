var models  = require('../models');


function favoritosService() {}

favoritosService.prototype.create = function(data) {
    return models.Programas.create({
        username: data.username
    });
};

favoritosService.prototype.remove = function(id) {
    return models.Programas.destroy({
        where: {
            id: id
        }
    });
};

favoritosService.prototype.findAll = function() {
    return models.Programas().findAll({});
};

favoritosService.prototype.find = function(id) {
    
 
};

module.exports = new favoritosService();
var service  = require('../services/localidade');

function LocalidadeController() {}

LocalidadeController.prototype.getAllMunicipio = function(request, response, next) {
    service.municipioFindAll().then(function(data) {
        response.status(200).json(data);
    }).cath(function(error) {
        response.status(500).json({ success: false, data: error });
    });
};

LocalidadeController.prototype.getMunicipio = function(request, response, next) {
    var id = (request.params._id);

    service.municipioFindForId(id).then(function(data) {
        response.status(200).json(data);
    }).cath(function(error) {
        response.status(500).json({ success: false, data: error });
    });
};

LocalidadeController.prototype.getAllEstados = function(request, response, next) {
    service.estadoFindAll().then(function(data) {
        response.status(200).json(data);
    }).cath(function(error) {
        response.status(500).json({ success: false, data: error });
    });
};

LocalidadeController.prototype.getMunicipioPorEstado = function(request, response, next) {
   var uf = (request.params._uf);
    service.municipioFind(uf).then(function(data) {
        response.status(200).json(data);
    }).cath(function(error) {
        response.status(500).json({ success: false, data: error });
    });
};


module.exports = new LocalidadeController();
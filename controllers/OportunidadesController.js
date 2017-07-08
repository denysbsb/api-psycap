var service  = require('../services/oportunidades');

function OportunidadesController() {}

OportunidadesController.prototype.getById = function(request, response, next) {
  var params = request.params;

    service.find(params).then(function(programas) {
        response.status(200).json(programas);
    }).cath(function(error) {
        response.status(500).json({ success: false, data: error });
    });
};

OportunidadesController.prototype.getByIdList = function(request, response, next) {
    var params = request.params;

  service.findByIdList(params).then(function(programas) {
    response.status(200).json(programas);
  }).cath(function(error) {
      response.status(500).json({ success: false, data: error });
  });
};

module.exports = new OportunidadesController();
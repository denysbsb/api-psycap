var express = require('express');
var service  = require('../services/programas');

function ProgramasController() {}

ProgramasController.prototype.getAll = function(request, response, next) {
  var params = request.params;

  service.findAll(params).then(function(data) {
      response.status(200).json(data);
  }).cath(function(error) {
      response.status(500).json({ success: false, data: error });
  });
};

ProgramasController.prototype.getMultiple = function(request, response, next) {
  var params = request.query;


  service.findMultiple(params).then(function(data){
    response.status(200).json(data[0]);
  }).cath(function(error) {
      response.status(500).json({ success: false, data: error });
  });

};

ProgramasController.prototype.getProgramasPorEstado = function(request, response, next) {
    var params = request.params;

    service.findProgramasPorEstado(params).then(function(data) {
        response.status(200).json(data);
    }).cath(function(error) {
        response.status(500).json({ success: false, data: error });
    });
};

ProgramasController.prototype.getQntProgramasPorEstado = function(request, response, next) {
    var params = request.params;

    service.qntProgramasPorEstado(params).then(function(data) {
        response.status(200).json(data);
    }).cath(function(error) {
        response.status(500).json({ success: false, data: error });
    });
};

ProgramasController.prototype.getProgramas = function(request, response, next) {
    var params = request.params;

    service.findProgramas(params).then(function(data) {
        response.status(200).json(data);
    }).cath(function(error) {
        response.status(500).json({ success: false, data: error });
    });
};

ProgramasController.prototype.getById = function(request, response, next) {
    var id = request.params._id;

    service.find(id).then(function(data) {
        response.status(200).json(data);
    }).cath(function(error) {
        response.status(500).json({ success: false, data: error });
    });
};

module.exports = new ProgramasController();
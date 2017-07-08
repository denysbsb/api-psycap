var express = require('express');
var service  = require('../services/proposta');
var abstract = require('./AbstractController');

function PropostaController() {}

PropostaController.prototype.getProposta = function(request, response, next) {
  var params = request.params;

  service.findAll(params).then(function(data) {
      response.status(200).json(abstract.sendData(true,data));
  }).cath(function(error) {
      response.status(500).json(abstract.sendData(false, error));
  });
};

PropostaController.prototype.getListProposta = function(request, response, next) {
    var params = request.params;

    service.listPropostas(params).then(function(data) {
        response.status(200).json(abstract.sendData(true, data));
    }).cath(function(error) {
        response.status(500).json(abstract.sendData(false, error));
    });
};

module.exports = new PropostaController();
var express = require('express');
var service  = require('../services/programas');

function FuncaoController() {}

FuncaoController.prototype.getAll = function(request, response, next) {
  service.findAll().then(function(data) {
      response.status(200).json(data);
  }).cath(function(error) {
      response.status(500).json({ success: false, data: error });
  });
};


module.exports = new FuncaoController();
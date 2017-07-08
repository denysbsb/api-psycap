var express = require('express');
var service  = require('../services/favoritos');
var path      = require("path");
var env       = process.env.NODE_ENV || "production";
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var restparse = require('@denysfontenele/restparse');
 
var restparse = new restparse(config.parse);

function PesquisadosController() {}

PesquisadosController.prototype.getById = function(request, response, next) {
  var _id = Number(request.params._id);

  var params = {
    where: { idUser: _id },
    order: '-idUser'
  };

  restparse.getObjects('Pesquisados', params, function(err, res, body, success) {
    response.status(200).json({ success: true, data: body });
  }).cath(function(error) {
      response.status(500).json({ success: false, data: error });
  });
};

PesquisadosController.prototype.create = function(request, response, next) {
  /*
    idUsuario: 126
    municipios: {"municipios":[ 99,98,100 ] }
    pesquisados: {"pesquisados":[ 99,98,100 ] }
  */
  var _idUser = Number(request.body.idUser);
  var _municipios = request.body.municipios;
  var _pesquisados = request.body.pesquisados;

  var municipios = JSON.parse(_municipios);
  var pesquisados = JSON.parse(_pesquisados);

  var pesquisado = [
    {
      idUser: _idUser,
      municipios: municipios.municipios,
      pesquisados: pesquisados.pesquisados
    }
  ];

  var className = 'Pesquisados';

  restparse.createObjects(className, pesquisado, function(err, res, body, success) {
    response.status(200).json({ success: true, data: body });
  }).cath(function(error) {
      response.status(500).json({ success: false, data: error });
  });

};

PesquisadosController.prototype.remove = function(request, response, next) {
  var _idUser = Number(request.body.idUser);

  var className = 'Pesquisados';

  var params = {
    where: {
      idUser: _idUser
    },
    order: '-name'
  };

  restparse.getObjects(className, params, function(err, res, body, success) {
    restparse.deleteObject(className, body[0].objectId, function(err, res, body, success) {
      if (success)
        response.status(200).json({ success: true, data: 'deleted' });
      else
        response.status(500).json({ success: false, data: 'not deleted' });
    }).cath(function(error) {
        response.status(500).json({ success: false, data: error });
    });
  });

};

module.exports = new PesquisadosController();
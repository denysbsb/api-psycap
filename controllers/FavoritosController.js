var express = require('express');
var service  = require('../services/favoritos');
var path      = require("path");
var env       = process.env.NODE_ENV || "production";
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var restparse = require('@denysfontenele/restparse');

 
var restparse = new restparse(config.parse);

function FavoritosController() {}

FavoritosController.prototype.getById = function(request, response, next) {
  var _id = Number(request.params._id);

  var params = {
    where: { idUser: _id },
    order: '-idUser'
  };

  restparse.getObjects('Favoritos', params, function(err, res, body, success) {
    if(body.length === 0){
      response.status(204).json({ success: false });
    }else{
      response.status(200).json({ success: true, data: body });
    }
  }).cath(function(error) {
      response.status(500).json({ success: false, data: error });
  });
};

FavoritosController.prototype.create = function(request, response, next) {
  var _idUser = Number(request.body.idUser);
  var _idPrograma = Number(request.body.idPrograma);
  var _municipio = request.body.municipio;
  var _uf = request.body.uf;
  var _tipo = request.body.tipo;


  var favorito = [
    {
        idUser: _idUser,
        idPrograma: _idPrograma,
        municipio: _municipio,
        uf: _uf,
        tipo: _tipo
    }
  ];

  console.log('CRIANDO FAVORITO==',favorito);

  var className = 'Favoritos';

  restparse.createObjects(className, favorito, function(err, res, body, success) {
    if(body.length <= 0){
      response.status(500).json({ success: false });
    }else{
      response.status(200).json({ success: true, data: body });
    }
  }).cath(function(error) {
      response.status(500).json({ success: false, data: error });
  });

};

FavoritosController.prototype.remove = function(request, response, next) {
  var _idUser = Number(request.body.idUser);
  var _idPrograma = Number(request.body.idPrograma);
  var _codibge = Number(request.body.COD_IBGE_MUNICIPIO);
  var _ufprograma = request.body.UF_PROGRAMA;

  var className = 'Favoritos';

  var params = {
    where: { idUser: _idUser, idPrograma:_idPrograma, COD_IBGE_MUNICIPIO: _codibge, UF_PROGRAMA: _ufprograma },
    order: '-name'
  };

console.log('param==',params);
  restparse.getObjects(className, params, function(err, res, body, success) {
    console.log('body==',body);
    restparse.deleteObject(className, body[0].objectId, function(err, res, body, success) {
      if (success)
        response.status(200).json({ success: true, data: 'deleted' });
      else
        response.status(500).json({ success: false, data: 'not deleted' });
    });
  });

};

module.exports = new FavoritosController();
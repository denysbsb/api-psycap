var express = require('express');
var service  = require('../services/favoritos');
var path      = require("path");
var env       = process.env.NODE_ENV || "production";
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var restparse = require('@denysfontenele/restparse');
 
var restparse = new restparse(config.parse);

function UsuarioController() {}

UsuarioController.prototype.login = function(request, response, next) {
  var _username = request.query.username;
  var _password = request.query.password;

  restparse.loginUser(_username, _password, function(err, res, body, success) {
    if(body.error){
      response.status(500).json({ success: false, data: 'not exist' });
    }else {
      response.status(200).json({ success: true, data: body });
    }
  });
};

UsuarioController.prototype.create = function(request, response, next) {
  var _username = request.body.username;
  var _password = request.body.password;
  var _name = request.body.nome;
  var _email = request.body.email;
  var _cpf = request.body.cpf;
  var _rg = request.body.rg;
  var _idUf = request.body.idUf;
  var _uf = request.body.uf;
  var _idMunicipio = request.body.idMunicipio;
  var _municipio = request.body.municipio;
  var _idMunicipio = request.body.idMunicipio;
  var _idUf = request.body.idUf;
  var _uf = request.body.uf;
  var _endereco = request.body.endereco;
  var _nascimento = request.body.nascimento;
  var _sexo = request.body.sexo;
  var _id = request.body.id;

  var userInfo = {
    nome: _name,
    username: _cpf,
    email: _email,
    nome: _username,
    rg: _rg,
    uf: _uf,
    estado: _estado,
    idMunicipio: _idMunicipio,
    idUf:_idUf,
    municipio: _municipio,
    password: _password,
    endereco: _endereco,
    nascimento: _nascimento,
    sexo: _sexo,
    id: _id
  };

  restparse.createUser(userInfo, function(err, res, body, success) {
    response.status(200).json({ success: true, data: body });
    console.log('object id = ', body.objectId);
  });

};
UsuarioController.prototype.recuperarsenha = function(request, response, next) {
  var _cpf = request.body.cpf;
   console.log('Recuperar===',_cpf);
 var recupera = {
  cpf: _cpf
};
var className = 'RecuperarSenha';

restparse.createObject(className, recupera, function(err, res, body, success) {
  response.status(200).json({ success: true, data: 'solicitado recuperação' });
});

};

UsuarioController.prototype.getAll = function(request, response, next) {

  var params = {
  count: true
};

 restparse.getUsers(params,function(err, res, body, success) {
  response.status(200).json({ success: true, data: body });
});

};

UsuarioController.prototype.remove = function(request, response, next) {

}



module.exports = new UsuarioController();
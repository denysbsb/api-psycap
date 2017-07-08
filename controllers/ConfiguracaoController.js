var express = require('express');
var service  = require('../services/configuracao');
var abstract = require('./AbstractController');

function ConfiguracaoController() {}

ConfiguracaoController.prototype.find = function(request, response, next) {

    service.list().then(function(data) {
        if(data.length === 0) {
            response.status(500).json(abstract.sendData(false, null, "Não há configuração"));
            return;
        }

        response.status(200).json(abstract.sendData(true, data[0]));
    }).cath(function(error) {
        response.status(500).json(abstract.sendData(false, error));
    });

};

module.exports = new ConfiguracaoController();
var express = require('express');
var service  = require('../services/regrasContrapartida');

function RegrasContrapartidaController() {}

RegrasContrapartidaController.prototype.listRules = function(request, response, next) {
    var id = request.params._ID_PROGRAMA;

    service.list(id).then(function(data) {
        response.status(200).json(data);
    }).cath(function(error) {
        response.status(500).json({ success: false, data: error });
    });

};

module.exports = new RegrasContrapartidaController();
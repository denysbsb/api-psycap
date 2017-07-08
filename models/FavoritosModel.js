"use strict";

module.exports = function(sequelize, DataTypes) {

    var Favoritos = sequelize.define("Favoritos", {
        idUser: DataTypes.STRING,
        idPrograma: DataTypes.STRING
    });

    return Favoritos;
};
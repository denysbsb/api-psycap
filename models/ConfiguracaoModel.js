"use strict";

module.exports = function(sequelize, DataTypes) {
    var entity = sequelize.define("configuracao", {
        DATA_ULTIMA_ATUALIZACAO: {
            type: DataTypes.DATE,
            primaryKey: true
        },
        URL_PARECER_PROPOSTA: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: false,
        tableName: 'configuracao'
    });

    return entity;
};
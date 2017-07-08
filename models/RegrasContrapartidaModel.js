"use strict";

module.exports = function(sequelize, DataTypes) {
    var entity = sequelize.define("regras_contrapartida", {
        ID_PROGRAMA: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        DESC_REGRA: DataTypes.STRING,
        PERCENT_MIN_CONTRAPARTIDA: DataTypes.DOUBLE,
        PERCENT_MAX_CONTRAPARTIDA: DataTypes.DOUBLE,
        ACEITA_CONTRAPARTIDA_BENS: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: false,
        tableName: 'regras_contrapartida'
    });

    return entity;
};
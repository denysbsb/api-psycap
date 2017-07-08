"use strict";

module.exports = function(sequelize, DataTypes) {
    var entity = sequelize.define("programa_municipio", {
        ID_PROGRAMA: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        COD_IBGE_MUNICIPIO:  {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        timestamps: false,
        freezeTableName: false,
        tableName: 'programa_municipio',

        classMethods: {
            associate: function(models) {
                //entity.hasOne(models.programa)
                //entity.hasOne(models.municipio)
            }
        }
    });

    return entity;
};
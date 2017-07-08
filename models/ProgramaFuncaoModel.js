"use strict";

module.exports = function(sequelize, DataTypes) {
    var entity = sequelize.define("programa_funcao", {
        ID_PROGRAMA: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        COD_FUNCAO: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        timestamps: false,
        freezeTableName: false,
        tableName: 'programa_funcao',

        classMethods: {
            associate: function(models) {
                //entity.hasOne(models.programa)
                //entity.hasOne(models.funcao)
            }
        }
    });

    return entity;
};
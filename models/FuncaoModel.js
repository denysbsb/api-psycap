"use strict";

module.exports = function(sequelize, DataTypes) {
    var entity = sequelize.define("funcao", {
        COD_FUNCAO: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        NOME_FUNCAO: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: false,
        tableName: 'funcao',

        classMethods: {
            associate: function(models) {
                //entity.hasMany(models.programa_funcao)
            }
        }
    });

    return entity;
};
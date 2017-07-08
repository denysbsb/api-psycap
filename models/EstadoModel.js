"use strict";

module.exports = function(sequelize, DataTypes) {
    var entity = sequelize.define("estado", {
        COD_IBGE_ESTADO: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        NOME_ESTADO: DataTypes.STRING,
        UF_ESTADO: DataTypes.STRING,
        AREA: DataTypes.INTEGER,
        POPULACAO: DataTypes.INTEGER,
        DENSIDADE: DataTypes.INTEGER,
        ALTITUDE: DataTypes.INTEGER,
        CLIMA: DataTypes.STRING,
        PIB: DataTypes.INTEGER,
        IDH: DataTypes.INTEGER,
        PIB_PERCAPITA: DataTypes.INTEGER
    }, {
        timestamps: false,
        freezeTableName: false,
        tableName: 'estado'
    });

    return entity;
};
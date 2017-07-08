"use strict";

module.exports = function(sequelize, DataTypes) {
    var entity = sequelize.define("municipio", {
        COD_IBGE_MUNICIPIO: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        NOME_MUNICIPIO: DataTypes.STRING,
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
        tableName: 'municipio',
        paranoid: false,
        underscored: true
    });

    return entity;
};
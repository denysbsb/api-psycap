"use strict";

module.exports = function(sequelize, DataTypes) {
    var entity = sequelize.define("proposta", {
        ID_PROPOSTA: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        DESC_ORGAO_SUP: DataTypes.STRING,
        NATUREZA_JURIDICA: DataTypes.STRING,
        NR_PROPOSTA: DataTypes.STRING,
        DIA_PROP: DataTypes.INTEGER,
        MES_PROP: DataTypes.INTEGER,
        ANO_PROP: DataTypes.INTEGER,
        DIA_PROPOSTA: DataTypes.DATE,
        DESC_ORGAO: DataTypes.STRING,
        MODALIDADE: DataTypes.STRING,
        DIA_INI_VIGENCIA_PROPOSTA: DataTypes.DATE,
        DIA_FIM_VIGENCIA_PROPOSTA: DataTypes.DATE,
        OBJETO_PROPOSTA: DataTypes.STRING,
        VL_GLOBAL_PROP: DataTypes.FLOAT,
        VL_REPASSE_PROP: DataTypes.FLOAT,
        VL_CONTRAPARTIDA_PROP: DataTypes.FLOAT,
        ID_PROPONENTE: DataTypes.INTEGER,
        SIT_PROPOSTA_AGREGADA: DataTypes.STRING,
        SIT_PROPOSTA: DataTypes.STRING,
        PARECER_PROPOSTA: DataTypes.STRING,
        PARECER_PLANO_TRABALHO: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: false,
        tableName: 'proposta'
    });

    return entity;
};


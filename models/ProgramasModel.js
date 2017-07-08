"use strict";

module.exports = function(sequelize, DataTypes) {
    var entity = sequelize.define("programa", {
        ID_PROGRAMA: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        COD_PROGRAMA: DataTypes.STRING,
        NOME_PROGRAMA: DataTypes.STRING,
        SIT_PROGRAMA: DataTypes.STRING,
        DATA_DISPONIBILIZACAO: DataTypes.DATE,
        ANO_DISPONIBILIZACAO: DataTypes.INTEGER,
        DT_PROG_INI_RECEB_PROP: DataTypes.DATE,
        DT_PROG_FIM_RECEB_PROP: DataTypes.DATE,
        DT_PROG_INI_EMENDA_PAR: DataTypes.DATE,
        DT_PROG_FIM_EMENDA_PAR: DataTypes.DATE,
        DT_PROG_INI_BENEF_ESP: DataTypes.DATE,
        DT_PROG_FIM_BENEF_ESP: DataTypes.DATE,
        MODALIDADE_PROGRAMA: DataTypes.STRING,
        NATUREZA_JURIDICA_PROGRAMA: DataTypes.STRING,
        UF_PROGRAMA: DataTypes.STRING,
        EMENDA: DataTypes.BOOLEAN,
        ORGAO: DataTypes.STRING,
        ORGAO_EXECUTOR: DataTypes.STRING,
        QUALIFICACAO_PROPOSTA: DataTypes.STRING,
        DESCRICAO: DataTypes.STRING,
        OBSERVACAO: DataTypes.STRING,
        CRITERIOS_DE_SELECAO: DataTypes.STRING,
        OUTRAS_INFORMACOES: DataTypes.STRING,
        CHAMAMENTO_PROJETO: DataTypes.STRING,
        PUBLICACAO_DISPONIBILIZACAO: DataTypes.DATE,
        PROPONENTES_ESPECIFICOS: DataTypes.STRING,
        REGRAS_CONTRAPARTIDA: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: false,
        tableName: 'programa',

        classMethods: {
            associate: function(models) {
               // entity.hasMany(models.programa_funcao)
                //entity.hasMany(models.programa_municipio)
            }
        }
    });

    return entity;
};
var models  = require('../models');
var sequelize = require('../db/sequelize');

function propostaService() {}


propostaService.prototype.findAll = function(params) {
    var ano = params._ano;
    var tipo = (params._tipo === 'E')? "'Administração Pública Estadual ou do Distrito Federal'" : "'Administração Pública Municipal'";

    return sequelize.query(
        'SELECT P."SIT_PROPOSTA_AGREGADA", P."ANO_PROP", count(*) as "COUNT" ' +
        'FROM proposta P ' +
        'JOIN proponente PR on (P."ID_PROPONENTE" = PR."ID_PROPONENTE") ' +
        'JOIN municipio M on (PR."COD_MUNICIPIO_IBGE" = M."COD_IBGE_MUNICIPIO"::varchar) ' +
        'WHERE  P."ANO_PROP" IN (' + ano + ') ' +
        'AND (M."COD_IBGE_MUNICIPIO" = :_COD_IBGE ' +
        'OR M."UF_ESTADO" = :_UF) ' +
        'AND P."SIT_PROPOSTA_AGREGADA" <> \'Não Cadastrado\' ' +
        'AND P."NATUREZA_JURIDICA" = ' + tipo +
        ' GROUP BY P."SIT_PROPOSTA_AGREGADA", P."ANO_PROP"'
    ,{
        replacements: { _COD_IBGE: params._cod_ibge, _UF: params._uf },
        type: sequelize.QueryTypes.SELECT
    });
};

propostaService.prototype.listPropostas = function(params) {
    var order = params._order;
    var ano = params._ano;
    var tipo = (params._tipo === 'E')? "'Administração Pública Estadual ou do Distrito Federal'" : "'Administração Pública Municipal'";

    return sequelize.query(
        'SELECT P.* ' +
        'FROM proposta P ' +
        'JOIN proponente PR on (P."ID_PROPONENTE" = PR."ID_PROPONENTE") ' +
        'JOIN municipio M on (PR."COD_MUNICIPIO_IBGE" = M."COD_IBGE_MUNICIPIO"::varchar) ' +
        'WHERE  P."ANO_PROP" IN (' + ano + ') ' +
        'AND (M."COD_IBGE_MUNICIPIO" = :_COD_IBGE ' +
        'OR M."UF_ESTADO" = :_UF) ' +
        'AND P."SIT_PROPOSTA_AGREGADA" <> \'Não Cadastrado\' ' +
        'AND P."NATUREZA_JURIDICA" = ' + tipo +
        ' ORDER BY P."DIA_PROPOSTA" ' + order
        ,{
            replacements: { _COD_IBGE: params._cod_ibge, _UF: params._uf },
            type: sequelize.QueryTypes.SELECT
        });
};


module.exports = new propostaService();
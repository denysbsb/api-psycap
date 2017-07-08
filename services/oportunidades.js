var models  = require('../models');
var sequelize = require('../db/sequelize');

function oportunidadesService() {}

oportunidadesService.prototype.create = function(data) {
    return models.programa.create({
        username: data.username
    });
};

oportunidadesService.prototype.remove = function(id) {
    return models.programa.destroy({
        where: {
            id: id
        }
    });
};

oportunidadesService.prototype.findAll = function() {

    return models.programa_funcao.findAll();
};

oportunidadesService.prototype.filterCountyState = function(tipo, ibge, uf) {
    if(tipo === 'E') {
        return ' AND (NOT EXISTS ( SELECT 1 FROM  programa_proponente pp ' +
            'JOIN proponente pr on (pr."ID_PROPONENTE" = pp."ID_PROPONENTE") ' +
            'WHERE pp."ID_PROGRAMA" = P."ID_PROGRAMA" ' +
            'AND pr."COD_MUNICIPIO_IBGE" = \'' + ibge + '\') ' +
            'AND (P."UF_PROGRAMA" = \'' + uf + '\')) ';
    }

    return ' AND EXISTS ( SELECT 1 FROM  programa_proponente pp ' +
        'JOIN proponente pr on (pr."ID_PROPONENTE" = pp."ID_PROPONENTE") ' +
        'WHERE pp."ID_PROGRAMA" = P."ID_PROGRAMA" ' +
        'AND pr."COD_MUNICIPIO_IBGE" = \'' + ibge + '\') ';
}

oportunidadesService.prototype.find = function(params) {
    var tipo = (params._tipo === 'E')? "'Administração Pública Estadual ou do Distrito Federal'" : "'Administração Pública Municipal'";

    return sequelize.query(
        'SELECT qnt."COD_FUNCAO", qnt."NOME_FUNCAO", qnt."REGRA", count(*) as "COUNT" FROM ( ' +
        '('+
        'SELECT P.*, f."COD_FUNCAO", f."NOME_FUNCAO", 1 as "REGRA" ' +
        'FROM programa P ' +
        'JOIN programa_funcao pf on (P."ID_PROGRAMA" = pf."ID_PROGRAMA") ' +
        'JOIN funcao f on (pf."COD_FUNCAO" = f."COD_FUNCAO") ' +
        'where ((((SELECT MIN(DT_PROG) ' +
        'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) <= 7) ' +
        'AND (((SELECT MIN(DT_PROG) ' +
        'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) > 0)) ' +
        'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
        this.filterCountyState(params._tipo, params._cod_ibge, params._uf) +
        'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
        ') ' + 'UNION ALL ( ' +
        'SELECT P.*, f."COD_FUNCAO", f."NOME_FUNCAO", 2 as "REGRA" ' +
        'FROM programa P ' +
        'JOIN programa_funcao pf on (P."ID_PROGRAMA" = pf."ID_PROGRAMA") ' +
        'JOIN funcao f on (pf."COD_FUNCAO" = f."COD_FUNCAO") ' +
        'where ((((SELECT MIN(DT_PROG) ' +
        'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) <= 30) ' +
        'AND (((SELECT MIN(DT_PROG) ' +
        'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) > 0)) ' +
        'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
        this.filterCountyState(params._tipo, params._cod_ibge, params._uf) +
        'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
        ') ' + 'UNION ALL ( ' +
        'SELECT P.*, f."COD_FUNCAO", f."NOME_FUNCAO", 3 as "REGRA" ' +
        'FROM programa P ' +
        'JOIN programa_funcao pf on (P."ID_PROGRAMA" = pf."ID_PROGRAMA") ' +
        'JOIN funcao f on (pf."COD_FUNCAO" = f."COD_FUNCAO") ' +
        'where (((SELECT MIN(DT_PROG) ' +
        'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) > 30) ' +
        'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
        this.filterCountyState(params._tipo, params._cod_ibge, params._uf) +
        'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
        ') ' +
        ') as qnt ' +
        'GROUP BY qnt."COD_FUNCAO", qnt."NOME_FUNCAO", qnt."REGRA" '

        , {replacements: {_COD_IBGE: params._cod_ibge, _UF_PROGRAMA: params._uf},
            type: sequelize.QueryTypes.SELECT});

};

    oportunidadesService.prototype.findByIdList = function(params) {
    var order = params._order;
    var tipo = (params._tipo === 'E')? "'Administração Pública Estadual ou do Distrito Federal'" : "'Administração Pública Municipal'";

    return sequelize.query(
        'SELECT "ID_PROGRAMA", "NOME_PROGRAMA", "SIT_PROGRAMA", "DATA_DISPONIBILIZACAO", ' +
        '"ANO_DISPONIBILIZACAO", "DT_PROG_INI_RECEB_PROP", "DT_PROG_FIM_RECEB_PROP", ' +
        '"DT_PROG_INI_EMENDA_PAR", "DT_PROG_FIM_EMENDA_PAR", "DT_PROG_INI_BENEF_ESP", ' +
        '"DT_PROG_FIM_BENEF_ESP", "MODALIDADE_PROGRAMA", "NATUREZA_JURIDICA_PROGRAMA", ' +
        '"UF_PROGRAMA", "EMENDA", "ORGAO", "ORGAO_EXECUTOR", "QUALIFICACAO_PROPOSTA", ' +
        '"DESCRICAO", "OBSERVACAO", "CRITERIOS_DE_SELECAO", "OUTRAS_INFORMACOES", ' +
        '"CHAMAMENTO_PROJETO", "PUBLICACAO_DISPONIBILIZACAO", "PROPONENTES_ESPECIFICOS", ' +
        '"REGRAS_CONTRAPARTIDA", "COD_PROGRAMA", ' +
        '"COD_FUNCAO", "NOME_FUNCAO", "REGRA", "DATA_VIGENCIA" FROM ( ' +
        '('+
        'SELECT P.*, f.*,1 as "REGRA", ' +
        '(SELECT MIN(DT_PROG) FROM unnest(ARRAY[P."DT_PROG_FIM_RECEB_PROP",P."DT_PROG_FIM_EMENDA_PAR", P."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) as "DATA_VIGENCIA" ' +
        'FROM programa P ' +
        'JOIN programa_funcao pf on (P."ID_PROGRAMA" = pf."ID_PROGRAMA") ' +
        'JOIN funcao f on (pf."COD_FUNCAO" = f."COD_FUNCAO") ' +
        'where ((((SELECT MIN(DT_PROG) ' +
        'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) <= 7) ' +
        'AND (((SELECT MIN(DT_PROG) ' +
        'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) > 0)) ' +
        'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
        'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
        this.filterCountyState(params._tipo, params._cod_ibge, params._uf) +
        ') ' + 'UNION ALL ( ' +
        'SELECT P.*, f.*, 2 as "REGRA", ' +
        '(SELECT MIN(DT_PROG) FROM unnest(ARRAY[P."DT_PROG_FIM_RECEB_PROP",P."DT_PROG_FIM_EMENDA_PAR", P."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) as "DATA_VIGENCIA" ' +
        'FROM programa P ' +
        'JOIN programa_funcao pf on (P."ID_PROGRAMA" = pf."ID_PROGRAMA") ' +
        'JOIN funcao f on (pf."COD_FUNCAO" = f."COD_FUNCAO") ' +
        'where ((((SELECT MIN(DT_PROG) ' +
        'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) <= 30) ' +
        'AND (((SELECT MIN(DT_PROG) ' +
        'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) > 0)) ' +
        'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
        'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
        this.filterCountyState(params._tipo, params._cod_ibge, params._uf) +
        ') ' + 'UNION ALL ( ' +
        'SELECT P.*, f.*, 3 as "REGRA", ' +
        '(SELECT MIN(DT_PROG) FROM unnest(ARRAY[P."DT_PROG_FIM_RECEB_PROP",P."DT_PROG_FIM_EMENDA_PAR", P."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) as "DATA_VIGENCIA" ' +
        'FROM programa P ' +
        'JOIN programa_funcao pf on (P."ID_PROGRAMA" = pf."ID_PROGRAMA") ' +
        'JOIN funcao f on (pf."COD_FUNCAO" = f."COD_FUNCAO") ' +
        'where (((SELECT MIN(DT_PROG) ' +
        'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) > 30) ' +
        'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
        'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
        this.filterCountyState(params._tipo, params._cod_ibge, params._uf) +
        ') ' +
        ') as qnt ' +
        'ORDER BY "DATA_VIGENCIA" ASC'

        , {replacements: {_COD_IBGE: params._cod_ibge, _UF_PROGRAMA: params._uf, _COD_FUNCAO: params._funcao},
            type: sequelize.QueryTypes.SELECT});
}

oportunidadesService.prototype.findProgramaFuncao = function(_idPrograma) {
    return models.programa_funcao.findAll({
        where: { ID_PROGRAMA: _idPrograma }
    });
};

oportunidadesService.prototype.findFuncao = function(_codFuncao) {
    return models.funcao.findAll({
        where: { COD_FUNCAO: _codFuncao }
    });
};

module.exports = new oportunidadesService();
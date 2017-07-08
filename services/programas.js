var models  = require('../models');
var sequelize = require('../db/sequelize');

function programasService() {}

programasService.prototype.create = function(data) {
    return models.programa.create({
        username: data.username
    });
};

programasService.prototype.remove = function(id) {
    return models.programa.destroy({
        where: {
            id: id
        }
    });
};

programasService.prototype.findAll = function(params) {
    return models.programa.findAll({
        offset: params._offset,
        limit: params._limit
    });
};


programasService.prototype.findMultiple = function(params) {
    return sequelize.query(
        'SELECT * , (SELECT MAX(DT_PROG) FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", ' +
        'p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG ) as "EXPIRA" FROM programa p '+
        'where "ID_PROGRAMA" = '+ params.id_programa +' AND "UF_PROGRAMA" = \''+params.uf_programa+'\'')
};

programasService.prototype.filterCountyState = function(tipo, ibge, uf) {
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


programasService.prototype.findProgramas = function(params) {
    return sequelize.query(
        'SELECT P.* '+
        'FROM programa P ' +
        'LEFT JOIN estado E on (P."UF_PROGRAMA" = E."UF_ESTADO") ' +
        'WHERE  P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
        'AND ( ' +
        'to_ascii(E."NOME_ESTADO",\'LATIN1\') ilike to_ascii(:_texto, \'LATIN1\') ' +
        'OR to_ascii(P."NOME_PROGRAMA", \'LATIN1\') ilike to_ascii(:_texto, \'LATIN1\') ' +
        ') ' +
        'LIMIT :_limit OFFSET :_offset '
        , {replacements: {_texto: '%'+params._texto+'%', _limit: params._limit, _offset: params._offset}
        , type: sequelize.QueryTypes.SELECT})
}

programasService.prototype.findProgramasPorEstado = function(params) {
    var tipo = (params._tipo === 'E')? "'Administração Pública Estadual ou do Distrito Federal'" : "'Administração Pública Municipal'";

    return sequelize.query(
        '('+
            'SELECT P."ID_PROGRAMA", P."NOME_PROGRAMA", P."ORGAO", P."MODALIDADE_PROGRAMA", ' +
            'P."NATUREZA_JURIDICA_PROGRAMA", P."EMENDA", \'REGRA1\' as "REGRA" ' +
            'FROM programa P ' +
            'where ( ' +
            '(((P."DT_PROG_FIM_RECEB_PROP" - CURRENT_DATE) <= 7) AND ((P."DT_PROG_FIM_RECEB_PROP" - CURRENT_DATE) > 0)) ' +
            'OR (((P."DT_PROG_FIM_EMENDA_PAR" - CURRENT_DATE) <= 7) AND ((P."DT_PROG_FIM_EMENDA_PAR" - CURRENT_DATE) > 0)) ' +
            'OR (((P."DT_PROG_FIM_BENEF_PAR" - CURRENT_DATE) <= 7) AND ((P."DT_PROG_FIM_BENEF_PAR" - CURRENT_DATE) > 0)) ' +
            ') ' +
            'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
            'AND P."UF_PROGRAMA" = :_UF_PROGRAMA ' +
            'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
        ') ' + 'UNION ALL ( ' +
            'SELECT P."ID_PROGRAMA", P."NOME_PROGRAMA", P."ORGAO", P."MODALIDADE_PROGRAMA", ' +
            'P."NATUREZA_JURIDICA_PROGRAMA", P."EMENDA", \'REGRA2\' as "REGRA" ' +
            'FROM programa P ' +
            'where ( ' +
            '(((P."DT_PROG_FIM_RECEB_PROP" - CURRENT_DATE) <= 30) AND ((P."DT_PROG_FIM_RECEB_PROP" - CURRENT_DATE) > 0)) ' +
            'OR (((P."DT_PROG_FIM_EMENDA_PAR" - CURRENT_DATE) <= 30) AND ((P."DT_PROG_FIM_EMENDA_PAR" - CURRENT_DATE) > 0)) ' +
            'OR (((P."DT_PROG_FIM_BENEF_PAR" - CURRENT_DATE) <= 30) AND ((P."DT_PROG_FIM_BENEF_PAR" - CURRENT_DATE) > 0)) ' +
            ') ' +
            'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
            'AND P."UF_PROGRAMA" = :_UF_PROGRAMA ' +
            'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
        ') ' + 'UNION ALL ( ' +
            'SELECT P."ID_PROGRAMA", P."NOME_PROGRAMA", P."ORGAO", P."MODALIDADE_PROGRAMA", ' +
            'P."NATUREZA_JURIDICA_PROGRAMA", P."EMENDA", \'REGRA3\' as "REGRA" ' +
            'FROM programa P ' +
            'where ( ' +
            '(((P."DT_PROG_FIM_RECEB_PROP" - CURRENT_DATE) > 30) AND ((P."DT_PROG_FIM_RECEB_PROP" - CURRENT_DATE) > 0)) ' +
            'OR (((P."DT_PROG_FIM_EMENDA_PAR" - CURRENT_DATE) > 30) AND ((P."DT_PROG_FIM_EMENDA_PAR" - CURRENT_DATE) > 0)) ' +
            'OR (((P."DT_PROG_FIM_BENEF_PAR" - CURRENT_DATE) > 30) AND ((P."DT_PROG_FIM_BENEF_PAR" - CURRENT_DATE) > 0)) ' +
            ') ' +
            'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
            'AND P."UF_PROGRAMA" = :_UF_PROGRAMA ' +
            'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
        ') '
        , {replacements: {_UF_PROGRAMA: params._uf}, type: sequelize.QueryTypes.SELECT})
};

programasService.prototype.qntProgramasPorEstado = function(params) {
    var emenda = (params._EMENDA !== 'null')? 'AND P."EMENDA" = :_EMENDA ' : '';
    var tipo = (params._tipo === 'E')? "'Administração Pública Estadual ou do Distrito Federal'" : "'Administração Pública Municipal'";

    return sequelize.query(
        'SELECT qnt."REGRA", count(*) as "COUNT" FROM (' +
        '('+
            'SELECT P."ID_PROGRAMA", P."NOME_PROGRAMA", P."ORGAO", P."MODALIDADE_PROGRAMA", ' +
            'P."NATUREZA_JURIDICA_PROGRAMA", P."EMENDA", f.*, 1 as "REGRA" ' +
            'FROM programa P ' +
            'JOIN programa_funcao pf on (P."ID_PROGRAMA" = pf."ID_PROGRAMA") ' +
            'JOIN funcao f on (pf."COD_FUNCAO" = f."COD_FUNCAO") ' +
            'where ((((SELECT MIN(DT_PROG) ' +
            'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) <= 7) ' +
            'AND (((SELECT MIN(DT_PROG) ' +
            'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) > 0)) ' +
            'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
            this.filterCountyState(params._tipo, params._cod_ibge, params._uf) +
            emenda +
            'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
            ') ' + 'UNION ALL ( ' +
            'SELECT P."ID_PROGRAMA", P."NOME_PROGRAMA", P."ORGAO", P."MODALIDADE_PROGRAMA", ' +
            'P."NATUREZA_JURIDICA_PROGRAMA", P."EMENDA", f.*, 2 as "REGRA" ' +
            'FROM programa P ' +
            'JOIN programa_funcao pf on (P."ID_PROGRAMA" = pf."ID_PROGRAMA") ' +
            'JOIN funcao f on (pf."COD_FUNCAO" = f."COD_FUNCAO") ' +
            'where ((((SELECT MIN(DT_PROG) ' +
            'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) <= 30) ' +
            'AND (((SELECT MIN(DT_PROG) ' +
            'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) > 0)) ' +
            'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
            this.filterCountyState(params._tipo, params._cod_ibge, params._uf) +
            emenda +
            'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
            ') ' + 'UNION ALL ( ' +
            'SELECT P."ID_PROGRAMA", P."NOME_PROGRAMA", P."ORGAO", P."MODALIDADE_PROGRAMA", ' +
            'P."NATUREZA_JURIDICA_PROGRAMA", P."EMENDA", f.*, 3 as "REGRA" ' +
            'FROM programa P ' +
            'JOIN programa_funcao pf on (P."ID_PROGRAMA" = pf."ID_PROGRAMA") ' +
            'JOIN funcao f on (pf."COD_FUNCAO" = f."COD_FUNCAO") ' +
            'where (((SELECT MIN(DT_PROG) ' +
            'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) > 30) ' +
            'AND P."SIT_PROGRAMA" = \'DISPONIBILIZADO\' ' +
            this.filterCountyState(params._tipo, params._cod_ibge, params._uf) +
            emenda +
            'AND P."NATUREZA_JURIDICA_PROGRAMA" = ' + tipo +
            ') ' +
        ') as qnt ' +
        'GROUP BY qnt."REGRA" '
        , {replacements: {
            _COD_IBGE: params._cod_ibge,
            _UF_PROGRAMA: params._uf, _EMENDA: params._EMENDA
        },
            type: sequelize.QueryTypes.SELECT})
};


programasService.prototype.find = function(id) {
    return models.programa.find({
        where: { ID_PROGRAMA: id }
    });
};

module.exports = new programasService();
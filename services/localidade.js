var models  = require('../models');
var sequelize = require('../db/sequelize');

function localidadeService() {}

localidadeService.prototype.municipioFindAll = function() {
    return models.municipio.findAll();
};

localidadeService.prototype.municipioFind = function(uf) {
    return sequelize.query(
        'SELECT M.*, 0 as "COUNT" ' +
            ' FROM municipio AS M ' +
            'WHERE  M."UF_ESTADO" = :_UF_ESTADO ' +
            'ORDER BY M."NOME_MUNICIPIO" '
        , {replacements: { _UF_ESTADO: uf }
            , type: sequelize.QueryTypes.SELECT});
};

localidadeService.prototype.municipioFindForId = function(id) {
    return models.municipio.findAll({
        where: { COD_IBGE_MUNICIPIO: id }
    });
};

localidadeService.prototype.estadoCreate = function(data) {
    return models.estado.create({
        username: data.username
    });
};

localidadeService.prototype.estadoRemove = function(id) {
    return models.estado.destroy({
        where: {
            id: id
        }
    });
};

localidadeService.prototype.estadoFindAll = function() {
    return sequelize.query(
        'SELECT E.*, ' +
        '(SELECT count(*) FROM programa p ' +
        'WHERE p."UF_PROGRAMA" = E."UF_ESTADO" ' +
        'AND (((SELECT MIN(DT_PROG) ' +
        'FROM unnest(ARRAY[p."DT_PROG_FIM_RECEB_PROP", p."DT_PROG_FIM_EMENDA_PAR", ' +
        'p."DT_PROG_FIM_BENEF_ESP"]) DT_PROG) - CURRENT_DATE) > 0) ' +
        'AND p."SIT_PROGRAMA" = \'DISPONIBILIZADO\') AS "COUNT" ' +
        'FROM estado E ORDER BY E."UF_ESTADO" '
        , {type: sequelize.QueryTypes.SELECT});
};

localidadeService.prototype.estadoFind = function(id) {
    return models.estado().find({
        where: { id: id }
    });
};

module.exports = new localidadeService();
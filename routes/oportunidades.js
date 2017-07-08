var express = require('express');
var router = express.Router();

var OportunidadesController = require('../controllers/OportunidadesController');

/**
 * @api {get} /oportunidades/:_cod_ibge/IBGE/:_uf/UF/:_tipo/tipo Listar oportunidades de localidade
 * @apiGroup Oportunidades
 *
 * @apiParam {Number} cod_ibge CODIGO_IBGE_MUNICIPIO do municipio.
 * @apiParam {String} uf uf do municipio.
 * @apiParam {String} tipo tipo da oportunidade (E = admin.estadual - !E = admin. municipal)
 *
 * @apiSuccess {json} status Listagem de oportunidades de municipios
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
 *      "COD_FUNCAO": 123,
 *      "NOME_FUNCAO": "abcd",
 *      "REGRA": 123,
 *      "COUNT": "123"
 *    }]
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Not Found
 *     { 
 *       "success": false, 
 *       "data": error 
 *     }
 *
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Message Error"
 *     }
 */
router.get('/:_cod_ibge/IBGE/:_uf/UF/:_tipo/tipo', OportunidadesController.getById);

/**
 * @api {get} /:_cod_ibge/IBGE/:_uf/UF/:_funcao/FUNCAO/:_tipo/tipo/:_order/ORDER Oportunidades de tipo de função
 * @apiGroup Oportunidades
 *
 * @apiParam {Number} cod_ibge CODIGO_IBGE_MUNICIPIO do municipio.
 * @apiParam {String} uf uf do municipio.
 * @apiParam {Number} funcao codigo da função.
 * @apiParam {String} tipo tipo da oportunidade.
 * @apiParam {String} order Ordenação da resposta.
 *
 * @apiSuccess {json} status Listagem de oportunidades de acordo com a funcao
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
 *      "ID_PROGRAMA": 123,
 *      "NOME_PROGRAMA": "abcd",
 *      "SIT_PROGRAMA": "abcd",
 *      "DATA_DISPONIBILIZACAO": "2017-03-21T03:00:00.000Z",
 *      "ANO_DISPONIBILIZACAO": 123,
 *      "DT_PROG_INI_RECEB_PROP": "2017-03-21T03:00:00.000Z",
 *      "DT_PROG_FIM_RECEB_PROP": "2017-12-08T02:00:00.000Z",
 *      "DT_PROG_INI_EMENDA_PAR": "2017-12-08T02:00:00.000Z",
 *      "DT_PROG_FIM_EMENDA_PAR": "2017-12-08T02:00:00.000Z",
 *      "DT_PROG_INI_BENEF_ESP": "2017-12-08T02:00:00.000Z",
 *      "DT_PROG_FIM_BENEF_ESP": "2017-12-08T02:00:00.000Z",
 *      "MODALIDADE_PROGRAMA": "Cabcd",
 *      "NATUREZA_JURIDICA_PROGRAMA": "abcd",
 *      "UF_PROGRAMA": "abcd",
 *      "EMENDA": false,
 *      "ORGAO": "abcd",
 *      "ORGAO_EXECUTOR": "abcd",
 *      "QUALIFICACAO_PROPOSTA": "abcd",
 *      "DESCRICAO": "abcd",
 *      "OBSERVACAO": "abcd",
 *      "CRITERIOS_DE_SELECAO": "abcd",
 *      "OUTRAS_INFORMACOES": "abcd",
 *      "CHAMAMENTO_PROJETO": "abcd",
 *      "PUBLICACAO_DISPONIBILIZACAO": "2017-03-15T03:00:00.000Z",
 *      "PROPONENTES_ESPECIFICOS": "abcd",
 *      "REGRAS_CONTRAPARTIDA": "abcd",
 *      "COD_PROGRAMA": "123",
 *      "COD_FUNCAO": 123,
 *      "NOME_FUNCAO": "abcd",
 *      "REGRA": 123,
 *      "DATA_VIGENCIA": "2017-12-08T02:00:00.000Z"
 *    }]
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Not Found
 *     { 
 *       "success": false, 
 *       "data": error 
 *     }
 *
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Message Error"
 *     }
 */
router.get('/:_cod_ibge/IBGE/:_uf/UF/:_funcao/FUNCAO/:_tipo/tipo/:_order/ORDER', OportunidadesController.getByIdList);

module.exports = router;
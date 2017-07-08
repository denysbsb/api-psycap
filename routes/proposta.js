var express = require('express');
var router = express.Router();

var PropostasController = require('../controllers/PropostasController');

/**
 * @api {get} /proposta/:_ano/ano/:_cod_ibge/ibge/:_uf/uf Listagem propostas de acordo com o ano
 * @apiGroup Proposta
 *
 * @apiParam {Number} ano Ano a ser pesquisado.
 * @apiParam {Number} cod_ibge CODIGO_IBGE_MUNICIPIO do municipio.
 * @apiParam {String} uf uf do municipio.
 *
 * @apiSuccess {json} status Listagem de proposta de municipio
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "data": [{
 *          "SIT_PROPOSTA_AGREGADA": "abcd",
 *          "ANO_PROP": 123,
 *          "COUNT": "123"
 *      }]
 *    } 
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
router.get('/:_ano/ano/:_cod_ibge/ibge/:_uf/uf/:_tipo/tipo', PropostasController.getProposta);

/**
 * @api {get} /proposta/:_ano/ano/:_cod_ibge/ibge/:_uf/uf/:_order/order Listagem propostas com ordenação
 * @apiGroup Proposta
 *
 * @apiParam {Number} ano Ano a ser pesquisado.
 * @apiParam {Number} cod_ibge CODIGO_IBGE_MUNICIPIO do municipio.
 * @apiParam {String} uf uf do municipio.
 * @apiParam {String} order Ordenação da resposta.
 *
 * @apiSuccess {json} status Listagem de proposta de municipio com ordenação
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *    "success": true,
 *    "data":[{
 *        "ID_PROPOSTA": 123,
 *        "DESC_ORGAO_SUP": "abcd",
 *        "NATUREZA_JURIDICA": "abcd",
 *        "DIA_PROP": 123,
 *        "MES_PROP": 123,
 *        "ANO_PROP": 123,
 *        "DIA_PROPOSTA": "2016-01-19T02:00:00.000Z",
 *        "DESC_ORGAO": "abcd",
 *        "MODALIDADE": "abcd",
 *        "DIA_INI_VIGENCIA_PROPOSTA": "2016-12-31T02:00:00.000Z",
 *        "DIA_FIM_VIGENCIA_PROPOSTA": "2018-12-31T02:00:00.000Z",
 *        "OBJETO_PROPOSTA": "abcd",
 *        "VL_GLOBAL_PROP": "$123,000.00",
 *        "VL_REPASSE_PROP": "$123,000.00",
 *        "VL_CONTRAPARTIDA_PROP": "$123,000.00",
 *        "ID_PROPONENTE": 123,
 *        "SIT_PROPOSTA_AGREGADA": "abc",
 *        "SIT_PROPOSTA": "abc",
 *        "PARECER_PROPOSTA": "abc",
 *        "PARECER_PLANO_TRABALHO": "abc",
 *        "NR_PROPOSTA": "123"
 *     }]
 *     } 
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
router.get('/:_ano/ano/:_cod_ibge/ibge/:_uf/uf/:_tipo/tipo/:_order/order', PropostasController.getListProposta);

module.exports = router;
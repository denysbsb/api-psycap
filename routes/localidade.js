var express = require('express');
var router = express.Router();

var controller = require('../controllers/LocalidadeController');

/**
 * @api {get} /localidade/municipio/all Listar todos os municipios
 * @apiGroup Localidade
 *
 * @apiSuccess {json} status Listagem de todos municipios
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
 *      "COD_IBGE_MUNICIPIO": 123,
 *      "NOME_MUNICIPIO": "abcd",
 *      "UF_ESTADO": "abcd",
 *      "AREA": "abcd",
 *      "POPULACAO": "abcd",
 *      "DENSIDADE": "abcd",
 *      "ALTITUDE": "abcd",
 *      "CLIMA": "abcd",
 *      "PIB": "abcd",
 *      "IDH": "abcd",
 *      "PIB_PERCAPITA": "abcd",
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
router.get('/municipio/all', controller.getAllMunicipio);

/**
 * @api {get} /localidade/estados/all Lista todos os estados
 * @apiGroup Localidade
 *
 * @apiSuccess {json} status Lista estados
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
 *      "COD_IBGE_ESTADO": 123,
 *      "NOME_ESTADO": "abcd",
 *      "UF_ESTADO": "abcd",
 *      "AREA": "abcd",
 *      "POPULACAO": "abcd",
 *      "DENSIDADE": "abcd",
 *      "ALTITUDE": "abcd",
 *      "CLIMA": "abcd",
 *      "PIB": "abcd",
 *      "IDH": "abcd",
 *      "PIB_PERCAPITA": "abcd",
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
router.get('/estados/all', controller.getAllEstados);

/**
 * @api {get} /localidade/municipio/:_id Detalha municipio
 * @apiGroup Localidade
 *
 * @apiParam {Number} id CODIGO_IBGE_MUNICIPIO do municipio.
 *
 * @apiSuccess {json} status Detalha municipio
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
 *      "COD_IBGE_MUNICIPIO": 123,
 *      "NOME_MUNICIPIO": "abcd",
 *      "UF_ESTADO": "abcd",
 *      "AREA": "abcd",
 *      "POPULACAO": "abcd",
 *      "DENSIDADE": "abcd",
 *      "ALTITUDE": "abcd",
 *      "CLIMA": "abcd",
 *      "PIB": "abcd",
 *      "IDH": "abcd",
 *      "PIB_PERCAPITA": "abcd",
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
router.get('/municipio/:_id', controller.getMunicipio);

/**
 * @api {get} /localidade/municipio/find/:_uf Lista municipios de UF
 * @apiGroup Localidade
 *
 * @apiParam {String} uf Código de uf.
 *
 * @apiSuccess {json} status Lista municipios de UF
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
 *      "NOME_MUNICIPIO": "abcd",
 *      "UF_ESTADO": "abcd",
 *      "CLIMA": "abcd",
 *      "AREA": "abcd",
 *      "POPULACAO": "abcd",
 *      "DENSIDADE": "abcd",
 *      "ALTITUDE": "abcd",
 *      "PIB": "abcd",
 *      "IDH": "abcd",
 *      "PIB_PERCAPITA": "abcd",
 *      "COD_IBGE_MUNICIPIO": 123,
 *      "COUNT": 123
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
router.get('/municipio/find/:_uf', controller.getMunicipioPorEstado);

module.exports = router;
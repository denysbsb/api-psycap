var express = require('express');
var router = express.Router();

var ProgramasController = require('../controllers/ProgramasController');

/**
 * @api {get} /programas/:_tipo/tipo/:_limit/:_offset Listar todos programas cadastrados
 * @apiGroup Programas
 *
 * @apiParam {String} tipo Tipo de programa.
 * @apiParam {Number} limit Numero de retorno de resposta.
 * @apiParam {Number} offset Numero que exclui linhas primarias da resposta.
 *
 * @apiSuccess {json} status Mensagem de acesso autorizado
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
 *     "ID_PROGRAMA": 123,
 *     "COD_PROGRAMA": "123",
 *     "NOME_PROGRAMA": "abcd",
 *     "SIT_PROGRAMA": "abcd",
 *     "DATA_DISPONIBILIZACAO": "abcd",
 *     "ANO_DISPONIBILIZACAO": "abcd",
 *     "DT_PROG_INI_RECEB_PROP": "2008-06-02T03:00:00.000Z",
 *     "DT_PROG_FIM_RECEB_PROP": "2008-12-23T02:00:00.000Z",
 *     "DT_PROG_INI_EMENDA_PAR": "abcd",
 *     "DT_PROG_FIM_EMENDA_PAR": "abcd",
 *     "DT_PROG_INI_BENEF_ESP": "abcd",
 *     "DT_PROG_FIM_BENEF_ESP": "abcd",
 *     "MODALIDADE_PROGRAMA": "abcd",
 *     "NATUREZA_JURIDICA_PROGRAMA": "abcd",
 *     "UF_PROGRAMA": "abcd",
 *     "EMENDA": false,
 *     "ORGAO": "abcd",
 *     "ORGAO_EXECUTOR": "abcd",
 *     "QUALIFICACAO_PROPOSTA": "abcd",
 *     "DESCRICAO": "abcd",
 *     "OBSERVACAO": "abcd",
 *     "CRITERIOS_DE_SELECAO": "abcd",
 *     "OUTRAS_INFORMACOES": "abcd",
 *     "CHAMAMENTO_PROJETO": "abcd",
 *     "PUBLICACAO_DISPONIBILIZACAO": "abcd",
 *     "PROPONENTES_ESPECIFICOS": "abcd",
 *     "REGRAS_CONTRAPARTIDA": "abcd"
 *    }]
 *
 */
router.get('/:_tipo/tipo/:_limit/:_offset', ProgramasController.getAll);

router.get('/consulta/multiple/:_ids/:_tipo/tipo', ProgramasController.getMultiple);

/**
 * @api {get} /programas/find/:_texto/:_limit/:_offset Busca de texto em programas
 * @apiGroup Programas
 *
 * @apiParam {String} texto Texto a ser pesquisado.
 * @apiParam {Number} limit Limite de resposta.
 * @apiParam {Number} offset Elimina resposta.
 *
 * @apiSuccess {json} status Busca texto digitado em programas
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
 *     "ID_PROGRAMA": 123,
 *     "COD_PROGRAMA": "123",
 *     "NOME_PROGRAMA": "abcd",
 *     "SIT_PROGRAMA": "abcd",
 *     "DATA_DISPONIBILIZACAO": "abcd",
 *     "ANO_DISPONIBILIZACAO": "abcd",
 *     "DT_PROG_INI_RECEB_PROP": "2008-06-02T03:00:00.000Z",
 *     "DT_PROG_FIM_RECEB_PROP": "2008-12-23T02:00:00.000Z",
 *     "DT_PROG_INI_EMENDA_PAR": "abcd",
 *     "DT_PROG_FIM_EMENDA_PAR": "abcd",
 *     "DT_PROG_INI_BENEF_ESP": "abcd",
 *     "DT_PROG_FIM_BENEF_ESP": "abcd",
 *     "MODALIDADE_PROGRAMA": "abcd",
 *     "NATUREZA_JURIDICA_PROGRAMA": "abcd",
 *     "UF_PROGRAMA": "abcd",
 *     "EMENDA": false,
 *     "ORGAO": "abcd",
 *     "ORGAO_EXECUTOR": "abcd",
 *     "QUALIFICACAO_PROPOSTA": "abcd",
 *     "DESCRICAO": "abcd",
 *     "OBSERVACAO": "abcd",
 *     "CRITERIOS_DE_SELECAO": "abcd",
 *     "OUTRAS_INFORMACOES": "abcd",
 *     "CHAMAMENTO_PROJETO": "abcd",
 *     "PUBLICACAO_DISPONIBILIZACAO": "abcd",
 *     "PROPONENTES_ESPECIFICOS": "abcd",
 *     "REGRAS_CONTRAPARTIDA": "abcd"
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
router.get('/find/:_texto/:_limit/:_offset', ProgramasController.getProgramas);

router.get('/estado/:_uf/:_limit/:_offset', ProgramasController.getProgramasPorEstado);

/**
 * @api {get} /programas/quantitativo/:_cod_ibge/:_uf/:_EMENDA/emenda/:_tipo/tipo Listar de localidade com emenda e tipo
 * @apiGroup Programas
 *
 * @apiParam {Number} cod_ibge COD_IBGE do usuario.
 * @apiParam {String} uf Unidade federativa.
 * @apiParam {String} EMENDA Se quer tipo de emenda.
 * @apiParam {String} tipo tipo do programa.
 *
 * @apiSuccess {json} status Listar de localidade com emenda e tipo
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
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
router.get('/quantitativo/:_cod_ibge/:_uf/:_EMENDA/emenda/:_tipo/tipo', ProgramasController.getQntProgramasPorEstado);


module.exports = router;
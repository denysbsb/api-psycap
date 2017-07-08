var express = require('express');
var router = express.Router();

var FavoritosController = require('../controllers/FavoritosController');

/**
 * @api {get} /favoritos/:_id Listar todos favoritos de usuário
 * @apiGroup Favoritos
 *
 * @apiParam {Number} id Identificador de usuário.
 *
 * @apiSuccess {json} status Listar todos favoritos de usuário
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "Success!"
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
router.get('/:_id', FavoritosController.getById);

/**
 * @api {post} /favoritos/ Cadastrar Favoritos no Parse serve
 * @apiGroup Favoritos
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "idUsuario": 123,
 *       "favoritos":[{idUsuario:123,tipo:1,idMunicipio:123}]
 *     }
 *
 * @apiSuccess {json} status Cadastrar Favoritos no Parse serve
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "Success!"
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
router.post('/', FavoritosController.create);

/**
 * @api {delete} /favoritos/ Excluir Favoritos no Parse serve
 * @apiGroup Favoritos
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "idUsuario": 123,
 *       "idMunicipio":123,
 *       "idUsuario":123,
 *       "tipo":123
 *     }
 *
 * @apiSuccess {json} status Excluir Favoritos no Parse serve
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "Success!"
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
router.delete('/', FavoritosController.remove);

module.exports = router;



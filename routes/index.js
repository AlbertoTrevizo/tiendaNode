var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/productos', db.getAllProductos);
router.get('/productos/:id', db.getSingleProducto);
router.post('/productos', db.createProducto);
router.put('/productos/:id', db.updateProducto);
router.delete('productos/:id', db.removeProducto);

router.get('/usuarios', db.getAllUsuarios);
router.get('/usuarios/:id', db.getSingleUsuario);
router.post('/usuarios', db.createUsuario);
router.put('/usuarios/:id', db.updateUsuario);
router.delete('usuarios/:id', db.removeUsuario);

router.get('/usuarios/:id/pedidos', db.getAllPedidos);
router.get('/usuarios/:idusr/pedidos/:idped', db.getSinglePedido);

module.exports = router;

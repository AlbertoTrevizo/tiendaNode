var express = require('express');
var router = express.Router();

var db = require('../queriesProductos');
var db2 = require('../queriesUsuarios');


router.get('/productos', db.getAllProductos);
router.get('/productos/:id', db.getSingleProducto);
router.post('/productos', db.createProducto);
router.put('/productos/:id', db.updateProducto);
router.delete('productos/:id', db.removeProducto);

router.get('/usuarios', db2.getAllUsuarios);
router.get('/usuarios/:id', db2.getSingleUsuario);
router.post('/usuarios', db2.createUsuario);
router.put('/usuarios/:id', db2.updateUsuario);
router.delete('usuarios/:id', db2.removeUsuario);


module.exports = router;

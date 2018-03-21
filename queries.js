var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/tienda';
var db = pgp(connectionString);

function getAllProductos(req, res, next) {
  db.any('select * from Productos')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Recuperados todos los Productos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleProducto(req, res, next) {
  var prodID = parseInt(req.params.id);
  db.one('select * from Productos where ID_Producto = $1', prodID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Solo un producto'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createProducto(req, res, next) {
  db.none('insert into Productos (Nombre, Precio)' +
      'values(${Nombre}, ${Precio})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Producto agregado'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateProducto(req, res, next) {
  var prodID = parseInt(req.params.id);
  db.none('update Productos set Nombre=$1, Precio=$2 where ID_Producto=$3',
    [req.body.Nombre, req.body.Precio, prodID])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Producto actualizado'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeProducto(req, res, next) {
  var prodID = parseInt(req.params.id);
  db.result('delete from Productos where ID_Producto = $1', prodID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `El producto ${result.rowCount} ha sido eliminado`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllUsuarios(req, res, next) {
  db.any('select * from Usuarios')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Recuperados todos los Usuarios'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleUsuario(req, res, next) {
  var usrID = parseInt(req.params.id);
  db.one('select * from Usuarios where ID_Usuario = $1', usrID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Solo un Usuario'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createUsuario(req, res, next) {
  db.none('insert into Usuarios (Nombre)' +
      'values(${Nombre})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Usuario agregado'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateUsuario(req, res, next) {
  var usrID = parseInt(req.params.id);
  db.none('update Usuarios set Nombre=$1 where ID_Usuario=$2',
    [req.body.Nombre, usrID])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Usuario actualizado'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeUsuario(req, res, next) {
  var usrID = parseInt(req.params.id);
  db.result('delete from Usuarios where ID_Usuario=$1', usrID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `El producto ${result.rowCount} ha sido eliminado`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllPedidos(req, res, next) {
  var usrID = parseInt(req.params.id);
  db.any('SELECT * from Pedidos where ID_Usuario=$1', usrID)
    .then(function (data) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          data
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSinglePedido(req, res, next) {
  var usrID = parseInt(req.params.idusr);
  var pedID = parseInt(req.params.idped);
  var Productos = [];
  db.one('SELECT ID_Pedido, Total, Iva, Sub_total from Pedidos where ID_Usuario=$1 AND ID_Pedido=$2', [usrID, pedID])
    .then(function (data) {
      db.any('SELECT ID_Producto as Prod, Cantidad, Importe from Entradas where ID_Pedido=$1', pedID)
        .then(function (entradas) {
          Productos = entradas;
          // console.log(Productos);
          for (var i = 0; i < entradas.length; i++) {
            console.log(Productos[i].prod);
            entradas[i].prod = db.one('SELECT Nombre, Precio from Productos where ID_Producto=$1', Productos[i].prod)
              .then(function (producto) {
                // data['Prods'] = entradas;
                res.status(200)

              })
              .catch(function (err) {
                return next(err);
              });
          }
          data['Prods'] = entradas
          res.status(200)
            .json({
              data
            });
        })
        .catch(function (err) {
          return next(err);
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllProductos: getAllProductos,
  getSingleProducto: getSingleProducto,
  createProducto: createProducto,
  updateProducto: updateProducto,
  removeProducto: removeProducto,
  getAllUsuarios: getAllUsuarios,
  getSingleUsuario: getSingleUsuario,
  createUsuario: createUsuario,
  updateUsuario: updateUsuario,
  removeUsuario: removeUsuario,
  getAllPedidos: getAllPedidos,
  getSinglePedido: getSinglePedido
};

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

module.exports = {
  getAllProductos: getAllProductos,
  getSingleProducto: getSingleProducto,
  createProducto: createProducto,
  updateProducto: updateProducto,
  removeProducto: removeProducto
};

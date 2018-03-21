var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/tienda';
var db = pgp(connectionString);

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

module.exports = {
  getAllUsuarios: getAllUsuarios,
  getSingleUsuario: getSingleUsuario,
  createUsuario: createUsuario,
  updateUsuario: updateUsuario,
  removeUsuario: removeUsuario
};

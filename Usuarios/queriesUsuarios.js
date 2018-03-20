var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/tienda';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllUsuarios: getAllUsuarios,
  getSingleUsuario: getSingleUsuario,
  createUsuario: createUsuario,
  updateUsuario: updateUsuario,
  removeUsuario: removeUsuario
};

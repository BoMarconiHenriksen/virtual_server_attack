var mongoose = require('mongoose');
require("..//dbSetup.js")();
var db = mongoose.connection;
var users = require('../models/User.js');
var User = mongoose.model('User', users.UserSchema);
//require('mongoose').set('debug',true)

function addUser(userName, firstName, lastName, secret, userRole, password, email) {

  var userDetail = {
    userName: userName,  
    firstName: firstName,
    lastName: lastName,
    secret: secret,
    userRole: userRole,
    password: password,
    email: email,
  };

  return User.create(userDetail); // returner et promise.

};

function getAllUsers() {
  return User.find({})
};

function findByUserName(username) {
  return User.findOne({
    userName: username
  }).exec();
};

function findById(id) {
  return User.findById({
    _id: id
  });
};

function deleteUser(_id) {
  User.findByIdAndDelete({_id: _id});
  //User.findByIdAndDelete(_id);

  return User.findByIdAndDelete({_id:_id});
};

// VIRKER IKKE! Update user - Mangler test.
function updateUser(user) {
  console.log(user._id);
  return User.findByIdAndUpdate( user._id, user, {new: true} ).exec();
}

module.exports = {
  getAllUsers: getAllUsers,
  addUser: addUser,
  findByUsername: findByUserName,
  findById: findById,
  deleteUser: deleteUser,
  updateUser: updateUser
};
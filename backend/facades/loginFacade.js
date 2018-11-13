var mongoose = require('mongoose');
require("..//dbSetup.js")();
var db = mongoose.connection;
var users = require('../models/User.js');
var User = mongoose.model('User', users.UserSchema);

async function login(userName, password) {
    let user = await User.findOne({
        'userName': userName
    });

    if (user.password === password) {
        return user;

    } else {
        return {
            friends: "wrong username or password",
            status: 403
        };
    };
};
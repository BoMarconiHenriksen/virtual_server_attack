require("./dbSetup.js")();
var mongoose = require('mongoose');
var db = mongoose.connection;
var User = require("./models/User.js");

// To make sample data write in the terminal: node makeSampleData.js

const userlist = [{
        userName: 'hj',
        firstName: 'Hanne',
        lastName: ' Jensen',
        secret: '',
        userRole: 'user',
        password: 'hanne67',
        email: 'hj@hotmail.com',
    },
    {
        userName: 'js',
        firstName: 'John',
        lastName: 'Severinsen',
        secret: '',
        userRole: 'admin',
        password: 'test123',
        email: 'js@gmail.com',
    },
    {
        userName: 'bg',
        firstName: 'Brandy',
        lastName: 'Gregory',
        secret: '',
        userRole: 'dba',
        password: 'as1',
        email: 'bg@mail.me',
    },
    {
        userName: 'jbar',
        firstName: 'Jim',
        lastName: ' Barfod',
        secret: '',
        userRole: 'user',
        password: 'test1',
        email: 'barfod@gmail.com',
    },
];

// Here we will setup users
async function createUsers() {
    await User.deleteMany({});
    return await db.collection('users').insertMany([
        userlist[0], userlist[1], userlist[2], userlist[3]
    ]); //use foreach if more testdata needed
};

createUsers();

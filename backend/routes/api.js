var express = require('express');
var router = express.Router();
const userFacade = require('../facades/userFacade')
const loginFacade = require('../facades/loginFacade')
// https://scotch.io/@401/mongodb-injection-in-nodejs
// https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html
// https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d
// http://scottksmith.com/blog/2015/06/22/secure-node-apps-against-owasp-top-10-cross-site-scripting/

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

// Get all users.
router.get('/users', async function (req, res, next) {
    try {
        let users = await userFacade.getAllUsers();

        res.json({
            status: 'Success',
            data: users
        });

    } catch (err) {
        res.json({
            status: 'Error',
            data: err
        });
    }
});

// Find user by name.
router.get('/user/:userName', async function (req, res, next) {
    try {
        let user = await userFacade.findByUsername(req.params.userName);

        if (user != null) {
            res.json({
                status: 'Success',
                data: user
            });
        } else {
            // In an API, this can also mean that the endpoint is valid but the resource itself does not exist. 
            res.status(404).json({
                status: 'User does not exist',
                data: user
            });
        };

    } catch (err) {
        res.json({
            status: 'Error',
            data: err
        });
    };
});

// Find user by id. Ingen test da vi hele tiden får nyt id, og vi ikke kan bruge async await.
router.get('/user_id/:_id', async function (req, res, next) {
    try {
        let user = await userFacade.findById(req.params._id);

        if (user != null) {
            res.json({
                status: 'Success',
                data: user
            });
        } else {
            // In an API, this can also mean that the endpoint is valid but the resource itself does not exist. 
            res.status(404).json({
                status: 'User does not exist',
                data: user
            });
        };

    } catch (err) {
        res.json({
            status: 'Error',
            data: err
        });
    };
});

// New user. 
router.post('/user', async function (req, res, next) {
    try {
        const newUser = req.body;
        await userFacade.addUser(newUser.firstName, newUser.lastName, newUser.userName, newUser.password, newUser.email, newUser.type, newUser.company, newUser.companyUrl);

        // Returns the new user for test.
        let user = await userFacade.findByUsername(newUser.userName);

        // 201 = created.
        res.status(201).json({
            status: 'Success',
            data: user
        });
    } catch (err) {
        res.json({
            status: 'Error',
            data: err
        });
    };

});

// delete user
/* router.delete('/user/:_id', async function (req, res, next) {

                const id = req.params._id;

                await userFacade.deleteUser(id);
                try {
                    // If user does not exist send a messege to the client.
                    if (res.status(404)) {
                        res.json({
                            status: 'User does not exist.'
                        });
                    } else {
                        res.json({
                            status: 'Success'
                        });
                    };
                } catch (err) {
                    res.json({
                        status: 'Error',
                        data: err
                    });
                }; */

// Login route.
router.post('/login', async function (req, res, next) {
    try {
        let loginUser = await loginFacade.login(req.body.userName, req.body.password, req.body.longitude, req.body.latitude, req.body.distance);
        let responseObk = res.json(loginUser)

        // If user or password does not exist send a messege to the client.
        if (res.status(403)) {
            res.json({
                status: 'User name or password is invalid.'
            });
        } else {
            res.render('login', {
                title: 'login',
                friends: 'friends:' + responseObk
            });
        };
    } catch (err) {
        res.json({
            status: 'Error',
            data: err
        });
    };
});

module.exports = router;
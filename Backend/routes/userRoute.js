// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const authorise = require('../middleware/auth')
// const {register ,login} =require('../controllers/UserControllers')



// router.post('/adduser',register);
// router.post('/login',authorise.auth,login);



// module.exports = router;
const express = require('express');
const userController = require('../controllers/UserControllers');
const authorize = require('../middleware/auth')
const router = express.Router();

// User routes  (Register, Login, Get User Info)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/getUserInfo',authorize.auth, userController.getUserInfo);


module.exports = router;


//http://localhost:5000/api/auth/register
//http://localhost:5000/api/auth/login
//http://localhost:5000/api/auth/getUserInfo
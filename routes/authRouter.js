const express = require('express');
const authRouter = express.Router();
const path = require('path')
// const {registeredHomes} = require('./hostRouter')
const auth = require('../controllers/authController')

authRouter.get('/login', auth.getLogin);
authRouter.post('/logged', auth.postLoggedIn)
authRouter.post('/logout',auth.postLoggedOut)
authRouter.get('/signup', auth.getSignUp)
authRouter.post('/signup', auth.postSignUp)


module.exports = authRouter;


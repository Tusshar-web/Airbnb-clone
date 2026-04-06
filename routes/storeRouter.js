const express = require('express');
const storeRouter = express.Router();
const path = require('path')
// const {registeredHomes} = require('./hostRouter')
const home = require('../controllers/storeController')

storeRouter.get('/',home.getIndex)
storeRouter.get('/store/booking',home.getBookings)
storeRouter.get('/store/home-list',home.getHome)
storeRouter.get('/store/fav-list',home.getFav)
storeRouter.get('/store/home-detail/:homeid', home.getHomeDetails)
storeRouter.post('/store/add-fav/:homeId',home.postAddfav)
storeRouter.post('/store/remove-fav/:homeId',home.postRemovefav)



module.exports = storeRouter;


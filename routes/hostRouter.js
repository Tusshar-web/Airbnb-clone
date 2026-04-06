const express = require('express')
const hostRouter = express.Router();
const path = require('path')
const homesController = require('../controllers/hostController')

hostRouter.get('/host/add-home', homesController.getAddHome)
hostRouter.post('/host/add-home', homesController.postAddhome)
hostRouter.get('/host/host-home-list', homesController.getHostHome)
hostRouter.get('/host/edit-home/:homeId', homesController.getEditHome)
hostRouter.post('/host/edit-home',homesController.postEditHome)
hostRouter.post('/host/delete-home/:homeId',homesController.postDeleteHome)

exports.hostRouter = hostRouter;

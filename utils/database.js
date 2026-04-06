// const dns = require('dns');
// dns.setDefaultResultOrder('ipv4first');
// dns.setServers(['8.8.8.8', '1.1.1.1']);
// const { MONGO_URL} = require('../utils/config')
// const { MongoClient } = require('mongodb');

// let _db;

// const mongoConnect = (callback) => {
//     MongoClient.connect(MONGO_URL, {
//         tls: true,
//         serverSelectionTimeoutMS: 5000,
//     })
//     .then(client => {
//         _db = client.db('airbnb')
//         callback();
//     })
//     .catch(err => {
//         console.log("Error while connecting:", err.message);
//     });
// };

// const getDb = () =>{
//     if(!_db) {
//         throw new Error("MongoDb not connected")
//     }
//     return _db;
// }
// exports.getDb = getDb;
// exports.mongoConnect = mongoConnect;
// exports.MONGO_URL = MONGO_URL

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

// ALL other imports below
const express = require('express');
// ...etc
const { MONGO_URL } = require('../utils/config');
const { MongoClient } = require('mongodb');

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(MONGO_URL, {
        tls: true,
        serverSelectionTimeoutMS: 10000, // give it more time
        family: 4, // force IPv4
    })
    .then(client => {
        _db = client.db('airbnb');
        console.log('Connected to MongoDB!');
        callback();
    })
    .catch(err => {
        console.log("Error while connecting:", err.message);
    });
};

const getDb = () => {
    if (!_db) throw new Error("MongoDB not connected");
    return _db;
};

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
exports.MONGO_URL = MONGO_URL;
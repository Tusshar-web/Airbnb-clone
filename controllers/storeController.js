const path = require('path')
const Home = require('../models/home');
const Favourite = require('../models/fav');
// const storeRouter = require('../routes/storeRouter')

const getAddHome = (req,res,next)=> {
    res.render('host/edit-home',{
        isLoggedIn : req.isLoggedIn,
        user : req.session.user,
    })
}

exports.getAddHome = getAddHome;
  
exports.postAddhome = (req, res, next) => {
    const {houseName,price,location,rating,photo,description} =req.body
    const home = new Home({
        houseName,
        price,
        location,
        rating,
        photo,
        description
    }
    );
    home.save()
        .then(() => res.render('host/home-added', {
            isLoggedIn : req.isLoggedIn,
            user : req.session.user,
        }))
        .catch(err => next(err)); 
}

exports.getHome = (req,res,next)=> {
     Home.find().then(registeredHomes => {
     res.render('store/home-list', {
        registeredHomes : registeredHomes, 
        isLoggedIn : req.isLoggedIn,
        user : req.session.user,
    })});
}

exports.getBookings = (req,res,next)=> {
    Home.find().then(registeredHomes => {
     res.render('store/booking', {
        registeredHomes : registeredHomes, 
        isLoggedIn : req.isLoggedIn,
        user : req.session.user,
    })});
}

exports.getIndex = (req,res,next)=> {
    console.log("Session value : " , req.session)
    Home.find().then(registeredHomes => {
        res.render('store/index', {
            registeredHomes : registeredHomes, 
            isLoggedIn : req.isLoggedIn,
            user : req.session.user,
        })
    })   
}

exports.getFav = (req, res, next) => {
    Favourite.find()
        .then(favourites => {
            return Home.find().then(registeredHomes => {
                const favouriteHomes = registeredHomes.filter((home) =>
                    favourites.some(fav => fav.homeId && fav.homeId.toString() === home._id.toString())
                );
                res.render('store/fav-list', { 
                    favHomes: favouriteHomes , 
                    isLoggedIn : req.isLoggedIn,
                    user : req.session.user,
                });
            });
        })
        .catch(err => next(err));
}

exports.getHomeDetails = (req, res, next) => {
    const homeid = req.params.homeid;
    Home.findById(homeid)
        .then(home => {
            if (!home) return res.redirect('/store/home-list');
            res.render('store/home-detail', { 
                home: home,
                isLoggedIn : req.isLoggedIn,
                user : req.session.user,
            });
        })
        .catch(err => next(err));  // ← this forwards the error properly
}


exports.postAddfav = (req, res, next) => {
    const homeId = req.params.homeId;
    const fav = new Favourite({homeId : homeId});
    fav.save()
        .then(() => res.redirect('/store/fav-list', )) // ✅ leading slash
        .catch(err => next(err));
}


exports.postRemovefav = (req, res, next) => {
    const homeId = req.params.homeId;
    Favourite.findOneAndDelete({homeId :homeId})
        .then(result => {
            console.log("Removed from favourites", result);
            res.redirect('/store/fav-list');
        })
        .catch(err => next(err));
}




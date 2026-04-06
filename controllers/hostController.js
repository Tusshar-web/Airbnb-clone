// const path = require('path')
const Home = require('../models/home')

exports.getAddHome = (req, res, next) => {
res.render("host/edit-home",{
     editing: false,
     isLoggedIn : req.isLoggedIn,
     user : req.session.user,
    });
};


exports.postAddhome = (req,res,next)=> {
    console.log("Your home has been registered successfully:")
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
    })
)
    .catch(err => next(err));
}   

exports.getHostHome = (req,res,next)=> {
     Home.find().then(registeredHomes => {
     res.render('host/host-home-list', {
        registeredHomes : registeredHomes, 
        isLoggedIn : req.isLoggedIn,
        user : req.session.user,
    })});
}

exports.getEditHome = (req,res,next) => {
    const homeId = req.params.homeId
    const editing = req.query.editing === 'true';
    Home.findById(homeId).then(home => {
        if(!home) {
            console.log("Home not found for editing");
            res.redirect("/host/host-home-list")
        }else {
             console.log(homeId,editing)
    res.render('host/edit-home',{
        home : home, 
        editing: editing,
        isLoggedIn : req.isLoggedIn,
        user : req.session.user,
    })
        }
    })
}



exports.postEditHome = (req, res, next) => {
    const {id,houseName,price,location,rating,photo,description} =req.body
    Home.findById(id).then((home)=> {
        home.houseName=houseName;
        home.price=price;
        home.location=location;
        home.rating=rating;
        home.photo=photo;
        home.description=description
    home.save().then((result)=> {
        console.log('Home edited successfully ', result)
    }).catch(err => {
        console.log("Error while updating ",err);
    })
    res.redirect("/host/host-home-list")
    })
    .catch(err => {
        console.log("Error while updating ",err)
    })
};

exports.postDeleteHome = (req,res,next) => {
    const homeId = req.params.homeId;
    console.log("came to delete home id ", homeId)
    Home.findByIdAndDelete(homeId)
    .then(()=> {
        res.redirect("/host/host-home-list")
    }).catch(err => {
        console.log("Error while deleteing ",err)
    })
}

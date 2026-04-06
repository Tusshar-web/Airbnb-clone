// const path = require('path')
exports.err =(req,res,next)=> {
    res.status(404)
    res.render('404',{
        isloggedIn : req.session.isLoggedIn,
        user : req.session.user,
    })
}
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : [true, 'First name is required']
    },
    lastname : {
        type : String,
    },
    email : {
        type : String,
        required :[true, 'Email is required']
    },
    password : {
        type : String,
        required : [true, 'Password is required']
    },
    usertype : {
        type : String,
        enum : ['guest', 'host'],
        default : 'guest'
    }
})



module.exports = mongoose.model('User',userSchema)

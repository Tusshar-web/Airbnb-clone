const bcrypt = require('bcryptjs')
const { validationResult, check } = require("express-validator");
const User = require('../models/user')

exports.getLogin = (req,res,next) => {
    res.render('auth/login', {
        isLoggedIn : req.session.isLoggedIn,
        user : {}
    })
}


exports.postLoggedIn =  async (req,res,next) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        res.status(422).render('auth/login',{
            isLoggedIn : false,
            error:["Incorrect email !"],
            oldInput:{email},
            user : {}
        })
    } 

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        res.status(422).render('auth/login', {
            isLoggedIn : false,
            error : ["Incorrect Password. Please try again !"],
            user : {}
        })
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    res.redirect('/')
    
}

exports.postLoggedOut = (req,res,next)=> {
    req.session.destroy(()=> {
        res.redirect('/login')
    })   
}

exports.getSignUp = (req,res,next) => {
    res.render('auth/signup', {
        isLoggedIn : req.session.isLoggedIn,
        error: [],
        oldInput: { firstname: '', lastname: '', email: '', password: '', usertype: 'guest' },
        user : {}
    })
}

exports.postSignUp = [
    check('firstname')
    .notEmpty()
    .withMessage('First name cannot be empty')
    .trim()
    .isLength({min : 2})
    .withMessage('First name should be atleast 2 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters'),

    check('lastname')
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage('Last name can only contain letters'),

    check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

    check('password')
    .isLength({min : 8})
    .withMessage('Your password should atleast be 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password should have atleast have one lowercasse character')
    .matches(/[A-Z]/)
    .withMessage('Password should have atleast have one upppercasse character')
    .matches(/[0-9]/)
    .withMessage('Password should have atleast have one number')
    .trim(),

    check('confirm_password')
    .trim()
    .custom((value, {req})=> {
        if(value !== req.body.password) {
            throw new Error('Password does not match')
        }
        return true
    }),

    check('usertype')
    .notEmpty()
    .withMessage('PLease enter a user type')
    .isIn(['guest', 'host'])
    .withMessage('Invalid user type'),

    check('terms')
    .notEmpty()
    .withMessage('You must accept the terms and condition')
    .custom((value,{req}) => {
        if(value !== 'on') {
            throw new Error('Accept the terms and conditions first')
        }
        return true
    }),

    (req,res,next) => {
    const {firstname,lastname,email,password,usertype} = req.body
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).render('auth/signup', {isLoggedIn : false,
            error : error.array().map(err => err.msg),
            oldInput : {firstname,lastname,email,password,usertype},
            user : {}
        })
    }

    bcrypt.hash(password,12)
    .then(hashedPassword=> {
        const user = new User({
        firstname : firstname,
        lastname : lastname,
        email : email,
        password : hashedPassword,
        usertype : usertype
        });
        return user.save()
    }) 
    .then(()=> {
        res.redirect('/login')
    }).catch(err => {
        return res.status(422).render('auth/signup', {isLoggedIn : false,
            error : [err.message],
            oldInput : {firstname,lastname,email,password,usertype},
            user : {}
        })
    })
}]
// MUST BE ABSOLUTE FIRST - before any imports
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo');        
const path = require('path')
const app = express()
const storeRouter = require('./routes/storeRouter')
const authRouter = require('./routes/authRouter')
const {hostRouter} = require('./routes/hostRouter')
const error = require('./controllers/errors')
const mongoose = require('mongoose')               
const cookieParser = require('cookie-parser')
const { MONGO_URL, PORT, SESSION_SECRET } = require('./utils/config')
const multer = require('multer')

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to database");

        app.use(session({
            secret: SESSION_SECRET, 
            resave: false,
            saveUninitialized: false,                       
            store: MongoStore.create({                   
                mongoUrl: MONGO_URL,
                collectionName: 'sessions'
            }),
            cookie: { maxAge: 1000 * 60 * 60 * 24 }       
        }))

        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.set('views', 'views');

        app.use((req, res, next) => {
            req.isLoggedIn = req.session.isLoggedIn;
            res.locals.isLoggedIn = req.session.isLoggedIn;
            next()
        })

        const randomString = (length)=> {
            const characters = "abcdefghijklmnopqrstuvwxyz";
            let result = '';
            for(let i = 0; i< length;i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length))
            }
            return result
        }

        const storage = multer.diskStorage({
            destination:(req,file,cb)=> {
                cb(null,'uploads/')
            },
            filename: (req,file,cb)=> {
                cb(null, randomString(10) + '-' + file.originalname )
            }
        })

        const fileFilter = (req,file,cb)=> {
            if(file.mimetype === "image/png"
            || file.mimetype === "image/jpg"
            || file.mimetype === "image/jpeg"
            ) {
                cb(null,true)
            } else {
                cb(null,false)
            }
        }

        const multerOptions = {
            storage , fileFilter
        }

        app.use(express.static(path.join(__dirname, 'public')))
        app.use("/uploads",express.static(path.join(__dirname, 'uploads')))
        app.use("/host/uploads",express.static(path.join(__dirname, 'uploads')))
        app.use(express.urlencoded({ extended: false }))
        app.use(multer(multerOptions).single('photo'))
        app.use(authRouter);
        app.use(storeRouter);
        app.use('/host', (req, res, next) => {
            if (req.isLoggedIn) {
                next()
            } else {
                res.redirect('/login')
            }
        })
        app.use(hostRouter);
        app.use(error.err)

        app.listen(PORT, () => {
            console.log(`Your server is successfully running at http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        console.log("Error while connecting to db", err)
    })
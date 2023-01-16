//*********************** REQUIREMENTS *****************************/
const express = require('express')
const config = require('./config')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const mongodump = require('node-mongotools')

require('app-module-path').addPath(__dirname)

require('dotenv').config()
//********************* SET CONFIGURATIONS **************************/
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/NodeDB')
  .then(() => console.log('Connected!'))

app.use(express.static(__dirname+'/public'))
global.config = require('./config')
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.use(methodOverride('method'))

app.use(cookieParser(process.env.COOKIE_SECRET))


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie : {expires : new Date(Date.now() + (1000 * 3600 * 24 * 100)) ,
              store   : MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/NodeDB' })
             }
}))  

app.use(flash())  

require('./passport/passport-local')
app.use(passport.initialize())
app.use(passport.session())


//************************ END OF CONFIGURATIONS *******************/

app.use((req,res,next)=>{
    res.locals = {errors : req.flash("errors"), req : req}
    next()
})

app.get('/' , (req,res)=>{
    res.render('index')
 
})

app.use('/', require('./routes/0index'))

app.listen(config.port, () =>{
    console.log(`Server is running on port ${config.port}`)
})

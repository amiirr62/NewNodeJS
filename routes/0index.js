const express = require('express')
const { body } = require('express-validator')
const { route } = require('./user')
const router = express.Router()
const homeController = require('../controllers/homeController')

router.use('/user', require('./user'))
router.use('/auth', require('./auth'))
router.use('/dashboard', require('./dashboard'))

   
// Logout
router.get('/logout', function(req, res, next) {
    
    // destroy session data
   // req.session = null
    // remove the req.user property and clear the login session
    req.logout()
      
  
    // redirect to homepage
    res.redirect('/')
    next()
  })

  router.get('/paycallback', homeController.paycallback)


/* router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')
}) */



router.all('*', async(req,res,next)=>{
    
    try {
     let err = new Error('Not Available Route')
     err.status = 404
     throw err   
    } catch (err) {
        next(err)
    }
})

router.use(async(err,req,res,next)=>{
    const code = err.status || 500
    const message = err.message || ""
    const stack = err.stack || ""

if (config.debug){
    return res.render('error/developer',{message , stack})
}else{
    return res.render('error/user',{code , message})
}

})

module.exports = router
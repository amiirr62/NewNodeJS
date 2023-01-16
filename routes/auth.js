const express = require('express')
const router = express.Router()


const authController = require('../controllers/authController')
const dashboardController = require('../controllers/dashboardController')
const userController = require('../controllers/userController')

const authValidator = require('../validators/authValidator')

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/dashboard ')
    }
   next()
})

//************************* START OF SEE ALL USERS ********************** */
router.get('/', dashboardController.index)

router.get('/login',authController.loginForm)
router.get('/register',authController.registerForm)



router.post('/login', authValidator.login() ,authController.login)
router.post('/register', authValidator.register() ,authController.register)



//********************************** END OF Routes *************************************** */

module.exports = router
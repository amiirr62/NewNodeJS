const express = require('express')
const router = express.Router()


const dashboardController = require('../controllers/dashboardController')
const editUserValidator = require('../validators/editUserValidator')
const UploadUserProfile = require('../upload/uploadUserProfile')
const { route } = require('./user')


router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
})

//************************* START OF SEE ALL USERS ********************** */
router.get ('/',dashboardController.index)
router.post ('/pay',dashboardController.pay)
 
router.post('/edituser', UploadUserProfile.single('img') , (req,res,next)=>{
    if (!req.file){
        req.body.img = null
    }else{
        req.body.img = req.file.filename
    }
    next()
} , editUserValidator.handle() ,dashboardController.edituser)



//********************************** END OF Routes *************************************** */

module.exports = router
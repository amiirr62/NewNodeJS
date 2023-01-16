const express = require('express')
const router = express.Router()


const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const authValidator = require('../validators/authValidator')


//*************START OF SEE ALL USERS *********** */
router.get('/',authController.loginForm)
router.get('/',authController.registerForm)



router.post('/',authController.login)
router.post('/',authController.register)



//********************************** END OF Routes *************************************** */

module.exports = router
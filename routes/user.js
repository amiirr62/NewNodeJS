const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()


const userController = require('../controllers/userController')
const userValidator = require('../validators/userValidator')


//*************START OF SEE ALL USERS *********** */
router.get('/',userController.getAllUsers.bind(userController))

//*************START OF SEE 1 USER *********** */
 router.get('/:id', userController.seeOneUser.bind(userController))
  
//*************START OF POST *********** */
router.post('/', userValidator.handle(), userController.createUser.bind(userController))

//*************START OF UPDATE *********** */
router.put('/:id', userController.updateUser.bind(userController))

//*************START OF DELETE *********** */
router.delete('/:id', userController.deleteUser.bind(userController) )

//********************************** END OF Routes *************************************** */

module.exports = router
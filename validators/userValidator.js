const { body } = require('express-validator')
let validator = require('./validator')


module.exports = new class userValidator extends validator {

    handle(){
        return [ body('email', 'Email is not Valid!!!').isEmail(),
        body('password', 'Min length is 5 letters!!!').isLength({ min: 4 }) ]
    }
}

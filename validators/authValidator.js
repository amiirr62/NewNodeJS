const { body } = require('express-validator')
let validator = require('./validator')


module.exports = new class authValidator extends validator {

    register(){
        return [ 
        
        body('name', 'Name was not entered!!').not().isEmpty(),
        body('email', 'Email is not Valid!!!').isEmail(),
        body('password', 'Min length is 5 letters!!!').isLength({ min: 5 }) 
        ]
    }

    login(){
        return [ 
        
        body('email', 'Email is not Valid!!!').isEmail(),
        body('password', 'Min length is 5 letters!!!').isLength({ min: 4 }) 
        ]
    }
}

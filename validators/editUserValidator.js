const { body } = require('express-validator')
let validator = require('./validator')
const path = require('path')


module.exports = new class editUserValidator extends validator {

    handle(){
        return [ 
            body('name', 'Please Enter the Name').not().isEmpty(),
            body('img', 'No Photo was uploaded!!!').not().isEmpty(),
            body('img').custom(async value => {
                if(!value){
                    return
                }
                if(!['.jpg','.jpeg','.png','.tif'].includes(path.extname(value))){
                    throw new Error('Your photo extension in not Valid!!!')
                }
           
            })
        ]
}
}
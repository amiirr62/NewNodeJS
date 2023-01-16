
const { raw } = require('express')
const { body, validationResult } = require('express-validator')
const User = require('models/user')
const Payment = require('models/payment')

let controller = require('./controller')


class homeController extends controller{
       
    async paycallback(req,res,next){
      try {
       if(req.query.Status && req.query.Status !=='OK'){
        return res.send('Unsuccessful Transaction')
       }
        
      } catch (err) {
            next(err)
      }
    }

    
}


module.exports = new homeController
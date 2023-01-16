
const { raw } = require('express')
const { body, validationResult } = require('express-validator')
const User = require('models/user')
const Payment = require('models/payment')
const axios = require('axios')
let controller = require('./controller')


class dashboardController extends controller{
       
    async index(req,res,next){
      try {
       res.render('dashboard/index')
        
      } catch (err) {
            next(err)
      }
    }

    async pay (req,res,next){
      try {
       let params = {
        MerchantID : '6cded376-3063-11e9-a98e-005056a205be',
        Amount : req.body.amount,
        CallbackURL : "http://localhost:3000/paycallback",
        Description : "Increase Credit Balance"
       }
        const response = await axios.post("https://api.zarinpal.com/pg/v4/payment/request.json`", params)
        console.log(response)
        if (response.data.Status == 200) {
          let newPayment = Payment({
            user : req.body.user,
            resnumber : response.data.Authority,
            amount : req.body.amount
          })
          await newPayment.save()
          res.redirect(`https://www.zarinpal.com/pg/StartPay/${response.data.Authority}`)

        }else res.redirect('/dashboard')
      } catch (err) {
            next(err)
      }
    }

       
    async edituser(req,res,next){
      try {
        const errors = validationResult(req)
              if (!errors.isEmpty()){      
              let myErrors = errors.array().map(err => err.msg)        
                req.flash('errors', myErrors)     
                return res.redirect('/dashboard') } 

        let data = {
          name : req.body.name,
        }
        if(req.file){
          data.img = req.file.path.replace(/\\/g,'/').substring(6)
        }
        
        await User.updateOne({_id : req.user.id}, {$set : data})
        res.redirect('/dashboard')
      }
      
      catch (err) {
            next(err)
      }
    }
}


module.exports = new dashboardController
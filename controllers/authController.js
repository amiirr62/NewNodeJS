
const { body, validationResult } = require('express-validator')
const User = require('models/user')
const passport = require('passport')
const Recaptcha = require('express-recaptcha').RecaptchaV2
const options = { hl: 'en' }
const recaptcha = new Recaptcha('6Lc-gNwjAAAAAH2rmuEd2ypnEuvN5QtO5aWbQQGd',
                       '6Lc-gNwjAAAAAJGbR5olUnYXfIkhqj56rX_VflJl', options)

let controller = require('./controller')

class authController extends controller{
       
    async registerForm(req,res,next){
      try {
       res.render('auth/register',{recaptcha : recaptcha.render()})  
       
       
      } catch (err) {
            next(err) }
      }

    async loginForm(req,res,next){
        try {
            res.render('auth/login')  
          
        } catch (err) {
              next(err)
        }
      }

      async register(req,res,next){
        try {
              /* let recaptchaResult = await new Promise((resolve,reject)=>{

                recaptcha.verify(req,(err,data)=>{
                  if(err){
                    req.flash('errors','PLZ Verify You are not a ROBOT!!!')
                    res.redirect("/auth/register")
                    resolve(false)
                  }else{
                    resolve(true)
                  }
                }) */

              /* })   */
          /* if (!recaptchaResult){
            return
          } */
          
            const errors = validationResult(req)

            if (!errors.isEmpty()){   
              let myErrors = errors.array().map(err => err.msg)          
                req.flash('errors', myErrors)     
                return res.redirect('/auth/register') } 
         
            passport.authenticate('local.register',{
              successRedirect : '/dashboard',
              failureRedirect : '/auth/register',
              failureFlash : true

            })(req,res,next)
          
        } catch (err) {
              next(err)
        }
      }

    async login(req,res,next){
        try {
            const errors = validationResult(req)
              if (!errors.isEmpty()){      
              let myErrors = errors.array().map(err => err.msg)        
                req.flash('errors', myErrors)     
                return res.redirect('/auth/login') } 
                
                passport.authenticate('local.login', (err,user)=>{
                  if(!user) return res.redirect('/auth/login')

                  req.logIn(user, err=>{
                    return res.redirect('/dashboard')
                  })
                })(req,res,next)
                
          
        } catch (err) {
              next(err)
        }
      }
}
    
module.exports = new authController
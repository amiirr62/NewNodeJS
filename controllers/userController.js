
const { body, validationResult } = require('express-validator')
const User = require('models/user')

let controller = require('./controller')


class userController extends controller{
       
    async getAllUsers(req,res,next){
      try {
        let users = await User.find({})
        res.render('users' , {users : users , 
                              title : 'The Entire Users', 
                              errors : req.flash('errors') , 
                              message : req.flash('message')}
                  )
        
      } catch (err) {
            next(err)
      }
    }

    async seeOneUser(req,res,next){
        try {
            let user = await User.findById(req.params.id)
            res.render('user' , {user:user})
        } catch (err) {
            next(err)
        }
    }

    async createUser(req,res,next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty())
            {      
            let myErrors = errors.array().map(err => err.msg)        
            req.flash('errors', myErrors)     
            return res.redirect('/auth/login')} 

    req.body.id = parseInt(req.body.id)
    
    let newUser = new User({
        first_name : req.body.first_name,
        email : req.body.email,
        password : req.body.password
    })
    await newUser.save()
    req.flash('message','User Successfully Created!!')
        
    res.redirect('/user')
        } catch (err) {
            next(err)
        }
    }

    async updateUser(req,res,next){
        try {
            await User.updateMany({_id : req.body.id},{$set : req.body})
        req.flash('message','User Successfully Updated!!')
        res.redirect('/user')
        console.log(`${this.fname} ${this.lname}`)
        } catch (err) {
            next(err)
        }
    }

    async deleteUser(req,res,next){
        try {
            await User.deleteOne({_id:req.params.id})
         
         req.flash('message','User Successfully Deleted!!')
         res.redirect('/user')
        } catch (err) {
            next(err)
        }
     }

    }


module.exports = new userController
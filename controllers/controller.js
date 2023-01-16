
class Controller {
    
    constructor(){
        this.fname = 'Hamid',
        this.lname = 'Far',
        this.age = 30
    }

    error(message , status = 500){
        let err = new Error (message)
        err.status = status
        throw err
    }
}

module.exports = Controller
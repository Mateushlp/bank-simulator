const Account = require("./Account")

module.exports = class User{
    constructor(nome, email) {
        this.nome = nome
        this.email = email
        this.account = new Account(0, this)
            
        
    }
    
}
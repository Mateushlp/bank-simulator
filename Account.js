const Deposit = require("./Deposit");
const Loan = require("./Loan");
const Transfer = require("./Transfer");

module.exports = class Account {
  #balance;

  constructor(balance, owner) {
    this.#balance = balance;
    this.deposits = [];
    this.loans = [];
    this.transfers = [];
    this.owner = owner;
    }
    
    get balance() {
        return this.#balance;
        
    }

     deposit(valor) {
         const novoDeposito = new Deposit(valor)
         this.deposits.push(novoDeposito)
         this.#balance +=valor
    }

    loan(valor, numeroDeParcelas) {
        const novoemprestimo = new Loan(valor, numeroDeParcelas)
        this.loans.push(novoemprestimo)
        this.#balance += novoemprestimo.valor
    }
    
    transfer(usuario, valor) {
        this.#balance -= valor
        usuario.account.deposit(valor)
        const novaTransferencia = new Transfer(this.owner, usuario, valor)
        this.transfers.push(novaTransferencia)
    }
};

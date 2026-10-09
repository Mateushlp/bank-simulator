import Deposit from "./Deposit.js";
import Loan from "./Loan.js";
import Transfer from "./Transfer.js";

export default class Account {
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

    Loan(valor, numeroDeParcelas) {
        if (valor <= 0) {
             throw new Error("O valor do empréstimo deve ser maior que zero");
        }
         if (numeroDeParcelas <= 0) {
           throw new Error("O número de parcelas deve ser maior que zero");
         }

        const novoemprestimo = new Loan(valor, numeroDeParcelas)
        this.loans.push(novoemprestimo)
        this.#balance += novoemprestimo.valor
    }
    
    transfer(usuario, valor) {

         if (valor <= 0) {
           throw new Error("O valor da transferência deve ser maior que zero");
         }
        if (valor > this.#balance) {
            throw new Error("Saldo insuficiente para realizar a transferência");
        } else {
       
        
            this.#balance -= valor
            usuario.account.deposit(valor)
            const novaTransferencia = new Transfer(this.owner, usuario, valor)
            this.transfers.push(novaTransferencia)
        }
    }
};

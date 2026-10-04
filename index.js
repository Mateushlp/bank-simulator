const Deposit = require("./Deposit");

const deposito = new Deposit(500);

console.log(deposito);

const Installment = require("./Installment");

const parcela = new Installment(250, 1);

console.log(parcela);

const Loan = require("./Loan");

console.log(Loan);
console.log(Loan.interestRate);
Loan.interestRate = 15;

console.log(Loan.interestRate);

const emprestimo = new Loan(1000, 5);

console.log(emprestimo);

const Account = require("./Account");

const conta = new Account(0, "Mateus");

console.log(conta);

conta.deposit(500);

console.log(conta.balance);
console.log(conta.deposits);

conta.loan(1000, 5);

console.log(conta.balance);
console.log(conta.loans);

const mateus = {
  nome: "Mateus",
};

const joao = {
  nome: "João",
};

mateus.account = new Account(1000, mateus);
joao.account = new Account(500, joao);

mateus.account.transfer(joao, 200);

console.log("Mateus:", mateus.account.balance);
console.log("João:", joao.account.balance);
console.log("Transferências:", mateus.account.transfers);

const User = require("./User");

const mateushlp = new User("Mateus", "mateus@email.com");

console.log(mateushlp);
console.log(mateushlp.account);
console.log(mateushlp.account.balance);
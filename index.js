
import App from "./App.js";
import Loan from "./Loan.js";

App.createUser("Mateus", "mateus@email.com");
App.createUser("João", "joao@email.com");

App.deposit("mateus@email.com", 10000);

App.transfer("mateus@email.com", "joao@email.com", 2000);


App.loan("mateus@email.com", 5000, 5);
App.changeLoanInterestRate(20);
console.log(Loan.interestRate);

console.log(App.findUser("mateus@email.com").account.loans);
console.log(App.findUser("mateus@email.com").account.balance);
console.log(App.findUser("joao@email.com").account.balance);
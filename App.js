const Deposit = require("./Deposit");
const Loan = require("./Loan");
const User = require("./User");

module.exports = class App {
  static #users = [];

  static createUser(nome, email) {
    const usuarioExistente = App.findUser(email);
    if (usuarioExistente) {
      console.log(
        "Este usuario ja se encontra cadastrado no nosso sistema deseja fazer login?",
      );
    } else {
      const usuario = new User(nome, email);
      App.#users.push(usuario);
    }
  }
  static findUser(email) {
    const usuario = App.#users.find((user) => user.email === email);
    return usuario;
  }

  static deposit(email, valor) {
    const usuario = App.findUser(email);
    usuario.account.deposit(valor);
  }
 
  static transfer(emailOrigem, emailDestino, valor) {
    const usuarioOrigem = App.findUser(emailOrigem);
    const usuarioDestino = App.findUser(emailDestino);

    usuarioOrigem.account.transfer(usuarioDestino, valor);
  }

  static loan(email, valor, numeroDeParcelas) {
    const usuario = App.findUser(email);
    usuario.account.loan(valor, numeroDeParcelas);
  }

    static changeLoanInterestRate(valor) {
      Loan.interestRate = valor
  }
};
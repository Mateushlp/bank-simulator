import Installment from "./Installment.js";

export default class Loan {
  static #interestRate = 0.1;

  static get interestRate() {
    return this.#interestRate;
  }
  static set interestRate(valor) {
    this.#interestRate = valor / 100;
  }

  constructor(valor, numeroDeParcelas) {
    this.valor = valor;
    this.numeroDeParcelas = numeroDeParcelas;
    this.data = new Date();
    this.parcelas = [];

    for (let i = 0; i < this.numeroDeParcelas; i++) {
      let novaParcela = new Installment(valor / numeroDeParcelas, i + 1);
      this.parcelas.push(novaParcela);
    }
  }
};

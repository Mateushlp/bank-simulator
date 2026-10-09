export default class Transfer {
  constructor(usuario1, usuario2, valor) {
    this.usuario1 = usuario1;
    this.usuario2 = usuario2;
    this.valor = valor;
    this.data = new Date();
  }
}

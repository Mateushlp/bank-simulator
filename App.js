
import prisma from "./prisma.js";
import { transferService } from "./services/transferService.js";

export default class App {
  static async getUsers() {
    const usuarios = await prisma.user.findMany({
      include: {
        account: true,
      },
    });

    return usuarios;
  }

  static async createUser(nome, email) {
    if (!nome || !email) {
      throw new Error("Nome e e-mail são obrigatórios!");
    }

    const usuarioExistente = await prisma.user.findUnique({
      where: { email: email },
    });

    if (usuarioExistente) {
      throw new Error("Este e-mail já está cadastrado!");
    }

    const usuario = await prisma.user.create({
      data: {
        nome: nome,
        email: email,
        account: {
          create: {
            balance: 0,
          },
        },
      },
    });

    return usuario;
  }

  static async deposit(email, valor) {
    if (
      typeof valor !== "number" ||
      !Number.isFinite(valor) ||
      valor <= 0
    ) {
      throw new Error("O valor do depósito deve ser maior que zero!");
    }

    const usuario = await prisma.user.findUnique({
      where: { email: email },
      include: { account: true },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado no banco de dados!");
    }

    if (!usuario.account) {
      throw new Error("Conta do usuário não encontrada!");
    }

    await prisma.account.update({
      where: {
        id: usuario.account.id,
      },
      data: {
        balance: {
          increment: valor,
        },
      },
    });
  }

  static async transfer(emailOrigem, emailDestino, valor) {
    return transferService(emailOrigem, emailDestino, valor);
  }

  static async loan(email, valor, numeroDeParcelas) {
    if (
      typeof valor !== "number" ||
      !Number.isFinite(valor) ||
      valor <= 0
    ) {
      throw new Error("O valor do empréstimo deve ser maior que zero!");
    }

    if (
      !Number.isInteger(numeroDeParcelas) ||
      numeroDeParcelas <= 0
    ) {
      throw new Error(
        "O número de parcelas deve ser um inteiro maior que zero!",
      );
    }

    const usuario = await prisma.user.findUnique({
      where: { email: email },
      include: { account: true },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado!");
    }

    if (!usuario.account) {
      throw new Error("Conta do usuário não encontrada!");
    }

    await prisma.$transaction(async (tx) => {
      const emprestimo = await tx.loan.create({
        data: {
          valor: valor,
          numeroParcelas: numeroDeParcelas,
          userId: usuario.id,
        },
      });

      for (let i = 0; i < numeroDeParcelas; i++) {
        await tx.installment.create({
          data: {
            valor: valor / numeroDeParcelas,
            numero: i + 1,
            situacao: "pendente",
            loanId: emprestimo.id,
          },
        });
      }

      await tx.account.update({
        where: {
          id: usuario.account.id,
        },
        data: {
          balance: {
            increment: valor,
          },
        },
      });
    });
  }
}


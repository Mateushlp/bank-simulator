import prisma from "../prisma.js";

export async function transferService(emailOrigem, emailDestino, valor) {
  if (typeof valor !== "number" || !Number.isFinite(valor) || valor <= 0) {
    throw new Error("O valor da transferência deve ser maior que zero");
  }

  const usuarioOrigem = await prisma.user.findUnique({
    where: { email: emailOrigem },
    include: { account: true },
  });

  const usuarioDestino = await prisma.user.findUnique({
    where: { email: emailDestino },
    include: { account: true },
  });

  if (!usuarioOrigem) {
    throw new Error("Usuário de origem não encontrado!");
  }

  if (!usuarioDestino) {
    throw new Error("Usuário de destino não encontrado!");
  }

  if (usuarioOrigem.id === usuarioDestino.id) {
    throw new Error("Não é possível transferir para si mesmo!");
  }

  if (!usuarioOrigem.account || !usuarioDestino.account) {
    throw new Error("Conta de origem ou destino não encontrada!");
  }

  if (valor > usuarioOrigem.account.balance) {
    throw new Error("Saldo insuficiente para realizar a transferência");
  }

  await prisma.$transaction(async (tx) => {
    await tx.account.update({
      where: { id: usuarioOrigem.account.id },
      data: { balance: { decrement: valor } },
    });

    await tx.account.update({
      where: { id: usuarioDestino.account.id },
      data: { balance: { increment: valor } },
    });

    await tx.transfer.create({
      data: {
        valor,
        senderId: usuarioOrigem.id,
        receiverId: usuarioDestino.id,
      },
    });
  });
}

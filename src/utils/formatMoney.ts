export function formatMoney(value: number): number {
  return Number(value.toLocaleString('pt-BR', {
    style: 'currency',
      currency: 'BRL',
    }),
  );
}

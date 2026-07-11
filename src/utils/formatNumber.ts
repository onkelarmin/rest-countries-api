const formatter = new Intl.NumberFormat(undefined);

export function formatNumber(number: number): string {
  return formatter.format(number);
}

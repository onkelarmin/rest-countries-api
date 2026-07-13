const formatter = new Intl.ListFormat(undefined, {
  style: "short",
});

export function formatList(items: string[]): string {
  return formatter.format(items);
}

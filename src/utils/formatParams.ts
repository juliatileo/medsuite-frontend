export function formatParams(params: { [key: string]: any }): string {
  return Object.entries(params)
    .map(([key, value], i) =>
      i === 0 ? `${key}=${value}` : `&${key}=${value}`
    )
    .join("");
}

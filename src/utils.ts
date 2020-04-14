export const validBase = (base: number): boolean => base % 1 == 0

export const hasPixelValue = (value: string): boolean =>
  String(value).includes('px')

const isWhitelist = (whitelist: string, value: string): boolean =>
  (whitelist && whitelist.includes(value)) || false

const divisibleBy = (value, base): boolean => {
  const number = value.match(/\d+/)
  if (isNaN(number)) return true
  return Number(number) % Number(base) === 0
}

export const validPixelValue = (value, base, whitelist): boolean => {
  return (
    // handle multiple px values
    //   e.g. padding: 8px 8px 1px 8px or padding: 3em 8px 8px 8px;
    value
      .split(/[\s\r\n]+/)
      .filter(hasPixelValue)
      .every(
        (value) => isWhitelist(whitelist, value) || divisibleBy(value, base)
      )
  )
}

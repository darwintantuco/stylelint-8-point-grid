type WhitelistType = string[] | undefined

export const validBase = (base: number): boolean => base > 0

export const hasPixelValue = (value: string): boolean =>
  String(value).includes('px')

const isWhitelist = (whitelist: WhitelistType, value: string): boolean =>
  (whitelist && whitelist.includes(value)) || false

const divisibleBy = (value: string, base: number): boolean => {
  const number = value.match(/\d+/)
  return Number(number) % Number(base) === 0
}

export const validPixelValue = (
  value: string,
  base: number,
  whitelist: WhitelistType
): boolean => {
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

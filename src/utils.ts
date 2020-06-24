type WhitelistType = string[] | undefined

export const validBase = (base: number): boolean => base > 0

export const hasSupportedValue = (value: string): boolean =>
  String(value).includes('px') || String(value).includes('rem')

const isWhitelist = (whitelist: WhitelistType, value: string): boolean =>
  (whitelist && whitelist.includes(value)) || false

const divisibleBy = (value: string, base: number): boolean => {
  // parseFloat() drops units at the end automatically
  const number = parseFloat(value)
  return number % Number(base) === 0
}

export const validSupportedValue = (
  value: string,
  base: number,
  whitelist: WhitelistType
): boolean => {
  return (
    // handle multiple size values
    //   e.g. padding: 8px 8px 1px 8px or padding: 3em 8px 8px 8px;
    value
      .split(/[\s\r\n]+/)
      .filter(hasSupportedValue)
      .every(
        (value) => isWhitelist(whitelist, value) || divisibleBy(value, base)
      )
  )
}

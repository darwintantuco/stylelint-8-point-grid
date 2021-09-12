type AllowlistType = string[] | undefined

export const validBase = (base: number): boolean => base % 1 === 0

export const hasSupportedValue = (value: string): boolean =>
  String(value).includes('px') || String(value).includes('rem')

const isAllowlist = (allowlist: AllowlistType, value: string): boolean =>
  (allowlist && allowlist.includes(value)) || false

const divisibleBy = (value: string, base: number): boolean => {
  const baseRem = base / 16

  if (value.includes('rem')) {
    const number = parseFloat(value)
    return number % Number(baseRem) === 0
  }

  const number = value.match(/\d+/)
  return Number(number) % Number(base) === 0
}

export const validSupportedValue = (
  value: string,
  base: number,
  allowlist: AllowlistType
): boolean => {
  return (
    // handle multiple supported values
    //   e.g. padding: 8px 8px 1px 8px or padding: 3em 8px 8px 8px;
    value
      .split(/[\s\r\n]+/)
      .filter(hasSupportedValue)
      .every(
        (value) => isAllowlist(allowlist, value) || divisibleBy(value, base)
      )
  )
}

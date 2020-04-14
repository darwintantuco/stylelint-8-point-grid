const validBase = (val) => !isNaN(parseFloat(val)) && isFinite(val)

const hasPixelValue = (val) => String(val).includes('px')

const isWhitelist = (whitelist, value) =>
  (whitelist && whitelist.includes(value)) || false

const divisibleBy = (value, base) => {
  const number = value.match(/\d+/)
  if (isNaN(number)) return true
  return Number(number) % Number(base) === 0
}

const validPixelValue = (value, base, whitelist) => {
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

module.exports = {
  validBase,
  hasPixelValue,
  validPixelValue,
}

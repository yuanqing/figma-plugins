const isoCodes = require('./iso-codes.json')

let result
result = mapSymbolToIsoCodes()
result = setDefaultIsoCodes(result)
result = sortByKeys(result)
console.log(JSON.stringify(result, null, 2))

function mapSymbolToIsoCodes () {
  const value = 0
  const pattern = `([^${value}\\s]*)`
  const symbolRegex = new RegExp(
    [
      '(?:',
      pattern,
      '\\s?', // optional space after prefix
      ')',
      `${value}`,
      '(?:', // optional space before suffix
      '\\s?',
      pattern,
      ')'
    ].join('')
  )
  const result = {}
  for (const isoCode of isoCodes) {
    // render the value `0` using `Intl.NumberFormat`
    const locale = isoCode.substring(0, 2).toLowerCase()
    const string = new Intl.NumberFormat(`en-${locale}`, {
      style: 'currency',
      currency: isoCode,
      maximumSignificantDigits: 1
    }).format(value)
    const m = string.match(symbolRegex)
    if (m === null) {
      result[isoCode] = isoCode
      continue
    }
    // extract the symbol off the rendered string
    let symbol = m[1] !== '' ? m[1] : m[2]
    if (symbol[symbol.length - 1] === '$') {
      symbol = '$'
    }
    if (typeof result[symbol] === 'undefined') {
      result[symbol] = isoCode
      continue
    }
    if (typeof result[symbol] === 'string') {
      result[symbol] = [result[symbol]]
    }
    result[symbol].push(isoCode)
  }
  return result
}

function setDefaultIsoCodes (isoCodes) {
  const mapSymbolToDefaultIsoCode = {
    $: 'USD',
    K: 'PGK',
    Rs: 'PKR',
    '£': 'GBP'
  }
  const result = {}
  for (const key of Object.keys(mapSymbolToDefaultIsoCode)) {
    result[key] = {
      isoCodes: isoCodes[key],
      defaultIsoCode: mapSymbolToDefaultIsoCode[key]
    }
  }
  return {
    ...isoCodes,
    ...result
  }
}

function sortByKeys (object) {
  const sortedKeys = Object.keys(object).sort()
  const result = {}
  for (const key of sortedKeys) {
    result[key] = object[key]
  }
  return result
}

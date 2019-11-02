import test from 'ava'
import { formatExplicit } from '../src/format/format-explicit/format-explicit'
import { MINUS } from '../src/special-characters'

test('returns the same string if there are no matches', function (t) {
  t.deepEqual(formatExplicit('', 'en-US'), '')
  t.deepEqual(formatExplicit('foo', 'en-US'), 'foo')
  t.deepEqual(formatExplicit('3,141.50', 'en-US'), '3,141.50')
  t.deepEqual(formatExplicit('42,00', 'en-US'), '42,00')
})

test('formats money with the currency symbol as a prefix', function (t) {
  t.deepEqual(formatExplicit('$3,141.50', 'en-US'), '$3,141.50 USD')
  t.deepEqual(formatExplicit('$3,141.50', 'de-DE'), '3.141,50 $ USD')
  t.deepEqual(formatExplicit('$3,141.50 USD', 'en-US'), '$3,141.50 USD')
  t.deepEqual(formatExplicit('$3,141.50 USD', 'de-DE'), '3.141,50 $ USD')
  t.deepEqual(formatExplicit('OMR 3,141.500', 'en-US'), 'OMR 3,141.500')
  t.deepEqual(formatExplicit('OMR 3,141.500', 'de-DE'), '3.141,500 OMR')
})

test('formats money with the currency symbol as a suffix', function (t) {
  t.deepEqual(formatExplicit('42,00 €', 'en-US'), '€42.00 EUR')
  t.deepEqual(formatExplicit('42,00 €', 'de-DE'), '42,00 € EUR')
  t.deepEqual(formatExplicit('42,00 € EUR', 'en-US'), '€42.00 EUR')
  t.deepEqual(formatExplicit('42,00 € EUR', 'de-DE'), '42,00 € EUR')
  t.deepEqual(formatExplicit('42.00 CHF', 'en-US'), 'CHF 42.00')
  t.deepEqual(formatExplicit('42.00 CHF', 'de-DE'), '42,00 CHF')
})

test('formats money with a minus symbol', function (t) {
  t.deepEqual(
    formatExplicit(`${MINUS}$3,141.50`, 'en-US'),
    `${MINUS}$3,141.50 USD`
  )
  t.deepEqual(
    formatExplicit(`${MINUS}$3,141.50`, 'de-DE'),
    `${MINUS}3.141,50 $ USD`
  )
  t.deepEqual(
    formatExplicit(`${MINUS}OMR 3,141.500`, 'en-US'),
    `${MINUS}OMR 3,141.500`
  )
  t.deepEqual(
    formatExplicit(`${MINUS}OMR 3,141.500`, 'de-DE'),
    `${MINUS}3.141,500 OMR`
  )
  t.deepEqual(formatExplicit(`${MINUS}42,00 €`, 'en-US'), `${MINUS}€42.00 EUR`)
  t.deepEqual(formatExplicit(`${MINUS}42,00 €`, 'de-DE'), `${MINUS}42,00 € EUR`)
  t.deepEqual(formatExplicit(`${MINUS}42.00 CHF`, 'en-US'), `${MINUS}CHF 42.00`)
  t.deepEqual(formatExplicit(`${MINUS}42.00 CHF`, 'de-DE'), `${MINUS}42,00 CHF`)
})

test('formats multiple currencies', function (t) {
  t.deepEqual(
    formatExplicit('$42.00, 3,14 €', 'en-US'),
    '$42.00 USD, €3.14 EUR'
  )
})

test('formats big numbers', function (t) {
  t.deepEqual(
    formatExplicit('$42,000,000,000.00, 3.140.000.000,00 €', 'en-US'),
    '$42,000,000,000.00 USD, €3,140,000,000.00 EUR'
  )
})

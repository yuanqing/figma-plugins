import test from 'ava'
import { formatShort } from '../src/format/format-short/format-short'
import { MINUS } from '../src/special-characters'

test('returns the same string if there are no matches', function (t) {
  t.deepEqual(formatShort('', 'en-US'), '')
  t.deepEqual(formatShort('foo', 'en-US'), 'foo')
  t.deepEqual(formatShort('3,141.50', 'en-US'), '3,141.50')
  t.deepEqual(formatShort('42,00', 'en-US'), '42,00')
})

test('formats money with the currency symbol as a prefix', function (t) {
  t.deepEqual(formatShort('$3,141.50', 'en-US'), '$3,141.50')
  t.deepEqual(formatShort('$3,141.50', 'de-DE'), '3.141,50 $')
  t.deepEqual(formatShort('$3,141.50 USD', 'en-US'), '$3,141.50')
  t.deepEqual(formatShort('$3,141.50 USD', 'de-DE'), '3.141,50 $')
  t.deepEqual(formatShort('OMR 3,141.500', 'en-US'), 'OMR 3,141.500')
  t.deepEqual(formatShort('OMR 3,141.500', 'de-DE'), '3.141,500 OMR')
})

test('formats money with the currency symbol as a suffix', function (t) {
  t.deepEqual(formatShort('42,00 €', 'en-US'), '€42.00')
  t.deepEqual(formatShort('42,00 €', 'de-DE'), '42,00 €')
  t.deepEqual(formatShort('42,00 € EUR', 'en-US'), '€42.00')
  t.deepEqual(formatShort('42,00 € EUR', 'de-DE'), '42,00 €')
  t.deepEqual(formatShort('42.00 CHF', 'en-US'), 'CHF 42.00')
  t.deepEqual(formatShort('42.00 CHF', 'de-DE'), '42,00 CHF')
})

test('formats money with a minus symbol', function (t) {
  t.deepEqual(
    formatShort(`${MINUS}$3,141.50 USD`, 'en-US'),
    `${MINUS}$3,141.50`
  )
  t.deepEqual(
    formatShort(`${MINUS}$3,141.50 USD`, 'de-DE'),
    `${MINUS}3.141,50 $`
  )
  t.deepEqual(
    formatShort(`${MINUS}OMR 3,141.500`, 'en-US'),
    `${MINUS}OMR 3,141.500`
  )
  t.deepEqual(
    formatShort(`${MINUS}OMR 3,141.500`, 'de-DE'),
    `${MINUS}3.141,500 OMR`
  )
  t.deepEqual(formatShort(`${MINUS}42,00 € EUR`, 'en-US'), `${MINUS}€42.00`)
  t.deepEqual(formatShort(`${MINUS}42,00 € EUR`, 'de-DE'), `${MINUS}42,00 €`)
  t.deepEqual(formatShort(`${MINUS}42.00 CHF`, 'en-US'), `${MINUS}CHF 42.00`)
  t.deepEqual(formatShort(`${MINUS}42.00 CHF`, 'de-DE'), `${MINUS}42,00 CHF`)
})

test('formats multiple currencies', function (t) {
  t.deepEqual(formatShort('$42.00 USD, 3,14 € EUR', 'en-US'), '$42.00, €3.14')
})

test('formats big numbers', function (t) {
  t.deepEqual(
    formatShort('$42,000,000,000.00 USD, 3.140.000.000,00 € EUR', 'en-US'),
    '$42,000,000,000.00, €3,140,000,000.00'
  )
})

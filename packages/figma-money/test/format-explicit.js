import test from 'ava'
import { formatExplicit } from '../src/format-explicit/format-explicit'

test('returns the same string if there are no matches', function (t) {
  t.deepEqual(formatExplicit('', 'en-US'), '')
  t.deepEqual(formatExplicit(' ', 'en-US'), ' ')
  t.deepEqual(formatExplicit('foo', 'en-US'), 'foo')
  t.deepEqual(formatExplicit('42', 'en-US'), '42')
  t.deepEqual(formatExplicit('3.14', 'en-US'), '3.14')
  t.deepEqual(formatExplicit('123.456,78', 'en-US'), '123.456,78')
})

test('does not match possible false positives', function (t) {
  t.deepEqual(formatExplicit('X3.14', 'en-US'), 'X3.14')
  t.deepEqual(formatExplicit('X3.14 ABC', 'en-US'), 'X3.14 ABC')
  t.deepEqual(formatExplicit('3.14 X', 'en-US'), '3.14 X')
  t.deepEqual(formatExplicit('3.14 X ABC', 'en-US'), '3.14 X ABC')
  t.deepEqual(formatExplicit('ABC 3.14', 'en-US'), 'ABC 3.14')
  t.deepEqual(formatExplicit('3.14 ABC', 'en-US'), '3.14 ABC')
})

test('same locale, formats `$3.14`', function (t) {
  t.deepEqual(formatExplicit('$3.14', 'en-US'), '$3.14 USD')
  t.deepEqual(formatExplicit('$3.14 USD', 'en-US'), '$3.14 USD')
  t.deepEqual(formatExplicit('$3.14 ABC', 'en-US'), '$3.14 USD ABC')
  t.deepEqual(formatExplicit('X $3.14 ABC', 'en-US'), 'X $3.14 USD ABC')
  t.deepEqual(formatExplicit('$3.14 ABC DEF', 'en-US'), '$3.14 USD ABC DEF')
  t.deepEqual(formatExplicit('X $3.14 ABC DEF', 'en-US'), 'X $3.14 USD ABC DEF')
})

test('same locale, formats `3,14 $`', function (t) {
  t.deepEqual(formatExplicit('3,14 $', 'en-US'), '$3.14 USD')
  t.deepEqual(formatExplicit('3,14 $ USD', 'en-US'), '$3.14 USD')
  t.deepEqual(formatExplicit('3,14 $ ABC', 'en-US'), '$3.14 USD ABC')
  t.deepEqual(formatExplicit('X 3,14 $ ABC', 'en-US'), 'X $3.14 USD ABC')
  t.deepEqual(formatExplicit('3,14 $ ABC DEF', 'en-US'), '$3.14 USD ABC DEF')
  t.deepEqual(
    formatExplicit('X 3,14 $ ABC DEF', 'en-US'),
    'X $3.14 USD ABC DEF'
  )
})

test('same locale, formats `USD 3.14`', function (t) {
  t.deepEqual(formatExplicit('USD 3.14', 'en-US'), '$3.14 USD')
  t.deepEqual(formatExplicit('USD 3.14 ABC', 'en-US'), '$3.14 USD ABC')
  t.deepEqual(formatExplicit('X USD 3.14 ABC', 'en-US'), 'X $3.14 USD ABC')
  t.deepEqual(formatExplicit('USD 3.14 ABC DEF', 'en-US'), '$3.14 USD ABC DEF')
  t.deepEqual(
    formatExplicit('X USD 3.14 ABC DEF', 'en-US'),
    'X $3.14 USD ABC DEF'
  )
})

test('same locale, formats `3.14 USD`', function (t) {
  t.deepEqual(formatExplicit('3,14 USD', 'en-US'), '$3.14 USD')
  t.deepEqual(formatExplicit('3,14 USD ABC', 'en-US'), '$3.14 USD ABC')
  t.deepEqual(formatExplicit('X 3,14 USD ABC', 'en-US'), 'X $3.14 USD ABC')
  t.deepEqual(formatExplicit('3,14 USD ABC DEF', 'en-US'), '$3.14 USD ABC DEF')
  t.deepEqual(
    formatExplicit('X 3,14 USD ABC DEF', 'en-US'),
    'X $3.14 USD ABC DEF'
  )
})

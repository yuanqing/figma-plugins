import test from 'ava'
import { formatShort } from '../src/format-short/format-short'

test('returns the same string if there are no matches', function (t) {
  t.deepEqual(formatShort('', 'en-US'), '')
  t.deepEqual(formatShort(' ', 'en-US'), ' ')
  t.deepEqual(formatShort('foo', 'en-US'), 'foo')
  t.deepEqual(formatShort('42', 'en-US'), '42')
  t.deepEqual(formatShort('3.14', 'en-US'), '3.14')
  t.deepEqual(formatShort('123.456,78', 'en-US'), '123.456,78')
})

test('does not match possible false positives', function (t) {
  t.deepEqual(formatShort('X3.14', 'en-US'), 'X3.14')
  t.deepEqual(formatShort('X3.14 ABC', 'en-US'), 'X3.14 ABC')
  t.deepEqual(formatShort('3.14 X', 'en-US'), '3.14 X')
  t.deepEqual(formatShort('3.14 X ABC', 'en-US'), '3.14 X ABC')
  t.deepEqual(formatShort('ABC 3.14', 'en-US'), 'ABC 3.14')
  t.deepEqual(formatShort('3.14 ABC', 'en-US'), '3.14 ABC')
})

test('same locale, formats `$3.14`', function (t) {
  t.deepEqual(formatShort('$3.14', 'en-US'), '$3.14')
  t.deepEqual(formatShort('$3.14 USD', 'en-US'), '$3.14')
  t.deepEqual(formatShort('$3.14 ABC', 'en-US'), '$3.14 ABC')
  t.deepEqual(formatShort('X $3.14 ABC', 'en-US'), 'X $3.14 ABC')
  t.deepEqual(formatShort('$3.14 ABC DEF', 'en-US'), '$3.14 ABC DEF')
  t.deepEqual(formatShort('X $3.14 ABC DEF', 'en-US'), 'X $3.14 ABC DEF')
})

test('same locale, formats `3,14 $`', function (t) {
  t.deepEqual(formatShort('3,14 $', 'en-US'), '$3.14')
  t.deepEqual(formatShort('3,14 $ USD', 'en-US'), '$3.14')
  t.deepEqual(formatShort('3,14 $ ABC', 'en-US'), '$3.14 ABC')
  t.deepEqual(formatShort('X 3,14 $ ABC', 'en-US'), 'X $3.14 ABC')
  t.deepEqual(formatShort('3,14 $ ABC DEF', 'en-US'), '$3.14 ABC DEF')
  t.deepEqual(formatShort('X 3,14 $ ABC DEF', 'en-US'), 'X $3.14 ABC DEF')
})

test('same locale, formats `USD 3.14`', function (t) {
  t.deepEqual(formatShort('USD 3.14', 'en-US'), '$3.14')
  t.deepEqual(formatShort('USD 3.14 ABC', 'en-US'), '$3.14 ABC')
  t.deepEqual(formatShort('X USD 3.14 ABC', 'en-US'), 'X $3.14 ABC')
  t.deepEqual(formatShort('USD 3.14 ABC DEF', 'en-US'), '$3.14 ABC DEF')
  t.deepEqual(formatShort('X USD 3.14 ABC DEF', 'en-US'), 'X $3.14 ABC DEF')
})

test('same locale, formats `3.14 USD`', function (t) {
  t.deepEqual(formatShort('3,14 USD', 'en-US'), '$3.14')
  t.deepEqual(formatShort('3,14 USD ABC', 'en-US'), '$3.14 ABC')
  t.deepEqual(formatShort('X 3,14 USD ABC', 'en-US'), 'X $3.14 ABC')
  t.deepEqual(formatShort('3,14 USD ABC DEF', 'en-US'), '$3.14 ABC DEF')
  t.deepEqual(formatShort('X 3,14 USD ABC DEF', 'en-US'), 'X $3.14 ABC DEF')
})

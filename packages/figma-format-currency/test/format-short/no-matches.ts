import test from 'ava'

import { formatShort } from '../../src/utilities/format-currency/format-short.js'

test('no matches', function (t) {
  t.plan(12)
  t.deepEqual(formatShort('', 'en'), '')
  t.deepEqual(formatShort(' ', 'en'), ' ')
  t.deepEqual(formatShort('foo', 'en'), 'foo')
  t.deepEqual(formatShort('1', 'en'), '1')
  t.deepEqual(formatShort('3.14', 'en'), '3.14')
  t.deepEqual(formatShort('3,14', 'en'), '3,14')
  t.deepEqual(formatShort('123,456', 'en'), '123,456')
  t.deepEqual(formatShort('123.456', 'en'), '123.456')
  t.deepEqual(formatShort('123,456.78', 'en'), '123,456.78')
  t.deepEqual(formatShort('123.456,78', 'en'), '123.456,78')
  t.deepEqual(formatShort('123,456.789', 'en'), '123,456.789')
  t.deepEqual(formatShort('123.456,789', 'en'), '123.456,789')
})

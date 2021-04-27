import { test } from 'tap'

import { formatShort } from '../../src/utilities/format-currency/format-short'

test('no matches', function (t) {
  t.plan(12)
  t.equal(formatShort('', 'en'), '')
  t.equal(formatShort(' ', 'en'), ' ')
  t.equal(formatShort('foo', 'en'), 'foo')
  t.equal(formatShort('1', 'en'), '1')
  t.equal(formatShort('3.14', 'en'), '3.14')
  t.equal(formatShort('3,14', 'en'), '3,14')
  t.equal(formatShort('123,456', 'en'), '123,456')
  t.equal(formatShort('123.456', 'en'), '123.456')
  t.equal(formatShort('123,456.78', 'en'), '123,456.78')
  t.equal(formatShort('123.456,78', 'en'), '123.456,78')
  t.equal(formatShort('123,456.789', 'en'), '123,456.789')
  t.equal(formatShort('123.456,789', 'en'), '123.456,789')
})

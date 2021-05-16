import test from 'ava'

import { formatExplicit } from '../../src/utilities/format-currency/format-explicit.js'

test('no matches', function (t) {
  t.plan(12)
  t.deepEqual(formatExplicit('', 'en'), '')
  t.deepEqual(formatExplicit(' ', 'en'), ' ')
  t.deepEqual(formatExplicit('foo', 'en'), 'foo')
  t.deepEqual(formatExplicit('1', 'en'), '1')
  t.deepEqual(formatExplicit('3.14', 'en'), '3.14')
  t.deepEqual(formatExplicit('3,14', 'en'), '3,14')
  t.deepEqual(formatExplicit('123,456', 'en'), '123,456')
  t.deepEqual(formatExplicit('123.456', 'en'), '123.456')
  t.deepEqual(formatExplicit('123,456.78', 'en'), '123,456.78')
  t.deepEqual(formatExplicit('123.456,78', 'en'), '123.456,78')
  t.deepEqual(formatExplicit('123,456.789', 'en'), '123,456.789')
  t.deepEqual(formatExplicit('123.456,789', 'en'), '123.456,789')
})

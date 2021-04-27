import { test } from 'tap'

import { formatExplicit } from '../../src/utilities/format-currency/format-explicit'

test('no matches', function (t) {
  t.plan(12)
  t.equal(formatExplicit('', 'en'), '')
  t.equal(formatExplicit(' ', 'en'), ' ')
  t.equal(formatExplicit('foo', 'en'), 'foo')
  t.equal(formatExplicit('1', 'en'), '1')
  t.equal(formatExplicit('3.14', 'en'), '3.14')
  t.equal(formatExplicit('3,14', 'en'), '3,14')
  t.equal(formatExplicit('123,456', 'en'), '123,456')
  t.equal(formatExplicit('123.456', 'en'), '123.456')
  t.equal(formatExplicit('123,456.78', 'en'), '123,456.78')
  t.equal(formatExplicit('123.456,78', 'en'), '123.456,78')
  t.equal(formatExplicit('123,456.789', 'en'), '123,456.789')
  t.equal(formatExplicit('123.456,789', 'en'), '123.456,789')
})

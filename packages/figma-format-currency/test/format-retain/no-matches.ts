import { test } from 'tap'

import { formatRetain } from '../../src/utilities/currency/format-retain'

test('no matches', function (t) {
  t.plan(12)
  t.is(formatRetain('', 'en-US'), '')
  t.is(formatRetain(' ', 'en-US'), ' ')
  t.is(formatRetain('foo', 'en-US'), 'foo')
  t.is(formatRetain('1', 'en-US'), '1')
  t.is(formatRetain('3.14', 'en-US'), '3.14')
  t.is(formatRetain('3,14', 'en-US'), '3,14')
  t.is(formatRetain('123,456', 'en-US'), '123,456')
  t.is(formatRetain('123.456', 'en-US'), '123.456')
  t.is(formatRetain('123,456.78', 'en-US'), '123,456.78')
  t.is(formatRetain('123.456,78', 'en-US'), '123.456,78')
  t.is(formatRetain('123,456.789', 'en-US'), '123,456.789')
  t.is(formatRetain('123.456,789', 'en-US'), '123.456,789')
})

import { test } from 'tap'

import { formatRetain } from '../../src/utilities/format-currency/format-retain'

test('no matches', function (t) {
  t.plan(12)
  t.equal(formatRetain('', 'en'), '')
  t.equal(formatRetain(' ', 'en'), ' ')
  t.equal(formatRetain('foo', 'en'), 'foo')
  t.equal(formatRetain('1', 'en'), '1')
  t.equal(formatRetain('3.14', 'en'), '3.14')
  t.equal(formatRetain('3,14', 'en'), '3,14')
  t.equal(formatRetain('123,456', 'en'), '123,456')
  t.equal(formatRetain('123.456', 'en'), '123.456')
  t.equal(formatRetain('123,456.78', 'en'), '123,456.78')
  t.equal(formatRetain('123.456,78', 'en'), '123.456,78')
  t.equal(formatRetain('123,456.789', 'en'), '123,456.789')
  t.equal(formatRetain('123.456,789', 'en'), '123.456,789')
})

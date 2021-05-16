import test from 'ava'

import { formatRetain } from '../../src/utilities/format-currency/format-retain.js'

test('no matches', function (t) {
  t.plan(12)
  t.deepEqual(formatRetain('', 'en'), '')
  t.deepEqual(formatRetain(' ', 'en'), ' ')
  t.deepEqual(formatRetain('foo', 'en'), 'foo')
  t.deepEqual(formatRetain('1', 'en'), '1')
  t.deepEqual(formatRetain('3.14', 'en'), '3.14')
  t.deepEqual(formatRetain('3,14', 'en'), '3,14')
  t.deepEqual(formatRetain('123,456', 'en'), '123,456')
  t.deepEqual(formatRetain('123.456', 'en'), '123.456')
  t.deepEqual(formatRetain('123,456.78', 'en'), '123,456.78')
  t.deepEqual(formatRetain('123.456,78', 'en'), '123.456,78')
  t.deepEqual(formatRetain('123,456.789', 'en'), '123,456.789')
  t.deepEqual(formatRetain('123.456,789', 'en'), '123.456,789')
})

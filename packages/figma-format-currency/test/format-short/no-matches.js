import test from 'ava'
import { formatShort } from '../../src/utilities/currency/format-short'

test('no matches', function (t) {
  t.is(formatShort('', 'en-US'), '')
  t.is(formatShort(' ', 'en-US'), ' ')
  t.is(formatShort('foo', 'en-US'), 'foo')
  t.is(formatShort('1', 'en-US'), '1')
  t.is(formatShort('3.14', 'en-US'), '3.14')
  t.is(formatShort('3,14', 'en-US'), '3,14')
  t.is(formatShort('123,456', 'en-US'), '123,456')
  t.is(formatShort('123.456', 'en-US'), '123.456')
  t.is(formatShort('123,456.78', 'en-US'), '123,456.78')
  t.is(formatShort('123.456,78', 'en-US'), '123.456,78')
  t.is(formatShort('123,456.789', 'en-US'), '123,456.789')
  t.is(formatShort('123.456,789', 'en-US'), '123.456,789')
})

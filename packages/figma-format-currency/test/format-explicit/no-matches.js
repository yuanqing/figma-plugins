import test from 'ava'
import { formatExplicit } from '../../src/format-currency/format-explicit/format-explicit'

test('no matches', function (t) {
  t.is(formatExplicit('', 'en-US'), '')
  t.is(formatExplicit(' ', 'en-US'), ' ')
  t.is(formatExplicit('foo', 'en-US'), 'foo')
  t.is(formatExplicit('1', 'en-US'), '1')
  t.is(formatExplicit('3.14', 'en-US'), '3.14')
  t.is(formatExplicit('3,14', 'en-US'), '3,14')
  t.is(formatExplicit('123,456', 'en-US'), '123,456')
  t.is(formatExplicit('123.456', 'en-US'), '123.456')
  t.is(formatExplicit('123,456.78', 'en-US'), '123,456.78')
  t.is(formatExplicit('123.456,78', 'en-US'), '123.456,78')
  t.is(formatExplicit('123,456.789', 'en-US'), '123,456.789')
  t.is(formatExplicit('123.456,789', 'en-US'), '123.456,789')
})

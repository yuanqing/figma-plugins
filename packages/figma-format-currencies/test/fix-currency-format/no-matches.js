import test from 'ava'
import { fixCurrencyFormat } from '../../src/fix-currency-format/fix-currency-format'

test('no matches', function (t) {
  t.is(fixCurrencyFormat('', 'en-US'), '')
  t.is(fixCurrencyFormat(' ', 'en-US'), ' ')
  t.is(fixCurrencyFormat('foo', 'en-US'), 'foo')
  t.is(fixCurrencyFormat('1', 'en-US'), '1')
  t.is(fixCurrencyFormat('3.14', 'en-US'), '3.14')
  t.is(fixCurrencyFormat('3,14', 'en-US'), '3,14')
  t.is(fixCurrencyFormat('123,456', 'en-US'), '123,456')
  t.is(fixCurrencyFormat('123.456', 'en-US'), '123.456')
  t.is(fixCurrencyFormat('123,456.78', 'en-US'), '123,456.78')
  t.is(fixCurrencyFormat('123.456,78', 'en-US'), '123.456,78')
  t.is(fixCurrencyFormat('123,456.789', 'en-US'), '123,456.789')
  t.is(fixCurrencyFormat('123.456,789', 'en-US'), '123.456,789')
})

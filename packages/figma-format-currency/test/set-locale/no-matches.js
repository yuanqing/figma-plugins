import test from 'ava'
import { setLocale } from '../../src/format-currency/set-locale/set-locale'

test('no matches', function (t) {
  t.is(setLocale('', 'en-US'), '')
  t.is(setLocale(' ', 'en-US'), ' ')
  t.is(setLocale('foo', 'en-US'), 'foo')
  t.is(setLocale('1', 'en-US'), '1')
  t.is(setLocale('3.14', 'en-US'), '3.14')
  t.is(setLocale('3,14', 'en-US'), '3,14')
  t.is(setLocale('123,456', 'en-US'), '123,456')
  t.is(setLocale('123.456', 'en-US'), '123.456')
  t.is(setLocale('123,456.78', 'en-US'), '123,456.78')
  t.is(setLocale('123.456,78', 'en-US'), '123.456,78')
  t.is(setLocale('123,456.789', 'en-US'), '123,456.789')
  t.is(setLocale('123.456,789', 'en-US'), '123.456,789')
})

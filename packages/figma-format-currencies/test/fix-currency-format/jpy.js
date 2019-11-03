import test from 'ava'
import { fixCurrencyFormat } from '../../src/fix-currency-format/fix-currency-format'

test('¥1', function (t) {
  t.is(fixCurrencyFormat('¥1', 'en-US'), '¥1')
  t.is(fixCurrencyFormat('¥1,', 'en-US'), '¥1,')
  t.is(fixCurrencyFormat('X ¥1', 'en-US'), 'X ¥1')
  t.is(fixCurrencyFormat('X ¥1 ABC', 'en-US'), 'X ¥1 ABC')
  t.is(fixCurrencyFormat('X ¥1 ABC DEF', 'en-US'), 'X ¥1 ABC DEF')
  t.is(fixCurrencyFormat('¥1 ABC', 'en-US'), '¥1 ABC')
  t.is(fixCurrencyFormat('¥1 ABC DEF', 'en-US'), '¥1 ABC DEF')
})

test('¥1 JPY', function (t) {
  t.is(fixCurrencyFormat('¥1 JPY', 'en-US'), '¥1 JPY')
  t.is(fixCurrencyFormat('¥1 JPY,', 'en-US'), '¥1 JPY,')
  t.is(fixCurrencyFormat('X ¥1 JPY', 'en-US'), 'X ¥1 JPY')
  t.is(fixCurrencyFormat('X ¥1 JPY ABC', 'en-US'), 'X ¥1 JPY ABC')
  t.is(fixCurrencyFormat('X ¥1 JPY ABC DEF', 'en-US'), 'X ¥1 JPY ABC DEF')
  t.is(fixCurrencyFormat('¥1 JPY ABC', 'en-US'), '¥1 JPY ABC')
  t.is(fixCurrencyFormat('¥1 JPY ABC DEF', 'en-US'), '¥1 JPY ABC DEF')
})

test('1 ¥', function (t) {
  t.is(fixCurrencyFormat('1 ¥', 'en-US'), '¥1')
  t.is(fixCurrencyFormat('1 ¥,', 'en-US'), '¥1,')
  t.is(fixCurrencyFormat('X 1 ¥', 'en-US'), 'X ¥1')
  t.is(fixCurrencyFormat('X 1 ¥ ABC', 'en-US'), 'X ¥1 ABC')
  t.is(fixCurrencyFormat('X 1 ¥ ABC DEF', 'en-US'), 'X ¥1 ABC DEF')
  t.is(fixCurrencyFormat('1 ¥ ABC', 'en-US'), '¥1 ABC')
  t.is(fixCurrencyFormat('1 ¥ ABC DEF', 'en-US'), '¥1 ABC DEF')
})

test('1 ¥ JPY', function (t) {
  t.is(fixCurrencyFormat('1 ¥ JPY', 'en-US'), '¥1 JPY')
  t.is(fixCurrencyFormat('1 ¥ JPY,', 'en-US'), '¥1 JPY,')
  t.is(fixCurrencyFormat('X 1 ¥ JPY', 'en-US'), 'X ¥1 JPY')
  t.is(fixCurrencyFormat('X 1 ¥ JPY ABC', 'en-US'), 'X ¥1 JPY ABC')
  t.is(fixCurrencyFormat('X 1 ¥ JPY ABC DEF', 'en-US'), 'X ¥1 JPY ABC DEF')
  t.is(fixCurrencyFormat('1 ¥ JPY ABC', 'en-US'), '¥1 JPY ABC')
  t.is(fixCurrencyFormat('1 ¥ JPY ABC DEF', 'en-US'), '¥1 JPY ABC DEF')
})

test('¥123,456', function (t) {
  t.is(fixCurrencyFormat('¥123,456', 'en-US'), '¥123,456')
  t.is(fixCurrencyFormat('¥123,456,', 'en-US'), '¥123,456,')
  t.is(fixCurrencyFormat('X ¥123,456', 'en-US'), 'X ¥123,456')
  t.is(fixCurrencyFormat('X ¥123,456 ABC', 'en-US'), 'X ¥123,456 ABC')
  t.is(fixCurrencyFormat('X ¥123,456 ABC DEF', 'en-US'), 'X ¥123,456 ABC DEF')
  t.is(fixCurrencyFormat('¥123,456 ABC', 'en-US'), '¥123,456 ABC')
  t.is(fixCurrencyFormat('¥123,456 ABC DEF', 'en-US'), '¥123,456 ABC DEF')
})

test('¥123,456 JPY', function (t) {
  t.is(fixCurrencyFormat('¥123,456 JPY', 'en-US'), '¥123,456 JPY')
  t.is(fixCurrencyFormat('¥123,456 JPY,', 'en-US'), '¥123,456 JPY,')
  t.is(fixCurrencyFormat('X ¥123,456 JPY', 'en-US'), 'X ¥123,456 JPY')
  t.is(fixCurrencyFormat('X ¥123,456 JPY ABC', 'en-US'), 'X ¥123,456 JPY ABC')
  t.is(
    fixCurrencyFormat('X ¥123,456 JPY ABC DEF', 'en-US'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.is(fixCurrencyFormat('¥123,456 JPY ABC', 'en-US'), '¥123,456 JPY ABC')
  t.is(
    fixCurrencyFormat('¥123,456 JPY ABC DEF', 'en-US'),
    '¥123,456 JPY ABC DEF'
  )
})

test('123.456 ¥', function (t) {
  t.is(fixCurrencyFormat('123.456 ¥', 'en-US'), '¥123,456')
  t.is(fixCurrencyFormat('123.456 ¥,', 'en-US'), '¥123,456,')
  t.is(fixCurrencyFormat('X 123.456 ¥', 'en-US'), 'X ¥123,456')
  t.is(fixCurrencyFormat('X 123.456 ¥ ABC', 'en-US'), 'X ¥123,456 ABC')
  t.is(fixCurrencyFormat('X 123.456 ¥ ABC DEF', 'en-US'), 'X ¥123,456 ABC DEF')
  t.is(fixCurrencyFormat('123.456 ¥ ABC', 'en-US'), '¥123,456 ABC')
  t.is(fixCurrencyFormat('123.456 ¥ ABC DEF', 'en-US'), '¥123,456 ABC DEF')
})

test('123.456 ¥ JPY', function (t) {
  t.is(fixCurrencyFormat('123.456 ¥ JPY', 'en-US'), '¥123,456 JPY')
  t.is(fixCurrencyFormat('123.456 ¥ JPY,', 'en-US'), '¥123,456 JPY,')
  t.is(fixCurrencyFormat('X 123.456 ¥ JPY', 'en-US'), 'X ¥123,456 JPY')
  t.is(fixCurrencyFormat('X 123.456 ¥ JPY ABC', 'en-US'), 'X ¥123,456 JPY ABC')
  t.is(
    fixCurrencyFormat('X 123.456 ¥ JPY ABC DEF', 'en-US'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.is(fixCurrencyFormat('123.456 ¥ JPY ABC', 'en-US'), '¥123,456 JPY ABC')
  t.is(
    fixCurrencyFormat('123.456 ¥ JPY ABC DEF', 'en-US'),
    '¥123,456 JPY ABC DEF'
  )
})

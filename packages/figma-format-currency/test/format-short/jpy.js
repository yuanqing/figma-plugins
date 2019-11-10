import test from 'ava'
import { formatShort } from '../../src/utilities/currency/format-short'

test('¥1', function (t) {
  t.is(formatShort('¥1', 'en-US'), '¥1')
  t.is(formatShort('¥1,', 'en-US'), '¥1,')
  t.is(formatShort('X ¥1', 'en-US'), 'X ¥1')
  t.is(formatShort('X ¥1 ABC', 'en-US'), 'X ¥1 ABC')
  t.is(formatShort('X ¥1 ABC DEF', 'en-US'), 'X ¥1 ABC DEF')
  t.is(formatShort('¥1 ABC', 'en-US'), '¥1 ABC')
  t.is(formatShort('¥1 ABC DEF', 'en-US'), '¥1 ABC DEF')
})

test('¥1 JPY', function (t) {
  t.is(formatShort('¥1 JPY', 'en-US'), '¥1')
  t.is(formatShort('¥1 JPY,', 'en-US'), '¥1,')
  t.is(formatShort('X ¥1 JPY', 'en-US'), 'X ¥1')
  t.is(formatShort('X ¥1 JPY ABC', 'en-US'), 'X ¥1 ABC')
  t.is(formatShort('X ¥1 JPY ABC DEF', 'en-US'), 'X ¥1 ABC DEF')
  t.is(formatShort('¥1 JPY ABC', 'en-US'), '¥1 ABC')
  t.is(formatShort('¥1 JPY ABC DEF', 'en-US'), '¥1 ABC DEF')
})

test('1 ¥', function (t) {
  t.is(formatShort('1 ¥', 'en-US'), '¥1')
  t.is(formatShort('1 ¥,', 'en-US'), '¥1,')
  t.is(formatShort('X 1 ¥', 'en-US'), 'X ¥1')
  t.is(formatShort('X 1 ¥ ABC', 'en-US'), 'X ¥1 ABC')
  t.is(formatShort('X 1 ¥ ABC DEF', 'en-US'), 'X ¥1 ABC DEF')
  t.is(formatShort('1 ¥ ABC', 'en-US'), '¥1 ABC')
  t.is(formatShort('1 ¥ ABC DEF', 'en-US'), '¥1 ABC DEF')
})

test('1 ¥ JPY', function (t) {
  t.is(formatShort('1 ¥ JPY', 'en-US'), '¥1')
  t.is(formatShort('1 ¥ JPY,', 'en-US'), '¥1,')
  t.is(formatShort('X 1 ¥ JPY', 'en-US'), 'X ¥1')
  t.is(formatShort('X 1 ¥ JPY ABC', 'en-US'), 'X ¥1 ABC')
  t.is(formatShort('X 1 ¥ JPY ABC DEF', 'en-US'), 'X ¥1 ABC DEF')
  t.is(formatShort('1 ¥ JPY ABC', 'en-US'), '¥1 ABC')
  t.is(formatShort('1 ¥ JPY ABC DEF', 'en-US'), '¥1 ABC DEF')
})

test('¥123,456', function (t) {
  t.is(formatShort('¥123,456', 'en-US'), '¥123,456')
  t.is(formatShort('¥123,456,', 'en-US'), '¥123,456,')
  t.is(formatShort('X ¥123,456', 'en-US'), 'X ¥123,456')
  t.is(formatShort('X ¥123,456 ABC', 'en-US'), 'X ¥123,456 ABC')
  t.is(formatShort('X ¥123,456 ABC DEF', 'en-US'), 'X ¥123,456 ABC DEF')
  t.is(formatShort('¥123,456 ABC', 'en-US'), '¥123,456 ABC')
  t.is(formatShort('¥123,456 ABC DEF', 'en-US'), '¥123,456 ABC DEF')
})

test('¥123,456 JPY', function (t) {
  t.is(formatShort('¥123,456 JPY', 'en-US'), '¥123,456')
  t.is(formatShort('¥123,456 JPY,', 'en-US'), '¥123,456,')
  t.is(formatShort('X ¥123,456 JPY', 'en-US'), 'X ¥123,456')
  t.is(formatShort('X ¥123,456 JPY ABC', 'en-US'), 'X ¥123,456 ABC')
  t.is(formatShort('X ¥123,456 JPY ABC DEF', 'en-US'), 'X ¥123,456 ABC DEF')
  t.is(formatShort('¥123,456 JPY ABC', 'en-US'), '¥123,456 ABC')
  t.is(formatShort('¥123,456 JPY ABC DEF', 'en-US'), '¥123,456 ABC DEF')
})

test('123.456 ¥', function (t) {
  t.is(formatShort('123.456 ¥', 'en-US'), '¥123,456')
  t.is(formatShort('123.456 ¥,', 'en-US'), '¥123,456,')
  t.is(formatShort('X 123.456 ¥', 'en-US'), 'X ¥123,456')
  t.is(formatShort('X 123.456 ¥ ABC', 'en-US'), 'X ¥123,456 ABC')
  t.is(formatShort('X 123.456 ¥ ABC DEF', 'en-US'), 'X ¥123,456 ABC DEF')
  t.is(formatShort('123.456 ¥ ABC', 'en-US'), '¥123,456 ABC')
  t.is(formatShort('123.456 ¥ ABC DEF', 'en-US'), '¥123,456 ABC DEF')
})

test('123.456 ¥ JPY', function (t) {
  t.is(formatShort('123.456 ¥ JPY', 'en-US'), '¥123,456')
  t.is(formatShort('123.456 ¥ JPY,', 'en-US'), '¥123,456,')
  t.is(formatShort('X 123.456 ¥ JPY', 'en-US'), 'X ¥123,456')
  t.is(formatShort('X 123.456 ¥ JPY ABC', 'en-US'), 'X ¥123,456 ABC')
  t.is(formatShort('X 123.456 ¥ JPY ABC DEF', 'en-US'), 'X ¥123,456 ABC DEF')
  t.is(formatShort('123.456 ¥ JPY ABC', 'en-US'), '¥123,456 ABC')
  t.is(formatShort('123.456 ¥ JPY ABC DEF', 'en-US'), '¥123,456 ABC DEF')
})

test('¥123,456,789', function (t) {
  t.is(formatShort('¥123,456,789', 'en-US'), '¥123,456,789')
  t.is(formatShort('¥123,456,789,', 'en-US'), '¥123,456,789,')
  t.is(formatShort('X ¥123,456,789', 'en-US'), 'X ¥123,456,789')
  t.is(formatShort('X ¥123,456,789 ABC', 'en-US'), 'X ¥123,456,789 ABC')
  t.is(formatShort('X ¥123,456,789 ABC DEF', 'en-US'), 'X ¥123,456,789 ABC DEF')
  t.is(formatShort('¥123,456,789 ABC', 'en-US'), '¥123,456,789 ABC')
  t.is(formatShort('¥123,456,789 ABC DEF', 'en-US'), '¥123,456,789 ABC DEF')
})

test('¥123,456,789 JPY', function (t) {
  t.is(formatShort('¥123,456,789 JPY', 'en-US'), '¥123,456,789')
  t.is(formatShort('¥123,456,789 JPY,', 'en-US'), '¥123,456,789,')
  t.is(formatShort('X ¥123,456,789 JPY', 'en-US'), 'X ¥123,456,789')
  t.is(formatShort('X ¥123,456,789 JPY ABC', 'en-US'), 'X ¥123,456,789 ABC')
  t.is(
    formatShort('X ¥123,456,789 JPY ABC DEF', 'en-US'),
    'X ¥123,456,789 ABC DEF'
  )
  t.is(formatShort('¥123,456,789 JPY ABC', 'en-US'), '¥123,456,789 ABC')
  t.is(formatShort('¥123,456,789 JPY ABC DEF', 'en-US'), '¥123,456,789 ABC DEF')
})

test('123.456.789 ¥', function (t) {
  t.is(formatShort('123.456.789 ¥', 'en-US'), '¥123,456,789')
  t.is(formatShort('123.456.789 ¥,', 'en-US'), '¥123,456,789,')
  t.is(formatShort('X 123.456.789 ¥', 'en-US'), 'X ¥123,456,789')
  t.is(formatShort('X 123.456.789 ¥ ABC', 'en-US'), 'X ¥123,456,789 ABC')
  t.is(
    formatShort('X 123.456.789 ¥ ABC DEF', 'en-US'),
    'X ¥123,456,789 ABC DEF'
  )
  t.is(formatShort('123.456.789 ¥ ABC', 'en-US'), '¥123,456,789 ABC')
  t.is(formatShort('123.456.789 ¥ ABC DEF', 'en-US'), '¥123,456,789 ABC DEF')
})

test('123.456.789 ¥ JPY', function (t) {
  t.is(formatShort('123.456.789 ¥ JPY', 'en-US'), '¥123,456,789')
  t.is(formatShort('123.456.789 ¥ JPY,', 'en-US'), '¥123,456,789,')
  t.is(formatShort('X 123.456.789 ¥ JPY', 'en-US'), 'X ¥123,456,789')
  t.is(formatShort('X 123.456.789 ¥ JPY ABC', 'en-US'), 'X ¥123,456,789 ABC')
  t.is(
    formatShort('X 123.456.789 ¥ JPY ABC DEF', 'en-US'),
    'X ¥123,456,789 ABC DEF'
  )
  t.is(formatShort('123.456.789 ¥ JPY ABC', 'en-US'), '¥123,456,789 ABC')
  t.is(
    formatShort('123.456.789 ¥ JPY ABC DEF', 'en-US'),
    '¥123,456,789 ABC DEF'
  )
})

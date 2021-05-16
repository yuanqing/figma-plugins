import test from 'ava'

import { formatShort } from '../../src/utilities/format-currency/format-short.js'

test('¥1', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('¥1', 'en'), '¥1')
  t.deepEqual(formatShort('¥1,', 'en'), '¥1,')
  t.deepEqual(formatShort('X ¥1', 'en'), 'X ¥1')
  t.deepEqual(formatShort('X ¥1 ABC', 'en'), 'X ¥1 ABC')
  t.deepEqual(formatShort('X ¥1 ABC DEF', 'en'), 'X ¥1 ABC DEF')
  t.deepEqual(formatShort('¥1 ABC', 'en'), '¥1 ABC')
  t.deepEqual(formatShort('¥1 ABC DEF', 'en'), '¥1 ABC DEF')
})

test('¥1 JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('¥1 JPY', 'en'), '¥1')
  t.deepEqual(formatShort('¥1 JPY,', 'en'), '¥1,')
  t.deepEqual(formatShort('X ¥1 JPY', 'en'), 'X ¥1')
  t.deepEqual(formatShort('X ¥1 JPY ABC', 'en'), 'X ¥1 ABC')
  t.deepEqual(formatShort('X ¥1 JPY ABC DEF', 'en'), 'X ¥1 ABC DEF')
  t.deepEqual(formatShort('¥1 JPY ABC', 'en'), '¥1 ABC')
  t.deepEqual(formatShort('¥1 JPY ABC DEF', 'en'), '¥1 ABC DEF')
})

test('1 ¥', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('1 ¥', 'en'), '¥1')
  t.deepEqual(formatShort('1 ¥,', 'en'), '¥1,')
  t.deepEqual(formatShort('X 1 ¥', 'en'), 'X ¥1')
  t.deepEqual(formatShort('X 1 ¥ ABC', 'en'), 'X ¥1 ABC')
  t.deepEqual(formatShort('X 1 ¥ ABC DEF', 'en'), 'X ¥1 ABC DEF')
  t.deepEqual(formatShort('1 ¥ ABC', 'en'), '¥1 ABC')
  t.deepEqual(formatShort('1 ¥ ABC DEF', 'en'), '¥1 ABC DEF')
})

test('1 ¥ JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('1 ¥ JPY', 'en'), '¥1')
  t.deepEqual(formatShort('1 ¥ JPY,', 'en'), '¥1,')
  t.deepEqual(formatShort('X 1 ¥ JPY', 'en'), 'X ¥1')
  t.deepEqual(formatShort('X 1 ¥ JPY ABC', 'en'), 'X ¥1 ABC')
  t.deepEqual(formatShort('X 1 ¥ JPY ABC DEF', 'en'), 'X ¥1 ABC DEF')
  t.deepEqual(formatShort('1 ¥ JPY ABC', 'en'), '¥1 ABC')
  t.deepEqual(formatShort('1 ¥ JPY ABC DEF', 'en'), '¥1 ABC DEF')
})

test('¥123,456', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('¥123,456', 'en'), '¥123,456')
  t.deepEqual(formatShort('¥123,456,', 'en'), '¥123,456,')
  t.deepEqual(formatShort('X ¥123,456', 'en'), 'X ¥123,456')
  t.deepEqual(formatShort('X ¥123,456 ABC', 'en'), 'X ¥123,456 ABC')
  t.deepEqual(formatShort('X ¥123,456 ABC DEF', 'en'), 'X ¥123,456 ABC DEF')
  t.deepEqual(formatShort('¥123,456 ABC', 'en'), '¥123,456 ABC')
  t.deepEqual(formatShort('¥123,456 ABC DEF', 'en'), '¥123,456 ABC DEF')
})

test('¥123,456 JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('¥123,456 JPY', 'en'), '¥123,456')
  t.deepEqual(formatShort('¥123,456 JPY,', 'en'), '¥123,456,')
  t.deepEqual(formatShort('X ¥123,456 JPY', 'en'), 'X ¥123,456')
  t.deepEqual(formatShort('X ¥123,456 JPY ABC', 'en'), 'X ¥123,456 ABC')
  t.deepEqual(formatShort('X ¥123,456 JPY ABC DEF', 'en'), 'X ¥123,456 ABC DEF')
  t.deepEqual(formatShort('¥123,456 JPY ABC', 'en'), '¥123,456 ABC')
  t.deepEqual(formatShort('¥123,456 JPY ABC DEF', 'en'), '¥123,456 ABC DEF')
})

test('123.456 ¥', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('123.456 ¥', 'en'), '¥123,456')
  t.deepEqual(formatShort('123.456 ¥,', 'en'), '¥123,456,')
  t.deepEqual(formatShort('X 123.456 ¥', 'en'), 'X ¥123,456')
  t.deepEqual(formatShort('X 123.456 ¥ ABC', 'en'), 'X ¥123,456 ABC')
  t.deepEqual(formatShort('X 123.456 ¥ ABC DEF', 'en'), 'X ¥123,456 ABC DEF')
  t.deepEqual(formatShort('123.456 ¥ ABC', 'en'), '¥123,456 ABC')
  t.deepEqual(formatShort('123.456 ¥ ABC DEF', 'en'), '¥123,456 ABC DEF')
})

test('123.456 ¥ JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('123.456 ¥ JPY', 'en'), '¥123,456')
  t.deepEqual(formatShort('123.456 ¥ JPY,', 'en'), '¥123,456,')
  t.deepEqual(formatShort('X 123.456 ¥ JPY', 'en'), 'X ¥123,456')
  t.deepEqual(formatShort('X 123.456 ¥ JPY ABC', 'en'), 'X ¥123,456 ABC')
  t.deepEqual(
    formatShort('X 123.456 ¥ JPY ABC DEF', 'en'),
    'X ¥123,456 ABC DEF'
  )
  t.deepEqual(formatShort('123.456 ¥ JPY ABC', 'en'), '¥123,456 ABC')
  t.deepEqual(formatShort('123.456 ¥ JPY ABC DEF', 'en'), '¥123,456 ABC DEF')
})

test('¥123,456,789', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('¥123,456,789', 'en'), '¥123,456,789')
  t.deepEqual(formatShort('¥123,456,789,', 'en'), '¥123,456,789,')
  t.deepEqual(formatShort('X ¥123,456,789', 'en'), 'X ¥123,456,789')
  t.deepEqual(formatShort('X ¥123,456,789 ABC', 'en'), 'X ¥123,456,789 ABC')
  t.deepEqual(
    formatShort('X ¥123,456,789 ABC DEF', 'en'),
    'X ¥123,456,789 ABC DEF'
  )
  t.deepEqual(formatShort('¥123,456,789 ABC', 'en'), '¥123,456,789 ABC')
  t.deepEqual(formatShort('¥123,456,789 ABC DEF', 'en'), '¥123,456,789 ABC DEF')
})

test('¥123,456,789 JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('¥123,456,789 JPY', 'en'), '¥123,456,789')
  t.deepEqual(formatShort('¥123,456,789 JPY,', 'en'), '¥123,456,789,')
  t.deepEqual(formatShort('X ¥123,456,789 JPY', 'en'), 'X ¥123,456,789')
  t.deepEqual(formatShort('X ¥123,456,789 JPY ABC', 'en'), 'X ¥123,456,789 ABC')
  t.deepEqual(
    formatShort('X ¥123,456,789 JPY ABC DEF', 'en'),
    'X ¥123,456,789 ABC DEF'
  )
  t.deepEqual(formatShort('¥123,456,789 JPY ABC', 'en'), '¥123,456,789 ABC')
  t.deepEqual(
    formatShort('¥123,456,789 JPY ABC DEF', 'en'),
    '¥123,456,789 ABC DEF'
  )
})

test('123.456.789 ¥', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('123.456.789 ¥', 'en'), '¥123,456,789')
  t.deepEqual(formatShort('123.456.789 ¥,', 'en'), '¥123,456,789,')
  t.deepEqual(formatShort('X 123.456.789 ¥', 'en'), 'X ¥123,456,789')
  t.deepEqual(formatShort('X 123.456.789 ¥ ABC', 'en'), 'X ¥123,456,789 ABC')
  t.deepEqual(
    formatShort('X 123.456.789 ¥ ABC DEF', 'en'),
    'X ¥123,456,789 ABC DEF'
  )
  t.deepEqual(formatShort('123.456.789 ¥ ABC', 'en'), '¥123,456,789 ABC')
  t.deepEqual(
    formatShort('123.456.789 ¥ ABC DEF', 'en'),
    '¥123,456,789 ABC DEF'
  )
})

test('123.456.789 ¥ JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('123.456.789 ¥ JPY', 'en'), '¥123,456,789')
  t.deepEqual(formatShort('123.456.789 ¥ JPY,', 'en'), '¥123,456,789,')
  t.deepEqual(formatShort('X 123.456.789 ¥ JPY', 'en'), 'X ¥123,456,789')
  t.deepEqual(
    formatShort('X 123.456.789 ¥ JPY ABC', 'en'),
    'X ¥123,456,789 ABC'
  )
  t.deepEqual(
    formatShort('X 123.456.789 ¥ JPY ABC DEF', 'en'),
    'X ¥123,456,789 ABC DEF'
  )
  t.deepEqual(formatShort('123.456.789 ¥ JPY ABC', 'en'), '¥123,456,789 ABC')
  t.deepEqual(
    formatShort('123.456.789 ¥ JPY ABC DEF', 'en'),
    '¥123,456,789 ABC DEF'
  )
})

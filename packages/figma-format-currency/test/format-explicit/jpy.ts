import test from 'ava'

import { formatExplicit } from '../../src/utilities/format-currency/format-explicit.js'

test('¥1', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('¥1', 'en'), '¥1 JPY')
  t.deepEqual(formatExplicit('¥1,', 'en'), '¥1 JPY,')
  t.deepEqual(formatExplicit('X ¥1', 'en'), 'X ¥1 JPY')
  t.deepEqual(formatExplicit('X ¥1 ABC', 'en'), 'X ¥1 JPY ABC')
  t.deepEqual(formatExplicit('X ¥1 ABC DEF', 'en'), 'X ¥1 JPY ABC DEF')
  t.deepEqual(formatExplicit('¥1 ABC', 'en'), '¥1 JPY ABC')
  t.deepEqual(formatExplicit('¥1 ABC DEF', 'en'), '¥1 JPY ABC DEF')
})

test('¥1 JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('¥1 JPY', 'en'), '¥1 JPY')
  t.deepEqual(formatExplicit('¥1 JPY,', 'en'), '¥1 JPY,')
  t.deepEqual(formatExplicit('X ¥1 JPY', 'en'), 'X ¥1 JPY')
  t.deepEqual(formatExplicit('X ¥1 JPY ABC', 'en'), 'X ¥1 JPY ABC')
  t.deepEqual(formatExplicit('X ¥1 JPY ABC DEF', 'en'), 'X ¥1 JPY ABC DEF')
  t.deepEqual(formatExplicit('¥1 JPY ABC', 'en'), '¥1 JPY ABC')
  t.deepEqual(formatExplicit('¥1 JPY ABC DEF', 'en'), '¥1 JPY ABC DEF')
})

test('1 ¥', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('1 ¥', 'en'), '¥1 JPY')
  t.deepEqual(formatExplicit('1 ¥,', 'en'), '¥1 JPY,')
  t.deepEqual(formatExplicit('X 1 ¥', 'en'), 'X ¥1 JPY')
  t.deepEqual(formatExplicit('X 1 ¥ ABC', 'en'), 'X ¥1 JPY ABC')
  t.deepEqual(formatExplicit('X 1 ¥ ABC DEF', 'en'), 'X ¥1 JPY ABC DEF')
  t.deepEqual(formatExplicit('1 ¥ ABC', 'en'), '¥1 JPY ABC')
  t.deepEqual(formatExplicit('1 ¥ ABC DEF', 'en'), '¥1 JPY ABC DEF')
})

test('1 ¥ JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('1 ¥ JPY', 'en'), '¥1 JPY')
  t.deepEqual(formatExplicit('1 ¥ JPY,', 'en'), '¥1 JPY,')
  t.deepEqual(formatExplicit('X 1 ¥ JPY', 'en'), 'X ¥1 JPY')
  t.deepEqual(formatExplicit('X 1 ¥ JPY ABC', 'en'), 'X ¥1 JPY ABC')
  t.deepEqual(formatExplicit('X 1 ¥ JPY ABC DEF', 'en'), 'X ¥1 JPY ABC DEF')
  t.deepEqual(formatExplicit('1 ¥ JPY ABC', 'en'), '¥1 JPY ABC')
  t.deepEqual(formatExplicit('1 ¥ JPY ABC DEF', 'en'), '¥1 JPY ABC DEF')
})

test('¥123,456', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('¥123,456', 'en'), '¥123,456 JPY')
  t.deepEqual(formatExplicit('¥123,456,', 'en'), '¥123,456 JPY,')
  t.deepEqual(formatExplicit('X ¥123,456', 'en'), 'X ¥123,456 JPY')
  t.deepEqual(formatExplicit('X ¥123,456 ABC', 'en'), 'X ¥123,456 JPY ABC')
  t.deepEqual(
    formatExplicit('X ¥123,456 ABC DEF', 'en'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.deepEqual(formatExplicit('¥123,456 ABC', 'en'), '¥123,456 JPY ABC')
  t.deepEqual(formatExplicit('¥123,456 ABC DEF', 'en'), '¥123,456 JPY ABC DEF')
})

test('¥123,456 JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('¥123,456 JPY', 'en'), '¥123,456 JPY')
  t.deepEqual(formatExplicit('¥123,456 JPY,', 'en'), '¥123,456 JPY,')
  t.deepEqual(formatExplicit('X ¥123,456 JPY', 'en'), 'X ¥123,456 JPY')
  t.deepEqual(formatExplicit('X ¥123,456 JPY ABC', 'en'), 'X ¥123,456 JPY ABC')
  t.deepEqual(
    formatExplicit('X ¥123,456 JPY ABC DEF', 'en'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.deepEqual(formatExplicit('¥123,456 JPY ABC', 'en'), '¥123,456 JPY ABC')
  t.deepEqual(
    formatExplicit('¥123,456 JPY ABC DEF', 'en'),
    '¥123,456 JPY ABC DEF'
  )
})

test('123.456 ¥', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('123.456 ¥', 'en'), '¥123,456 JPY')
  t.deepEqual(formatExplicit('123.456 ¥,', 'en'), '¥123,456 JPY,')
  t.deepEqual(formatExplicit('X 123.456 ¥', 'en'), 'X ¥123,456 JPY')
  t.deepEqual(formatExplicit('X 123.456 ¥ ABC', 'en'), 'X ¥123,456 JPY ABC')
  t.deepEqual(
    formatExplicit('X 123.456 ¥ ABC DEF', 'en'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.deepEqual(formatExplicit('123.456 ¥ ABC', 'en'), '¥123,456 JPY ABC')
  t.deepEqual(formatExplicit('123.456 ¥ ABC DEF', 'en'), '¥123,456 JPY ABC DEF')
})

test('123.456 ¥ JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('123.456 ¥ JPY', 'en'), '¥123,456 JPY')
  t.deepEqual(formatExplicit('123.456 ¥ JPY,', 'en'), '¥123,456 JPY,')
  t.deepEqual(formatExplicit('X 123.456 ¥ JPY', 'en'), 'X ¥123,456 JPY')
  t.deepEqual(formatExplicit('X 123.456 ¥ JPY ABC', 'en'), 'X ¥123,456 JPY ABC')
  t.deepEqual(
    formatExplicit('X 123.456 ¥ JPY ABC DEF', 'en'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.deepEqual(formatExplicit('123.456 ¥ JPY ABC', 'en'), '¥123,456 JPY ABC')
  t.deepEqual(
    formatExplicit('123.456 ¥ JPY ABC DEF', 'en'),
    '¥123,456 JPY ABC DEF'
  )
})

test('¥123,456,789', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('¥123,456,789', 'en'), '¥123,456,789 JPY')
  t.deepEqual(formatExplicit('¥123,456,789,', 'en'), '¥123,456,789 JPY,')
  t.deepEqual(formatExplicit('X ¥123,456,789', 'en'), 'X ¥123,456,789 JPY')
  t.deepEqual(
    formatExplicit('X ¥123,456,789 ABC', 'en'),
    'X ¥123,456,789 JPY ABC'
  )
  t.deepEqual(
    formatExplicit('X ¥123,456,789 ABC DEF', 'en'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.deepEqual(formatExplicit('¥123,456,789 ABC', 'en'), '¥123,456,789 JPY ABC')
  t.deepEqual(
    formatExplicit('¥123,456,789 ABC DEF', 'en'),
    '¥123,456,789 JPY ABC DEF'
  )
})

test('¥123,456,789 JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('¥123,456,789 JPY', 'en'), '¥123,456,789 JPY')
  t.deepEqual(formatExplicit('¥123,456,789 JPY,', 'en'), '¥123,456,789 JPY,')
  t.deepEqual(formatExplicit('X ¥123,456,789 JPY', 'en'), 'X ¥123,456,789 JPY')
  t.deepEqual(
    formatExplicit('X ¥123,456,789 JPY ABC', 'en'),
    'X ¥123,456,789 JPY ABC'
  )
  t.deepEqual(
    formatExplicit('X ¥123,456,789 JPY ABC DEF', 'en'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.deepEqual(
    formatExplicit('¥123,456,789 JPY ABC', 'en'),
    '¥123,456,789 JPY ABC'
  )
  t.deepEqual(
    formatExplicit('¥123,456,789 JPY ABC DEF', 'en'),
    '¥123,456,789 JPY ABC DEF'
  )
})

test('123.456.789 ¥', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('123.456.789 ¥', 'en'), '¥123,456,789 JPY')
  t.deepEqual(formatExplicit('123.456.789 ¥,', 'en'), '¥123,456,789 JPY,')
  t.deepEqual(formatExplicit('X 123.456.789 ¥', 'en'), 'X ¥123,456,789 JPY')
  t.deepEqual(
    formatExplicit('X 123.456.789 ¥ ABC', 'en'),
    'X ¥123,456,789 JPY ABC'
  )
  t.deepEqual(
    formatExplicit('X 123.456.789 ¥ ABC DEF', 'en'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.deepEqual(formatExplicit('123.456.789 ¥ ABC', 'en'), '¥123,456,789 JPY ABC')
  t.deepEqual(
    formatExplicit('123.456.789 ¥ ABC DEF', 'en'),
    '¥123,456,789 JPY ABC DEF'
  )
})

test('123.456.789 ¥ JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatExplicit('123.456.789 ¥ JPY', 'en'), '¥123,456,789 JPY')
  t.deepEqual(formatExplicit('123.456.789 ¥ JPY,', 'en'), '¥123,456,789 JPY,')
  t.deepEqual(formatExplicit('X 123.456.789 ¥ JPY', 'en'), 'X ¥123,456,789 JPY')
  t.deepEqual(
    formatExplicit('X 123.456.789 ¥ JPY ABC', 'en'),
    'X ¥123,456,789 JPY ABC'
  )
  t.deepEqual(
    formatExplicit('X 123.456.789 ¥ JPY ABC DEF', 'en'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.deepEqual(
    formatExplicit('123.456.789 ¥ JPY ABC', 'en'),
    '¥123,456,789 JPY ABC'
  )
  t.deepEqual(
    formatExplicit('123.456.789 ¥ JPY ABC DEF', 'en'),
    '¥123,456,789 JPY ABC DEF'
  )
})

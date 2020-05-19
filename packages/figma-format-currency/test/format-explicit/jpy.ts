import { test } from 'tap'

import { formatExplicit } from '../../src/utilities/currency/format-explicit'

test('¥1', function (t) {
  t.plan(7)
  t.is(formatExplicit('¥1', 'en-US'), '¥1 JPY')
  t.is(formatExplicit('¥1,', 'en-US'), '¥1 JPY,')
  t.is(formatExplicit('X ¥1', 'en-US'), 'X ¥1 JPY')
  t.is(formatExplicit('X ¥1 ABC', 'en-US'), 'X ¥1 JPY ABC')
  t.is(formatExplicit('X ¥1 ABC DEF', 'en-US'), 'X ¥1 JPY ABC DEF')
  t.is(formatExplicit('¥1 ABC', 'en-US'), '¥1 JPY ABC')
  t.is(formatExplicit('¥1 ABC DEF', 'en-US'), '¥1 JPY ABC DEF')
})

test('¥1 JPY', function (t) {
  t.plan(7)
  t.is(formatExplicit('¥1 JPY', 'en-US'), '¥1 JPY')
  t.is(formatExplicit('¥1 JPY,', 'en-US'), '¥1 JPY,')
  t.is(formatExplicit('X ¥1 JPY', 'en-US'), 'X ¥1 JPY')
  t.is(formatExplicit('X ¥1 JPY ABC', 'en-US'), 'X ¥1 JPY ABC')
  t.is(formatExplicit('X ¥1 JPY ABC DEF', 'en-US'), 'X ¥1 JPY ABC DEF')
  t.is(formatExplicit('¥1 JPY ABC', 'en-US'), '¥1 JPY ABC')
  t.is(formatExplicit('¥1 JPY ABC DEF', 'en-US'), '¥1 JPY ABC DEF')
})

test('1 ¥', function (t) {
  t.plan(7)
  t.is(formatExplicit('1 ¥', 'en-US'), '¥1 JPY')
  t.is(formatExplicit('1 ¥,', 'en-US'), '¥1 JPY,')
  t.is(formatExplicit('X 1 ¥', 'en-US'), 'X ¥1 JPY')
  t.is(formatExplicit('X 1 ¥ ABC', 'en-US'), 'X ¥1 JPY ABC')
  t.is(formatExplicit('X 1 ¥ ABC DEF', 'en-US'), 'X ¥1 JPY ABC DEF')
  t.is(formatExplicit('1 ¥ ABC', 'en-US'), '¥1 JPY ABC')
  t.is(formatExplicit('1 ¥ ABC DEF', 'en-US'), '¥1 JPY ABC DEF')
})

test('1 ¥ JPY', function (t) {
  t.plan(7)
  t.is(formatExplicit('1 ¥ JPY', 'en-US'), '¥1 JPY')
  t.is(formatExplicit('1 ¥ JPY,', 'en-US'), '¥1 JPY,')
  t.is(formatExplicit('X 1 ¥ JPY', 'en-US'), 'X ¥1 JPY')
  t.is(formatExplicit('X 1 ¥ JPY ABC', 'en-US'), 'X ¥1 JPY ABC')
  t.is(formatExplicit('X 1 ¥ JPY ABC DEF', 'en-US'), 'X ¥1 JPY ABC DEF')
  t.is(formatExplicit('1 ¥ JPY ABC', 'en-US'), '¥1 JPY ABC')
  t.is(formatExplicit('1 ¥ JPY ABC DEF', 'en-US'), '¥1 JPY ABC DEF')
})

test('¥123,456', function (t) {
  t.plan(7)
  t.is(formatExplicit('¥123,456', 'en-US'), '¥123,456 JPY')
  t.is(formatExplicit('¥123,456,', 'en-US'), '¥123,456 JPY,')
  t.is(formatExplicit('X ¥123,456', 'en-US'), 'X ¥123,456 JPY')
  t.is(formatExplicit('X ¥123,456 ABC', 'en-US'), 'X ¥123,456 JPY ABC')
  t.is(formatExplicit('X ¥123,456 ABC DEF', 'en-US'), 'X ¥123,456 JPY ABC DEF')
  t.is(formatExplicit('¥123,456 ABC', 'en-US'), '¥123,456 JPY ABC')
  t.is(formatExplicit('¥123,456 ABC DEF', 'en-US'), '¥123,456 JPY ABC DEF')
})

test('¥123,456 JPY', function (t) {
  t.plan(7)
  t.is(formatExplicit('¥123,456 JPY', 'en-US'), '¥123,456 JPY')
  t.is(formatExplicit('¥123,456 JPY,', 'en-US'), '¥123,456 JPY,')
  t.is(formatExplicit('X ¥123,456 JPY', 'en-US'), 'X ¥123,456 JPY')
  t.is(formatExplicit('X ¥123,456 JPY ABC', 'en-US'), 'X ¥123,456 JPY ABC')
  t.is(
    formatExplicit('X ¥123,456 JPY ABC DEF', 'en-US'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.is(formatExplicit('¥123,456 JPY ABC', 'en-US'), '¥123,456 JPY ABC')
  t.is(formatExplicit('¥123,456 JPY ABC DEF', 'en-US'), '¥123,456 JPY ABC DEF')
})

test('123.456 ¥', function (t) {
  t.plan(7)
  t.is(formatExplicit('123.456 ¥', 'en-US'), '¥123,456 JPY')
  t.is(formatExplicit('123.456 ¥,', 'en-US'), '¥123,456 JPY,')
  t.is(formatExplicit('X 123.456 ¥', 'en-US'), 'X ¥123,456 JPY')
  t.is(formatExplicit('X 123.456 ¥ ABC', 'en-US'), 'X ¥123,456 JPY ABC')
  t.is(formatExplicit('X 123.456 ¥ ABC DEF', 'en-US'), 'X ¥123,456 JPY ABC DEF')
  t.is(formatExplicit('123.456 ¥ ABC', 'en-US'), '¥123,456 JPY ABC')
  t.is(formatExplicit('123.456 ¥ ABC DEF', 'en-US'), '¥123,456 JPY ABC DEF')
})

test('123.456 ¥ JPY', function (t) {
  t.plan(7)
  t.is(formatExplicit('123.456 ¥ JPY', 'en-US'), '¥123,456 JPY')
  t.is(formatExplicit('123.456 ¥ JPY,', 'en-US'), '¥123,456 JPY,')
  t.is(formatExplicit('X 123.456 ¥ JPY', 'en-US'), 'X ¥123,456 JPY')
  t.is(formatExplicit('X 123.456 ¥ JPY ABC', 'en-US'), 'X ¥123,456 JPY ABC')
  t.is(
    formatExplicit('X 123.456 ¥ JPY ABC DEF', 'en-US'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.is(formatExplicit('123.456 ¥ JPY ABC', 'en-US'), '¥123,456 JPY ABC')
  t.is(formatExplicit('123.456 ¥ JPY ABC DEF', 'en-US'), '¥123,456 JPY ABC DEF')
})

test('¥123,456,789', function (t) {
  t.plan(7)
  t.is(formatExplicit('¥123,456,789', 'en-US'), '¥123,456,789 JPY')
  t.is(formatExplicit('¥123,456,789,', 'en-US'), '¥123,456,789 JPY,')
  t.is(formatExplicit('X ¥123,456,789', 'en-US'), 'X ¥123,456,789 JPY')
  t.is(formatExplicit('X ¥123,456,789 ABC', 'en-US'), 'X ¥123,456,789 JPY ABC')
  t.is(
    formatExplicit('X ¥123,456,789 ABC DEF', 'en-US'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.is(formatExplicit('¥123,456,789 ABC', 'en-US'), '¥123,456,789 JPY ABC')
  t.is(
    formatExplicit('¥123,456,789 ABC DEF', 'en-US'),
    '¥123,456,789 JPY ABC DEF'
  )
})

test('¥123,456,789 JPY', function (t) {
  t.plan(7)
  t.is(formatExplicit('¥123,456,789 JPY', 'en-US'), '¥123,456,789 JPY')
  t.is(formatExplicit('¥123,456,789 JPY,', 'en-US'), '¥123,456,789 JPY,')
  t.is(formatExplicit('X ¥123,456,789 JPY', 'en-US'), 'X ¥123,456,789 JPY')
  t.is(
    formatExplicit('X ¥123,456,789 JPY ABC', 'en-US'),
    'X ¥123,456,789 JPY ABC'
  )
  t.is(
    formatExplicit('X ¥123,456,789 JPY ABC DEF', 'en-US'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.is(formatExplicit('¥123,456,789 JPY ABC', 'en-US'), '¥123,456,789 JPY ABC')
  t.is(
    formatExplicit('¥123,456,789 JPY ABC DEF', 'en-US'),
    '¥123,456,789 JPY ABC DEF'
  )
})

test('123.456.789 ¥', function (t) {
  t.plan(7)
  t.is(formatExplicit('123.456.789 ¥', 'en-US'), '¥123,456,789 JPY')
  t.is(formatExplicit('123.456.789 ¥,', 'en-US'), '¥123,456,789 JPY,')
  t.is(formatExplicit('X 123.456.789 ¥', 'en-US'), 'X ¥123,456,789 JPY')
  t.is(formatExplicit('X 123.456.789 ¥ ABC', 'en-US'), 'X ¥123,456,789 JPY ABC')
  t.is(
    formatExplicit('X 123.456.789 ¥ ABC DEF', 'en-US'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.is(formatExplicit('123.456.789 ¥ ABC', 'en-US'), '¥123,456,789 JPY ABC')
  t.is(
    formatExplicit('123.456.789 ¥ ABC DEF', 'en-US'),
    '¥123,456,789 JPY ABC DEF'
  )
})

test('123.456.789 ¥ JPY', function (t) {
  t.plan(7)
  t.is(formatExplicit('123.456.789 ¥ JPY', 'en-US'), '¥123,456,789 JPY')
  t.is(formatExplicit('123.456.789 ¥ JPY,', 'en-US'), '¥123,456,789 JPY,')
  t.is(formatExplicit('X 123.456.789 ¥ JPY', 'en-US'), 'X ¥123,456,789 JPY')
  t.is(
    formatExplicit('X 123.456.789 ¥ JPY ABC', 'en-US'),
    'X ¥123,456,789 JPY ABC'
  )
  t.is(
    formatExplicit('X 123.456.789 ¥ JPY ABC DEF', 'en-US'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.is(formatExplicit('123.456.789 ¥ JPY ABC', 'en-US'), '¥123,456,789 JPY ABC')
  t.is(
    formatExplicit('123.456.789 ¥ JPY ABC DEF', 'en-US'),
    '¥123,456,789 JPY ABC DEF'
  )
})

import { test } from 'tap'

import { formatExplicit } from '../../src/utilities/format-currency/format-explicit'

test('¥1', function (t) {
  t.plan(7)
  t.equal(formatExplicit('¥1', 'en'), '¥1 JPY')
  t.equal(formatExplicit('¥1,', 'en'), '¥1 JPY,')
  t.equal(formatExplicit('X ¥1', 'en'), 'X ¥1 JPY')
  t.equal(formatExplicit('X ¥1 ABC', 'en'), 'X ¥1 JPY ABC')
  t.equal(formatExplicit('X ¥1 ABC DEF', 'en'), 'X ¥1 JPY ABC DEF')
  t.equal(formatExplicit('¥1 ABC', 'en'), '¥1 JPY ABC')
  t.equal(formatExplicit('¥1 ABC DEF', 'en'), '¥1 JPY ABC DEF')
})

test('¥1 JPY', function (t) {
  t.plan(7)
  t.equal(formatExplicit('¥1 JPY', 'en'), '¥1 JPY')
  t.equal(formatExplicit('¥1 JPY,', 'en'), '¥1 JPY,')
  t.equal(formatExplicit('X ¥1 JPY', 'en'), 'X ¥1 JPY')
  t.equal(formatExplicit('X ¥1 JPY ABC', 'en'), 'X ¥1 JPY ABC')
  t.equal(formatExplicit('X ¥1 JPY ABC DEF', 'en'), 'X ¥1 JPY ABC DEF')
  t.equal(formatExplicit('¥1 JPY ABC', 'en'), '¥1 JPY ABC')
  t.equal(formatExplicit('¥1 JPY ABC DEF', 'en'), '¥1 JPY ABC DEF')
})

test('1 ¥', function (t) {
  t.plan(7)
  t.equal(formatExplicit('1 ¥', 'en'), '¥1 JPY')
  t.equal(formatExplicit('1 ¥,', 'en'), '¥1 JPY,')
  t.equal(formatExplicit('X 1 ¥', 'en'), 'X ¥1 JPY')
  t.equal(formatExplicit('X 1 ¥ ABC', 'en'), 'X ¥1 JPY ABC')
  t.equal(formatExplicit('X 1 ¥ ABC DEF', 'en'), 'X ¥1 JPY ABC DEF')
  t.equal(formatExplicit('1 ¥ ABC', 'en'), '¥1 JPY ABC')
  t.equal(formatExplicit('1 ¥ ABC DEF', 'en'), '¥1 JPY ABC DEF')
})

test('1 ¥ JPY', function (t) {
  t.plan(7)
  t.equal(formatExplicit('1 ¥ JPY', 'en'), '¥1 JPY')
  t.equal(formatExplicit('1 ¥ JPY,', 'en'), '¥1 JPY,')
  t.equal(formatExplicit('X 1 ¥ JPY', 'en'), 'X ¥1 JPY')
  t.equal(formatExplicit('X 1 ¥ JPY ABC', 'en'), 'X ¥1 JPY ABC')
  t.equal(formatExplicit('X 1 ¥ JPY ABC DEF', 'en'), 'X ¥1 JPY ABC DEF')
  t.equal(formatExplicit('1 ¥ JPY ABC', 'en'), '¥1 JPY ABC')
  t.equal(formatExplicit('1 ¥ JPY ABC DEF', 'en'), '¥1 JPY ABC DEF')
})

test('¥123,456', function (t) {
  t.plan(7)
  t.equal(formatExplicit('¥123,456', 'en'), '¥123,456 JPY')
  t.equal(formatExplicit('¥123,456,', 'en'), '¥123,456 JPY,')
  t.equal(formatExplicit('X ¥123,456', 'en'), 'X ¥123,456 JPY')
  t.equal(formatExplicit('X ¥123,456 ABC', 'en'), 'X ¥123,456 JPY ABC')
  t.equal(formatExplicit('X ¥123,456 ABC DEF', 'en'), 'X ¥123,456 JPY ABC DEF')
  t.equal(formatExplicit('¥123,456 ABC', 'en'), '¥123,456 JPY ABC')
  t.equal(formatExplicit('¥123,456 ABC DEF', 'en'), '¥123,456 JPY ABC DEF')
})

test('¥123,456 JPY', function (t) {
  t.plan(7)
  t.equal(formatExplicit('¥123,456 JPY', 'en'), '¥123,456 JPY')
  t.equal(formatExplicit('¥123,456 JPY,', 'en'), '¥123,456 JPY,')
  t.equal(formatExplicit('X ¥123,456 JPY', 'en'), 'X ¥123,456 JPY')
  t.equal(formatExplicit('X ¥123,456 JPY ABC', 'en'), 'X ¥123,456 JPY ABC')
  t.equal(
    formatExplicit('X ¥123,456 JPY ABC DEF', 'en'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.equal(formatExplicit('¥123,456 JPY ABC', 'en'), '¥123,456 JPY ABC')
  t.equal(formatExplicit('¥123,456 JPY ABC DEF', 'en'), '¥123,456 JPY ABC DEF')
})

test('123.456 ¥', function (t) {
  t.plan(7)
  t.equal(formatExplicit('123.456 ¥', 'en'), '¥123,456 JPY')
  t.equal(formatExplicit('123.456 ¥,', 'en'), '¥123,456 JPY,')
  t.equal(formatExplicit('X 123.456 ¥', 'en'), 'X ¥123,456 JPY')
  t.equal(formatExplicit('X 123.456 ¥ ABC', 'en'), 'X ¥123,456 JPY ABC')
  t.equal(formatExplicit('X 123.456 ¥ ABC DEF', 'en'), 'X ¥123,456 JPY ABC DEF')
  t.equal(formatExplicit('123.456 ¥ ABC', 'en'), '¥123,456 JPY ABC')
  t.equal(formatExplicit('123.456 ¥ ABC DEF', 'en'), '¥123,456 JPY ABC DEF')
})

test('123.456 ¥ JPY', function (t) {
  t.plan(7)
  t.equal(formatExplicit('123.456 ¥ JPY', 'en'), '¥123,456 JPY')
  t.equal(formatExplicit('123.456 ¥ JPY,', 'en'), '¥123,456 JPY,')
  t.equal(formatExplicit('X 123.456 ¥ JPY', 'en'), 'X ¥123,456 JPY')
  t.equal(formatExplicit('X 123.456 ¥ JPY ABC', 'en'), 'X ¥123,456 JPY ABC')
  t.equal(
    formatExplicit('X 123.456 ¥ JPY ABC DEF', 'en'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.equal(formatExplicit('123.456 ¥ JPY ABC', 'en'), '¥123,456 JPY ABC')
  t.equal(formatExplicit('123.456 ¥ JPY ABC DEF', 'en'), '¥123,456 JPY ABC DEF')
})

test('¥123,456,789', function (t) {
  t.plan(7)
  t.equal(formatExplicit('¥123,456,789', 'en'), '¥123,456,789 JPY')
  t.equal(formatExplicit('¥123,456,789,', 'en'), '¥123,456,789 JPY,')
  t.equal(formatExplicit('X ¥123,456,789', 'en'), 'X ¥123,456,789 JPY')
  t.equal(formatExplicit('X ¥123,456,789 ABC', 'en'), 'X ¥123,456,789 JPY ABC')
  t.equal(
    formatExplicit('X ¥123,456,789 ABC DEF', 'en'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.equal(formatExplicit('¥123,456,789 ABC', 'en'), '¥123,456,789 JPY ABC')
  t.equal(
    formatExplicit('¥123,456,789 ABC DEF', 'en'),
    '¥123,456,789 JPY ABC DEF'
  )
})

test('¥123,456,789 JPY', function (t) {
  t.plan(7)
  t.equal(formatExplicit('¥123,456,789 JPY', 'en'), '¥123,456,789 JPY')
  t.equal(formatExplicit('¥123,456,789 JPY,', 'en'), '¥123,456,789 JPY,')
  t.equal(formatExplicit('X ¥123,456,789 JPY', 'en'), 'X ¥123,456,789 JPY')
  t.equal(
    formatExplicit('X ¥123,456,789 JPY ABC', 'en'),
    'X ¥123,456,789 JPY ABC'
  )
  t.equal(
    formatExplicit('X ¥123,456,789 JPY ABC DEF', 'en'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.equal(formatExplicit('¥123,456,789 JPY ABC', 'en'), '¥123,456,789 JPY ABC')
  t.equal(
    formatExplicit('¥123,456,789 JPY ABC DEF', 'en'),
    '¥123,456,789 JPY ABC DEF'
  )
})

test('123.456.789 ¥', function (t) {
  t.plan(7)
  t.equal(formatExplicit('123.456.789 ¥', 'en'), '¥123,456,789 JPY')
  t.equal(formatExplicit('123.456.789 ¥,', 'en'), '¥123,456,789 JPY,')
  t.equal(formatExplicit('X 123.456.789 ¥', 'en'), 'X ¥123,456,789 JPY')
  t.equal(formatExplicit('X 123.456.789 ¥ ABC', 'en'), 'X ¥123,456,789 JPY ABC')
  t.equal(
    formatExplicit('X 123.456.789 ¥ ABC DEF', 'en'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.equal(formatExplicit('123.456.789 ¥ ABC', 'en'), '¥123,456,789 JPY ABC')
  t.equal(
    formatExplicit('123.456.789 ¥ ABC DEF', 'en'),
    '¥123,456,789 JPY ABC DEF'
  )
})

test('123.456.789 ¥ JPY', function (t) {
  t.plan(7)
  t.equal(formatExplicit('123.456.789 ¥ JPY', 'en'), '¥123,456,789 JPY')
  t.equal(formatExplicit('123.456.789 ¥ JPY,', 'en'), '¥123,456,789 JPY,')
  t.equal(formatExplicit('X 123.456.789 ¥ JPY', 'en'), 'X ¥123,456,789 JPY')
  t.equal(
    formatExplicit('X 123.456.789 ¥ JPY ABC', 'en'),
    'X ¥123,456,789 JPY ABC'
  )
  t.equal(
    formatExplicit('X 123.456.789 ¥ JPY ABC DEF', 'en'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.equal(formatExplicit('123.456.789 ¥ JPY ABC', 'en'), '¥123,456,789 JPY ABC')
  t.equal(
    formatExplicit('123.456.789 ¥ JPY ABC DEF', 'en'),
    '¥123,456,789 JPY ABC DEF'
  )
})

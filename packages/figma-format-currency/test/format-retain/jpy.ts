import test from 'ava'

import { formatRetain } from '../../src/utilities/format-currency/format-retain.js'

test('¥1', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('¥1', 'en'), '¥1')
  t.deepEqual(formatRetain('¥1,', 'en'), '¥1,')
  t.deepEqual(formatRetain('X ¥1', 'en'), 'X ¥1')
  t.deepEqual(formatRetain('X ¥1 ABC', 'en'), 'X ¥1 ABC')
  t.deepEqual(formatRetain('X ¥1 ABC DEF', 'en'), 'X ¥1 ABC DEF')
  t.deepEqual(formatRetain('¥1 ABC', 'en'), '¥1 ABC')
  t.deepEqual(formatRetain('¥1 ABC DEF', 'en'), '¥1 ABC DEF')
})

test('¥1 JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('¥1 JPY', 'en'), '¥1 JPY')
  t.deepEqual(formatRetain('¥1 JPY,', 'en'), '¥1 JPY,')
  t.deepEqual(formatRetain('X ¥1 JPY', 'en'), 'X ¥1 JPY')
  t.deepEqual(formatRetain('X ¥1 JPY ABC', 'en'), 'X ¥1 JPY ABC')
  t.deepEqual(formatRetain('X ¥1 JPY ABC DEF', 'en'), 'X ¥1 JPY ABC DEF')
  t.deepEqual(formatRetain('¥1 JPY ABC', 'en'), '¥1 JPY ABC')
  t.deepEqual(formatRetain('¥1 JPY ABC DEF', 'en'), '¥1 JPY ABC DEF')
})

test('1 ¥', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('1 ¥', 'en'), '¥1')
  t.deepEqual(formatRetain('1 ¥,', 'en'), '¥1,')
  t.deepEqual(formatRetain('X 1 ¥', 'en'), 'X ¥1')
  t.deepEqual(formatRetain('X 1 ¥ ABC', 'en'), 'X ¥1 ABC')
  t.deepEqual(formatRetain('X 1 ¥ ABC DEF', 'en'), 'X ¥1 ABC DEF')
  t.deepEqual(formatRetain('1 ¥ ABC', 'en'), '¥1 ABC')
  t.deepEqual(formatRetain('1 ¥ ABC DEF', 'en'), '¥1 ABC DEF')
})

test('1 ¥ JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('1 ¥ JPY', 'en'), '¥1 JPY')
  t.deepEqual(formatRetain('1 ¥ JPY,', 'en'), '¥1 JPY,')
  t.deepEqual(formatRetain('X 1 ¥ JPY', 'en'), 'X ¥1 JPY')
  t.deepEqual(formatRetain('X 1 ¥ JPY ABC', 'en'), 'X ¥1 JPY ABC')
  t.deepEqual(formatRetain('X 1 ¥ JPY ABC DEF', 'en'), 'X ¥1 JPY ABC DEF')
  t.deepEqual(formatRetain('1 ¥ JPY ABC', 'en'), '¥1 JPY ABC')
  t.deepEqual(formatRetain('1 ¥ JPY ABC DEF', 'en'), '¥1 JPY ABC DEF')
})

test('¥123,456', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('¥123,456', 'en'), '¥123,456')
  t.deepEqual(formatRetain('¥123,456,', 'en'), '¥123,456,')
  t.deepEqual(formatRetain('X ¥123,456', 'en'), 'X ¥123,456')
  t.deepEqual(formatRetain('X ¥123,456 ABC', 'en'), 'X ¥123,456 ABC')
  t.deepEqual(formatRetain('X ¥123,456 ABC DEF', 'en'), 'X ¥123,456 ABC DEF')
  t.deepEqual(formatRetain('¥123,456 ABC', 'en'), '¥123,456 ABC')
  t.deepEqual(formatRetain('¥123,456 ABC DEF', 'en'), '¥123,456 ABC DEF')
})

test('¥123,456 JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('¥123,456 JPY', 'en'), '¥123,456 JPY')
  t.deepEqual(formatRetain('¥123,456 JPY,', 'en'), '¥123,456 JPY,')
  t.deepEqual(formatRetain('X ¥123,456 JPY', 'en'), 'X ¥123,456 JPY')
  t.deepEqual(formatRetain('X ¥123,456 JPY ABC', 'en'), 'X ¥123,456 JPY ABC')
  t.deepEqual(
    formatRetain('X ¥123,456 JPY ABC DEF', 'en'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.deepEqual(formatRetain('¥123,456 JPY ABC', 'en'), '¥123,456 JPY ABC')
  t.deepEqual(
    formatRetain('¥123,456 JPY ABC DEF', 'en'),
    '¥123,456 JPY ABC DEF'
  )
})

test('123.456 ¥', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('123.456 ¥', 'en'), '¥123,456')
  t.deepEqual(formatRetain('123.456 ¥,', 'en'), '¥123,456,')
  t.deepEqual(formatRetain('X 123.456 ¥', 'en'), 'X ¥123,456')
  t.deepEqual(formatRetain('X 123.456 ¥ ABC', 'en'), 'X ¥123,456 ABC')
  t.deepEqual(formatRetain('X 123.456 ¥ ABC DEF', 'en'), 'X ¥123,456 ABC DEF')
  t.deepEqual(formatRetain('123.456 ¥ ABC', 'en'), '¥123,456 ABC')
  t.deepEqual(formatRetain('123.456 ¥ ABC DEF', 'en'), '¥123,456 ABC DEF')
})

test('123.456 ¥ JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('123.456 ¥ JPY', 'en'), '¥123,456 JPY')
  t.deepEqual(formatRetain('123.456 ¥ JPY,', 'en'), '¥123,456 JPY,')
  t.deepEqual(formatRetain('X 123.456 ¥ JPY', 'en'), 'X ¥123,456 JPY')
  t.deepEqual(formatRetain('X 123.456 ¥ JPY ABC', 'en'), 'X ¥123,456 JPY ABC')
  t.deepEqual(
    formatRetain('X 123.456 ¥ JPY ABC DEF', 'en'),
    'X ¥123,456 JPY ABC DEF'
  )
  t.deepEqual(formatRetain('123.456 ¥ JPY ABC', 'en'), '¥123,456 JPY ABC')
  t.deepEqual(
    formatRetain('123.456 ¥ JPY ABC DEF', 'en'),
    '¥123,456 JPY ABC DEF'
  )
})

test('¥123,456,789', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('¥123,456,789', 'en'), '¥123,456,789')
  t.deepEqual(formatRetain('¥123,456,789,', 'en'), '¥123,456,789,')
  t.deepEqual(formatRetain('X ¥123,456,789', 'en'), 'X ¥123,456,789')
  t.deepEqual(formatRetain('X ¥123,456,789 ABC', 'en'), 'X ¥123,456,789 ABC')
  t.deepEqual(
    formatRetain('X ¥123,456,789 ABC DEF', 'en'),
    'X ¥123,456,789 ABC DEF'
  )
  t.deepEqual(formatRetain('¥123,456,789 ABC', 'en'), '¥123,456,789 ABC')
  t.deepEqual(
    formatRetain('¥123,456,789 ABC DEF', 'en'),
    '¥123,456,789 ABC DEF'
  )
})

test('¥123,456,789 JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('¥123,456,789 JPY', 'en'), '¥123,456,789 JPY')
  t.deepEqual(formatRetain('¥123,456,789 JPY,', 'en'), '¥123,456,789 JPY,')
  t.deepEqual(formatRetain('X ¥123,456,789 JPY', 'en'), 'X ¥123,456,789 JPY')
  t.deepEqual(
    formatRetain('X ¥123,456,789 JPY ABC', 'en'),
    'X ¥123,456,789 JPY ABC'
  )
  t.deepEqual(
    formatRetain('X ¥123,456,789 JPY ABC DEF', 'en'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.deepEqual(
    formatRetain('¥123,456,789 JPY ABC', 'en'),
    '¥123,456,789 JPY ABC'
  )
  t.deepEqual(
    formatRetain('¥123,456,789 JPY ABC DEF', 'en'),
    '¥123,456,789 JPY ABC DEF'
  )
})

test('123.456.789 ¥', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('123.456.789 ¥', 'en'), '¥123,456,789')
  t.deepEqual(formatRetain('123.456.789 ¥,', 'en'), '¥123,456,789,')
  t.deepEqual(formatRetain('X 123.456.789 ¥', 'en'), 'X ¥123,456,789')
  t.deepEqual(formatRetain('X 123.456.789 ¥ ABC', 'en'), 'X ¥123,456,789 ABC')
  t.deepEqual(
    formatRetain('X 123.456.789 ¥ ABC DEF', 'en'),
    'X ¥123,456,789 ABC DEF'
  )
  t.deepEqual(formatRetain('123.456.789 ¥ ABC', 'en'), '¥123,456,789 ABC')
  t.deepEqual(
    formatRetain('123.456.789 ¥ ABC DEF', 'en'),
    '¥123,456,789 ABC DEF'
  )
})

test('123.456.789 ¥ JPY', function (t) {
  t.plan(7)
  t.deepEqual(formatRetain('123.456.789 ¥ JPY', 'en'), '¥123,456,789 JPY')
  t.deepEqual(formatRetain('123.456.789 ¥ JPY,', 'en'), '¥123,456,789 JPY,')
  t.deepEqual(formatRetain('X 123.456.789 ¥ JPY', 'en'), 'X ¥123,456,789 JPY')
  t.deepEqual(
    formatRetain('X 123.456.789 ¥ JPY ABC', 'en'),
    'X ¥123,456,789 JPY ABC'
  )
  t.deepEqual(
    formatRetain('X 123.456.789 ¥ JPY ABC DEF', 'en'),
    'X ¥123,456,789 JPY ABC DEF'
  )
  t.deepEqual(
    formatRetain('123.456.789 ¥ JPY ABC', 'en'),
    '¥123,456,789 JPY ABC'
  )
  t.deepEqual(
    formatRetain('123.456.789 ¥ JPY ABC DEF', 'en'),
    '¥123,456,789 JPY ABC DEF'
  )
})

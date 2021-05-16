import test from 'ava'

import { formatShort } from '../../src/utilities/format-currency/format-short.js'

test('$1', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('$1', 'en'), '$1.00')
  t.deepEqual(formatShort('$1,', 'en'), '$1.00,')
  t.deepEqual(formatShort('X $1', 'en'), 'X $1.00')
  t.deepEqual(formatShort('X $1 ABC', 'en'), 'X $1.00 ABC')
  t.deepEqual(formatShort('X $1 ABC DEF', 'en'), 'X $1.00 ABC DEF')
  t.deepEqual(formatShort('$1 ABC', 'en'), '$1.00 ABC')
  t.deepEqual(formatShort('$1 ABC DEF', 'en'), '$1.00 ABC DEF')
})

test('$1 USD', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('$1 USD', 'en'), '$1.00')
  t.deepEqual(formatShort('$1 USD,', 'en'), '$1.00,')
  t.deepEqual(formatShort('X $1 USD', 'en'), 'X $1.00')
  t.deepEqual(formatShort('X $1 USD ABC', 'en'), 'X $1.00 ABC')
  t.deepEqual(formatShort('X $1 USD ABC DEF', 'en'), 'X $1.00 ABC DEF')
  t.deepEqual(formatShort('$1 USD ABC', 'en'), '$1.00 ABC')
  t.deepEqual(formatShort('$1 USD ABC DEF', 'en'), '$1.00 ABC DEF')
})

test('1 $', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('1 $', 'en'), '$1.00')
  t.deepEqual(formatShort('1 $,', 'en'), '$1.00,')
  t.deepEqual(formatShort('X 1 $', 'en'), 'X $1.00')
  t.deepEqual(formatShort('X 1 $ ABC', 'en'), 'X $1.00 ABC')
  t.deepEqual(formatShort('X 1 $ ABC DEF', 'en'), 'X $1.00 ABC DEF')
  t.deepEqual(formatShort('1 $ ABC', 'en'), '$1.00 ABC')
  t.deepEqual(formatShort('1 $ ABC DEF', 'en'), '$1.00 ABC DEF')
})

test('1 $ USD', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('1 $ USD', 'en'), '$1.00')
  t.deepEqual(formatShort('1 $ USD,', 'en'), '$1.00,')
  t.deepEqual(formatShort('X 1 $ USD', 'en'), 'X $1.00')
  t.deepEqual(formatShort('X 1 $ USD ABC', 'en'), 'X $1.00 ABC')
  t.deepEqual(formatShort('X 1 $ USD ABC DEF', 'en'), 'X $1.00 ABC DEF')
  t.deepEqual(formatShort('1 $ USD ABC', 'en'), '$1.00 ABC')
  t.deepEqual(formatShort('1 $ USD ABC DEF', 'en'), '$1.00 ABC DEF')
})

test('$3.14', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('$3.14', 'en'), '$3.14')
  t.deepEqual(formatShort('$3.14,', 'en'), '$3.14,')
  t.deepEqual(formatShort('X $3.14', 'en'), 'X $3.14')
  t.deepEqual(formatShort('X $3.14 ABC', 'en'), 'X $3.14 ABC')
  t.deepEqual(formatShort('X $3.14 ABC DEF', 'en'), 'X $3.14 ABC DEF')
  t.deepEqual(formatShort('$3.14 ABC', 'en'), '$3.14 ABC')
  t.deepEqual(formatShort('$3.14 ABC DEF', 'en'), '$3.14 ABC DEF')
})

test('$3.14 USD', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('$3.14 USD', 'en'), '$3.14')
  t.deepEqual(formatShort('$3.14 USD,', 'en'), '$3.14,')
  t.deepEqual(formatShort('X $3.14 USD', 'en'), 'X $3.14')
  t.deepEqual(formatShort('X $3.14 USD ABC', 'en'), 'X $3.14 ABC')
  t.deepEqual(formatShort('X $3.14 USD ABC DEF', 'en'), 'X $3.14 ABC DEF')
  t.deepEqual(formatShort('$3.14 USD ABC', 'en'), '$3.14 ABC')
  t.deepEqual(formatShort('$3.14 USD ABC DEF', 'en'), '$3.14 ABC DEF')
})

test('3,14 $', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('3,14 $', 'en'), '$3.14')
  t.deepEqual(formatShort('3,14 $,', 'en'), '$3.14,')
  t.deepEqual(formatShort('X 3,14 $', 'en'), 'X $3.14')
  t.deepEqual(formatShort('X 3,14 $ ABC', 'en'), 'X $3.14 ABC')
  t.deepEqual(formatShort('X 3,14 $ ABC DEF', 'en'), 'X $3.14 ABC DEF')
  t.deepEqual(formatShort('3,14 $ ABC', 'en'), '$3.14 ABC')
  t.deepEqual(formatShort('3,14 $ ABC DEF', 'en'), '$3.14 ABC DEF')
})

test('3,14 $ USD', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('3,14 $ USD', 'en'), '$3.14')
  t.deepEqual(formatShort('3,14 $ USD,', 'en'), '$3.14,')
  t.deepEqual(formatShort('X 3,14 $ USD', 'en'), 'X $3.14')
  t.deepEqual(formatShort('X 3,14 $ USD ABC', 'en'), 'X $3.14 ABC')
  t.deepEqual(formatShort('X 3,14 $ USD ABC DEF', 'en'), 'X $3.14 ABC DEF')
  t.deepEqual(formatShort('3,14 $ USD ABC', 'en'), '$3.14 ABC')
  t.deepEqual(formatShort('3,14 $ USD ABC DEF', 'en'), '$3.14 ABC DEF')
})

test('$123,456.78', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('$123,456.78', 'en'), '$123,456.78')
  t.deepEqual(formatShort('$123,456.78,', 'en'), '$123,456.78,')
  t.deepEqual(formatShort('X $123,456.78', 'en'), 'X $123,456.78')
  t.deepEqual(formatShort('X $123,456.78 ABC', 'en'), 'X $123,456.78 ABC')
  t.deepEqual(
    formatShort('X $123,456.78 ABC DEF', 'en'),
    'X $123,456.78 ABC DEF'
  )
  t.deepEqual(formatShort('$123,456.78 ABC', 'en'), '$123,456.78 ABC')
  t.deepEqual(formatShort('$123,456.78 ABC DEF', 'en'), '$123,456.78 ABC DEF')
})

test('$123,456.78 USD', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('$123,456.78 USD', 'en'), '$123,456.78')
  t.deepEqual(formatShort('$123,456.78 USD,', 'en'), '$123,456.78,')
  t.deepEqual(formatShort('X $123,456.78 USD', 'en'), 'X $123,456.78')
  t.deepEqual(formatShort('X $123,456.78 USD ABC', 'en'), 'X $123,456.78 ABC')
  t.deepEqual(
    formatShort('X $123,456.78 USD ABC DEF', 'en'),
    'X $123,456.78 ABC DEF'
  )
  t.deepEqual(formatShort('$123,456.78 USD ABC', 'en'), '$123,456.78 ABC')
  t.deepEqual(
    formatShort('$123,456.78 USD ABC DEF', 'en'),
    '$123,456.78 ABC DEF'
  )
})

test('123.456,78 $', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('123.456,78 $', 'en'), '$123,456.78')
  t.deepEqual(formatShort('123.456,78 $,', 'en'), '$123,456.78,')
  t.deepEqual(formatShort('X 123.456,78 $', 'en'), 'X $123,456.78')
  t.deepEqual(formatShort('X 123.456,78 $ ABC', 'en'), 'X $123,456.78 ABC')
  t.deepEqual(
    formatShort('X 123.456,78 $ ABC DEF', 'en'),
    'X $123,456.78 ABC DEF'
  )
  t.deepEqual(formatShort('123.456,78 $ ABC', 'en'), '$123,456.78 ABC')
  t.deepEqual(formatShort('123.456,78 $ ABC DEF', 'en'), '$123,456.78 ABC DEF')
})

test('123.456,78 $ USD', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('123.456,78 $ USD', 'en'), '$123,456.78')
  t.deepEqual(formatShort('123.456,78 $ USD,', 'en'), '$123,456.78,')
  t.deepEqual(formatShort('X 123.456,78 $ USD', 'en'), 'X $123,456.78')
  t.deepEqual(formatShort('X 123.456,78 $ USD ABC', 'en'), 'X $123,456.78 ABC')
  t.deepEqual(
    formatShort('X 123.456,78 $ USD ABC DEF', 'en'),
    'X $123,456.78 ABC DEF'
  )
  t.deepEqual(formatShort('123.456,78 $ USD ABC', 'en'), '$123,456.78 ABC')
  t.deepEqual(
    formatShort('123.456,78 $ USD ABC DEF', 'en'),
    '$123,456.78 ABC DEF'
  )
})

test('$12,345,678.90', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('$12,345,678.90', 'en'), '$12,345,678.90')
  t.deepEqual(formatShort('$12,345,678.90,', 'en'), '$12,345,678.90,')
  t.deepEqual(formatShort('X $12,345,678.90', 'en'), 'X $12,345,678.90')
  t.deepEqual(formatShort('X $12,345,678.90 ABC', 'en'), 'X $12,345,678.90 ABC')
  t.deepEqual(
    formatShort('X $12,345,678.90 ABC DEF', 'en'),
    'X $12,345,678.90 ABC DEF'
  )
  t.deepEqual(formatShort('$12,345,678.90 ABC', 'en'), '$12,345,678.90 ABC')
  t.deepEqual(
    formatShort('$12,345,678.90 ABC DEF', 'en'),
    '$12,345,678.90 ABC DEF'
  )
})

test('$12,345,678.90 USD', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('$12,345,678.90 USD', 'en'), '$12,345,678.90')
  t.deepEqual(formatShort('$12,345,678.90 USD,', 'en'), '$12,345,678.90,')
  t.deepEqual(formatShort('X $12,345,678.90 USD', 'en'), 'X $12,345,678.90')
  t.deepEqual(
    formatShort('X $12,345,678.90 USD ABC', 'en'),
    'X $12,345,678.90 ABC'
  )
  t.deepEqual(
    formatShort('X $12,345,678.90 USD ABC DEF', 'en'),
    'X $12,345,678.90 ABC DEF'
  )
  t.deepEqual(formatShort('$12,345,678.90 USD ABC', 'en'), '$12,345,678.90 ABC')
  t.deepEqual(
    formatShort('$12,345,678.90 USD ABC DEF', 'en'),
    '$12,345,678.90 ABC DEF'
  )
})

test('12.345.678,90 $', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('12.345.678,90 $', 'en'), '$12,345,678.90')
  t.deepEqual(formatShort('12.345.678,90 $,', 'en'), '$12,345,678.90,')
  t.deepEqual(formatShort('X 12.345.678,90 $', 'en'), 'X $12,345,678.90')
  t.deepEqual(
    formatShort('X 12.345.678,90 $ ABC', 'en'),
    'X $12,345,678.90 ABC'
  )
  t.deepEqual(
    formatShort('X 12.345.678,90 $ ABC DEF', 'en'),
    'X $12,345,678.90 ABC DEF'
  )
  t.deepEqual(formatShort('12.345.678,90 $ ABC', 'en'), '$12,345,678.90 ABC')
  t.deepEqual(
    formatShort('12.345.678,90 $ ABC DEF', 'en'),
    '$12,345,678.90 ABC DEF'
  )
})

test('12.345.678,90 $ USD', function (t) {
  t.plan(7)
  t.deepEqual(formatShort('12.345.678,90 $ USD', 'en'), '$12,345,678.90')
  t.deepEqual(formatShort('12.345.678,90 $ USD,', 'en'), '$12,345,678.90,')
  t.deepEqual(formatShort('X 12.345.678,90 $ USD', 'en'), 'X $12,345,678.90')
  t.deepEqual(
    formatShort('X 12.345.678,90 $ USD ABC', 'en'),
    'X $12,345,678.90 ABC'
  )
  t.deepEqual(
    formatShort('X 12.345.678,90 $ USD ABC DEF', 'en'),
    'X $12,345,678.90 ABC DEF'
  )
  t.deepEqual(
    formatShort('12.345.678,90 $ USD ABC', 'en'),
    '$12,345,678.90 ABC'
  )
  t.deepEqual(
    formatShort('12.345.678,90 $ USD ABC DEF', 'en'),
    '$12,345,678.90 ABC DEF'
  )
})

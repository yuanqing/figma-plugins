import test from 'ava'
import { formatExplicit } from '../../src/utilities/currency/format-explicit'

test('KWD 1', function (t) {
  t.is(formatExplicit('KWD 1', 'en-US'), 'KWD 1.000')
  t.is(formatExplicit('KWD 1,', 'en-US'), 'KWD 1.000,')
  t.is(formatExplicit('X KWD 1', 'en-US'), 'X KWD 1.000')
  t.is(formatExplicit('X KWD 1 ABC', 'en-US'), 'X KWD 1.000 ABC')
  t.is(formatExplicit('X KWD 1 ABC DEF', 'en-US'), 'X KWD 1.000 ABC DEF')
  t.is(formatExplicit('KWD 1 ABC', 'en-US'), 'KWD 1.000 ABC')
  t.is(formatExplicit('KWD 1 ABC DEF', 'en-US'), 'KWD 1.000 ABC DEF')
})

test('1 KWD', function (t) {
  t.is(formatExplicit('1 KWD', 'en-US'), 'KWD 1.000')
  t.is(formatExplicit('1 KWD,', 'en-US'), 'KWD 1.000,')
  t.is(formatExplicit('X 1 KWD', 'en-US'), 'X KWD 1.000')
  t.is(formatExplicit('X 1 KWD ABC', 'en-US'), 'X KWD 1.000 ABC')
  t.is(formatExplicit('X 1 KWD ABC DEF', 'en-US'), 'X KWD 1.000 ABC DEF')
  t.is(formatExplicit('1 KWD ABC', 'en-US'), 'KWD 1.000 ABC')
  t.is(formatExplicit('1 KWD ABC DEF', 'en-US'), 'KWD 1.000 ABC DEF')
})

test('KWD 3.141', function (t) {
  t.is(formatExplicit('KWD 3.141', 'en-US'), 'KWD 3.141')
  t.is(formatExplicit('KWD 3.141,', 'en-US'), 'KWD 3.141,')
  t.is(formatExplicit('X KWD 3.141', 'en-US'), 'X KWD 3.141')
  t.is(formatExplicit('X KWD 3.141 ABC', 'en-US'), 'X KWD 3.141 ABC')
  t.is(formatExplicit('X KWD 3.141 ABC DEF', 'en-US'), 'X KWD 3.141 ABC DEF')
  t.is(formatExplicit('KWD 3.141 ABC', 'en-US'), 'KWD 3.141 ABC')
  t.is(formatExplicit('KWD 3.141 ABC DEF', 'en-US'), 'KWD 3.141 ABC DEF')
})

test('3,141 KWD', function (t) {
  t.is(formatExplicit('3,141 KWD', 'en-US'), 'KWD 3.141')
  t.is(formatExplicit('3,141 KWD,', 'en-US'), 'KWD 3.141,')
  t.is(formatExplicit('X 3,141 KWD', 'en-US'), 'X KWD 3.141')
  t.is(formatExplicit('X 3,141 KWD ABC', 'en-US'), 'X KWD 3.141 ABC')
  t.is(formatExplicit('X 3,141 KWD ABC DEF', 'en-US'), 'X KWD 3.141 ABC DEF')
  t.is(formatExplicit('3,141 KWD ABC', 'en-US'), 'KWD 3.141 ABC')
  t.is(formatExplicit('3,141 KWD ABC DEF', 'en-US'), 'KWD 3.141 ABC DEF')
})

test('KWD 123,456.789', function (t) {
  t.is(formatExplicit('KWD 123,456.789', 'en-US'), 'KWD 123,456.789')
  t.is(formatExplicit('KWD 123,456.789,', 'en-US'), 'KWD 123,456.789,')
  t.is(formatExplicit('X KWD 123,456.789', 'en-US'), 'X KWD 123,456.789')
  t.is(
    formatExplicit('X KWD 123,456.789 ABC', 'en-US'),
    'X KWD 123,456.789 ABC'
  )
  t.is(
    formatExplicit('X KWD 123,456.789 ABC DEF', 'en-US'),
    'X KWD 123,456.789 ABC DEF'
  )
  t.is(formatExplicit('KWD 123,456.789 ABC', 'en-US'), 'KWD 123,456.789 ABC')
  t.is(
    formatExplicit('KWD 123,456.789 ABC DEF', 'en-US'),
    'KWD 123,456.789 ABC DEF'
  )
})

test('123.456,789 KWD', function (t) {
  t.is(formatExplicit('123.456,789 KWD', 'en-US'), 'KWD 123,456.789')
  t.is(formatExplicit('123.456,789 KWD,', 'en-US'), 'KWD 123,456.789,')
  t.is(formatExplicit('X 123.456,789 KWD', 'en-US'), 'X KWD 123,456.789')
  t.is(
    formatExplicit('X 123.456,789 KWD ABC', 'en-US'),
    'X KWD 123,456.789 ABC'
  )
  t.is(
    formatExplicit('X 123.456,789 KWD ABC DEF', 'en-US'),
    'X KWD 123,456.789 ABC DEF'
  )
  t.is(formatExplicit('123.456,789 KWD ABC', 'en-US'), 'KWD 123,456.789 ABC')
  t.is(
    formatExplicit('123.456,789 KWD ABC DEF', 'en-US'),
    'KWD 123,456.789 ABC DEF'
  )
})

test('KWD 123,456,789.000', function (t) {
  t.is(formatExplicit('KWD 123,456,789.000', 'en-US'), 'KWD 123,456,789.000')
  t.is(formatExplicit('KWD 123,456,789.000,', 'en-US'), 'KWD 123,456,789.000,')
  t.is(
    formatExplicit('X KWD 123,456,789.000', 'en-US'),
    'X KWD 123,456,789.000'
  )
  t.is(
    formatExplicit('X KWD 123,456,789.000 ABC', 'en-US'),
    'X KWD 123,456,789.000 ABC'
  )
  t.is(
    formatExplicit('X KWD 123,456,789.000 ABC DEF', 'en-US'),
    'X KWD 123,456,789.000 ABC DEF'
  )
  t.is(
    formatExplicit('KWD 123,456,789.000 ABC', 'en-US'),
    'KWD 123,456,789.000 ABC'
  )
  t.is(
    formatExplicit('KWD 123,456,789.000 ABC DEF', 'en-US'),
    'KWD 123,456,789.000 ABC DEF'
  )
})

test('123.456.789,000 KWD', function (t) {
  t.is(formatExplicit('123.456.789,000 KWD', 'en-US'), 'KWD 123,456,789.000')
  t.is(formatExplicit('123.456.789,000 KWD,', 'en-US'), 'KWD 123,456,789.000,')
  t.is(
    formatExplicit('X 123.456.789,000 KWD', 'en-US'),
    'X KWD 123,456,789.000'
  )
  t.is(
    formatExplicit('X 123.456.789,000 KWD ABC', 'en-US'),
    'X KWD 123,456,789.000 ABC'
  )
  t.is(
    formatExplicit('X 123.456.789,000 KWD ABC DEF', 'en-US'),
    'X KWD 123,456,789.000 ABC DEF'
  )
  t.is(
    formatExplicit('123.456.789,000 KWD ABC', 'en-US'),
    'KWD 123,456,789.000 ABC'
  )
  t.is(
    formatExplicit('123.456.789,000 KWD ABC DEF', 'en-US'),
    'KWD 123,456,789.000 ABC DEF'
  )
})

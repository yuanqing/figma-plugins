import test from 'ava'
import { formatShort } from '../../src/commands/format-currency/format-short/format-short'

test('KWD 1', function (t) {
  t.is(formatShort('KWD 1', 'en-US'), 'KWD 1.000')
  t.is(formatShort('KWD 1,', 'en-US'), 'KWD 1.000,')
  t.is(formatShort('X KWD 1', 'en-US'), 'X KWD 1.000')
  t.is(formatShort('X KWD 1 ABC', 'en-US'), 'X KWD 1.000 ABC')
  t.is(formatShort('X KWD 1 ABC DEF', 'en-US'), 'X KWD 1.000 ABC DEF')
  t.is(formatShort('KWD 1 ABC', 'en-US'), 'KWD 1.000 ABC')
  t.is(formatShort('KWD 1 ABC DEF', 'en-US'), 'KWD 1.000 ABC DEF')
})

test('1 KWD', function (t) {
  t.is(formatShort('1 KWD', 'en-US'), 'KWD 1.000')
  t.is(formatShort('1 KWD,', 'en-US'), 'KWD 1.000,')
  t.is(formatShort('X 1 KWD', 'en-US'), 'X KWD 1.000')
  t.is(formatShort('X 1 KWD ABC', 'en-US'), 'X KWD 1.000 ABC')
  t.is(formatShort('X 1 KWD ABC DEF', 'en-US'), 'X KWD 1.000 ABC DEF')
  t.is(formatShort('1 KWD ABC', 'en-US'), 'KWD 1.000 ABC')
  t.is(formatShort('1 KWD ABC DEF', 'en-US'), 'KWD 1.000 ABC DEF')
})

test('KWD 3.141', function (t) {
  t.is(formatShort('KWD 3.141', 'en-US'), 'KWD 3.141')
  t.is(formatShort('KWD 3.141,', 'en-US'), 'KWD 3.141,')
  t.is(formatShort('X KWD 3.141', 'en-US'), 'X KWD 3.141')
  t.is(formatShort('X KWD 3.141 ABC', 'en-US'), 'X KWD 3.141 ABC')
  t.is(formatShort('X KWD 3.141 ABC DEF', 'en-US'), 'X KWD 3.141 ABC DEF')
  t.is(formatShort('KWD 3.141 ABC', 'en-US'), 'KWD 3.141 ABC')
  t.is(formatShort('KWD 3.141 ABC DEF', 'en-US'), 'KWD 3.141 ABC DEF')
})

test('3,141 KWD', function (t) {
  t.is(formatShort('3,141 KWD', 'en-US'), 'KWD 3.141')
  t.is(formatShort('3,141 KWD,', 'en-US'), 'KWD 3.141,')
  t.is(formatShort('X 3,141 KWD', 'en-US'), 'X KWD 3.141')
  t.is(formatShort('X 3,141 KWD ABC', 'en-US'), 'X KWD 3.141 ABC')
  t.is(formatShort('X 3,141 KWD ABC DEF', 'en-US'), 'X KWD 3.141 ABC DEF')
  t.is(formatShort('3,141 KWD ABC', 'en-US'), 'KWD 3.141 ABC')
  t.is(formatShort('3,141 KWD ABC DEF', 'en-US'), 'KWD 3.141 ABC DEF')
})

test('KWD 123,456.789', function (t) {
  t.is(formatShort('KWD 123,456.789', 'en-US'), 'KWD 123,456.789')
  t.is(formatShort('KWD 123,456.789,', 'en-US'), 'KWD 123,456.789,')
  t.is(formatShort('X KWD 123,456.789', 'en-US'), 'X KWD 123,456.789')
  t.is(formatShort('X KWD 123,456.789 ABC', 'en-US'), 'X KWD 123,456.789 ABC')
  t.is(
    formatShort('X KWD 123,456.789 ABC DEF', 'en-US'),
    'X KWD 123,456.789 ABC DEF'
  )
  t.is(formatShort('KWD 123,456.789 ABC', 'en-US'), 'KWD 123,456.789 ABC')
  t.is(
    formatShort('KWD 123,456.789 ABC DEF', 'en-US'),
    'KWD 123,456.789 ABC DEF'
  )
})

test('123.456,789 KWD', function (t) {
  t.is(formatShort('123.456,789 KWD', 'en-US'), 'KWD 123,456.789')
  t.is(formatShort('123.456,789 KWD,', 'en-US'), 'KWD 123,456.789,')
  t.is(formatShort('X 123.456,789 KWD', 'en-US'), 'X KWD 123,456.789')
  t.is(formatShort('X 123.456,789 KWD ABC', 'en-US'), 'X KWD 123,456.789 ABC')
  t.is(
    formatShort('X 123.456,789 KWD ABC DEF', 'en-US'),
    'X KWD 123,456.789 ABC DEF'
  )
  t.is(formatShort('123.456,789 KWD ABC', 'en-US'), 'KWD 123,456.789 ABC')
  t.is(
    formatShort('123.456,789 KWD ABC DEF', 'en-US'),
    'KWD 123,456.789 ABC DEF'
  )
})

test('KWD 123,456,789.000', function (t) {
  t.is(formatShort('KWD 123,456,789.000', 'en-US'), 'KWD 123,456,789.000')
  t.is(formatShort('KWD 123,456,789.000,', 'en-US'), 'KWD 123,456,789.000,')
  t.is(formatShort('X KWD 123,456,789.000', 'en-US'), 'X KWD 123,456,789.000')
  t.is(
    formatShort('X KWD 123,456,789.000 ABC', 'en-US'),
    'X KWD 123,456,789.000 ABC'
  )
  t.is(
    formatShort('X KWD 123,456,789.000 ABC DEF', 'en-US'),
    'X KWD 123,456,789.000 ABC DEF'
  )
  t.is(
    formatShort('KWD 123,456,789.000 ABC', 'en-US'),
    'KWD 123,456,789.000 ABC'
  )
  t.is(
    formatShort('KWD 123,456,789.000 ABC DEF', 'en-US'),
    'KWD 123,456,789.000 ABC DEF'
  )
})

test('123.456.789,000 KWD', function (t) {
  t.is(formatShort('123.456.789,000 KWD', 'en-US'), 'KWD 123,456,789.000')
  t.is(formatShort('123.456.789,000 KWD,', 'en-US'), 'KWD 123,456,789.000,')
  t.is(formatShort('X 123.456.789,000 KWD', 'en-US'), 'X KWD 123,456,789.000')
  t.is(
    formatShort('X 123.456.789,000 KWD ABC', 'en-US'),
    'X KWD 123,456,789.000 ABC'
  )
  t.is(
    formatShort('X 123.456.789,000 KWD ABC DEF', 'en-US'),
    'X KWD 123,456,789.000 ABC DEF'
  )
  t.is(
    formatShort('123.456.789,000 KWD ABC', 'en-US'),
    'KWD 123,456,789.000 ABC'
  )
  t.is(
    formatShort('123.456.789,000 KWD ABC DEF', 'en-US'),
    'KWD 123,456,789.000 ABC DEF'
  )
})

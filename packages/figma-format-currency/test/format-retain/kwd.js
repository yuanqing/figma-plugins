import test from 'ava'
import { formatRetain } from '../../src/utilities/currency/format-retain'

test('KWD 1', function (t) {
  t.is(formatRetain('KWD 1', 'en-US'), 'KWD 1.000')
  t.is(formatRetain('KWD 1,', 'en-US'), 'KWD 1.000,')
  t.is(formatRetain('X KWD 1', 'en-US'), 'X KWD 1.000')
  t.is(formatRetain('X KWD 1 ABC', 'en-US'), 'X KWD 1.000 ABC')
  t.is(formatRetain('X KWD 1 ABC DEF', 'en-US'), 'X KWD 1.000 ABC DEF')
  t.is(formatRetain('KWD 1 ABC', 'en-US'), 'KWD 1.000 ABC')
  t.is(formatRetain('KWD 1 ABC DEF', 'en-US'), 'KWD 1.000 ABC DEF')
})

test('1 KWD', function (t) {
  t.is(formatRetain('1 KWD', 'en-US'), 'KWD 1.000')
  t.is(formatRetain('1 KWD,', 'en-US'), 'KWD 1.000,')
  t.is(formatRetain('X 1 KWD', 'en-US'), 'X KWD 1.000')
  t.is(formatRetain('X 1 KWD ABC', 'en-US'), 'X KWD 1.000 ABC')
  t.is(formatRetain('X 1 KWD ABC DEF', 'en-US'), 'X KWD 1.000 ABC DEF')
  t.is(formatRetain('1 KWD ABC', 'en-US'), 'KWD 1.000 ABC')
  t.is(formatRetain('1 KWD ABC DEF', 'en-US'), 'KWD 1.000 ABC DEF')
})

test('KWD 3.141', function (t) {
  t.is(formatRetain('KWD 3.141', 'en-US'), 'KWD 3.141')
  t.is(formatRetain('KWD 3.141,', 'en-US'), 'KWD 3.141,')
  t.is(formatRetain('X KWD 3.141', 'en-US'), 'X KWD 3.141')
  t.is(formatRetain('X KWD 3.141 ABC', 'en-US'), 'X KWD 3.141 ABC')
  t.is(formatRetain('X KWD 3.141 ABC DEF', 'en-US'), 'X KWD 3.141 ABC DEF')
  t.is(formatRetain('KWD 3.141 ABC', 'en-US'), 'KWD 3.141 ABC')
  t.is(formatRetain('KWD 3.141 ABC DEF', 'en-US'), 'KWD 3.141 ABC DEF')
})

test('3,141 KWD', function (t) {
  t.is(formatRetain('3,141 KWD', 'en-US'), 'KWD 3.141')
  t.is(formatRetain('3,141 KWD,', 'en-US'), 'KWD 3.141,')
  t.is(formatRetain('X 3,141 KWD', 'en-US'), 'X KWD 3.141')
  t.is(formatRetain('X 3,141 KWD ABC', 'en-US'), 'X KWD 3.141 ABC')
  t.is(formatRetain('X 3,141 KWD ABC DEF', 'en-US'), 'X KWD 3.141 ABC DEF')
  t.is(formatRetain('3,141 KWD ABC', 'en-US'), 'KWD 3.141 ABC')
  t.is(formatRetain('3,141 KWD ABC DEF', 'en-US'), 'KWD 3.141 ABC DEF')
})

test('KWD 123,456.789', function (t) {
  t.is(formatRetain('KWD 123,456.789', 'en-US'), 'KWD 123,456.789')
  t.is(formatRetain('KWD 123,456.789,', 'en-US'), 'KWD 123,456.789,')
  t.is(formatRetain('X KWD 123,456.789', 'en-US'), 'X KWD 123,456.789')
  t.is(formatRetain('X KWD 123,456.789 ABC', 'en-US'), 'X KWD 123,456.789 ABC')
  t.is(
    formatRetain('X KWD 123,456.789 ABC DEF', 'en-US'),
    'X KWD 123,456.789 ABC DEF'
  )
  t.is(formatRetain('KWD 123,456.789 ABC', 'en-US'), 'KWD 123,456.789 ABC')
  t.is(
    formatRetain('KWD 123,456.789 ABC DEF', 'en-US'),
    'KWD 123,456.789 ABC DEF'
  )
})

test('123.456,789 KWD', function (t) {
  t.is(formatRetain('123.456,789 KWD', 'en-US'), 'KWD 123,456.789')
  t.is(formatRetain('123.456,789 KWD,', 'en-US'), 'KWD 123,456.789,')
  t.is(formatRetain('X 123.456,789 KWD', 'en-US'), 'X KWD 123,456.789')
  t.is(formatRetain('X 123.456,789 KWD ABC', 'en-US'), 'X KWD 123,456.789 ABC')
  t.is(
    formatRetain('X 123.456,789 KWD ABC DEF', 'en-US'),
    'X KWD 123,456.789 ABC DEF'
  )
  t.is(formatRetain('123.456,789 KWD ABC', 'en-US'), 'KWD 123,456.789 ABC')
  t.is(
    formatRetain('123.456,789 KWD ABC DEF', 'en-US'),
    'KWD 123,456.789 ABC DEF'
  )
})

test('KWD 123,456,789.000', function (t) {
  t.is(formatRetain('KWD 123,456,789.000', 'en-US'), 'KWD 123,456,789.000')
  t.is(formatRetain('KWD 123,456,789.000,', 'en-US'), 'KWD 123,456,789.000,')
  t.is(formatRetain('X KWD 123,456,789.000', 'en-US'), 'X KWD 123,456,789.000')
  t.is(
    formatRetain('X KWD 123,456,789.000 ABC', 'en-US'),
    'X KWD 123,456,789.000 ABC'
  )
  t.is(
    formatRetain('X KWD 123,456,789.000 ABC DEF', 'en-US'),
    'X KWD 123,456,789.000 ABC DEF'
  )
  t.is(
    formatRetain('KWD 123,456,789.000 ABC', 'en-US'),
    'KWD 123,456,789.000 ABC'
  )
  t.is(
    formatRetain('KWD 123,456,789.000 ABC DEF', 'en-US'),
    'KWD 123,456,789.000 ABC DEF'
  )
})

test('123.456.789,000 KWD', function (t) {
  t.is(formatRetain('123.456.789,000 KWD', 'en-US'), 'KWD 123,456,789.000')
  t.is(formatRetain('123.456.789,000 KWD,', 'en-US'), 'KWD 123,456,789.000,')
  t.is(formatRetain('X 123.456.789,000 KWD', 'en-US'), 'X KWD 123,456,789.000')
  t.is(
    formatRetain('X 123.456.789,000 KWD ABC', 'en-US'),
    'X KWD 123,456,789.000 ABC'
  )
  t.is(
    formatRetain('X 123.456.789,000 KWD ABC DEF', 'en-US'),
    'X KWD 123,456,789.000 ABC DEF'
  )
  t.is(
    formatRetain('123.456.789,000 KWD ABC', 'en-US'),
    'KWD 123,456,789.000 ABC'
  )
  t.is(
    formatRetain('123.456.789,000 KWD ABC DEF', 'en-US'),
    'KWD 123,456,789.000 ABC DEF'
  )
})

import test from 'ava'
import { setLocale } from '../../src/format-currency/set-locale/set-locale'

test('KWD 1', function (t) {
  t.is(setLocale('KWD 1', 'en-US'), 'KWD 1.000')
  t.is(setLocale('KWD 1,', 'en-US'), 'KWD 1.000,')
  t.is(setLocale('X KWD 1', 'en-US'), 'X KWD 1.000')
  t.is(setLocale('X KWD 1 ABC', 'en-US'), 'X KWD 1.000 ABC')
  t.is(setLocale('X KWD 1 ABC DEF', 'en-US'), 'X KWD 1.000 ABC DEF')
  t.is(setLocale('KWD 1 ABC', 'en-US'), 'KWD 1.000 ABC')
  t.is(setLocale('KWD 1 ABC DEF', 'en-US'), 'KWD 1.000 ABC DEF')
})

test('1 KWD', function (t) {
  t.is(setLocale('1 KWD', 'en-US'), 'KWD 1.000')
  t.is(setLocale('1 KWD,', 'en-US'), 'KWD 1.000,')
  t.is(setLocale('X 1 KWD', 'en-US'), 'X KWD 1.000')
  t.is(setLocale('X 1 KWD ABC', 'en-US'), 'X KWD 1.000 ABC')
  t.is(setLocale('X 1 KWD ABC DEF', 'en-US'), 'X KWD 1.000 ABC DEF')
  t.is(setLocale('1 KWD ABC', 'en-US'), 'KWD 1.000 ABC')
  t.is(setLocale('1 KWD ABC DEF', 'en-US'), 'KWD 1.000 ABC DEF')
})

test('KWD 3.141', function (t) {
  t.is(setLocale('KWD 3.141', 'en-US'), 'KWD 3.141')
  t.is(setLocale('KWD 3.141,', 'en-US'), 'KWD 3.141,')
  t.is(setLocale('X KWD 3.141', 'en-US'), 'X KWD 3.141')
  t.is(setLocale('X KWD 3.141 ABC', 'en-US'), 'X KWD 3.141 ABC')
  t.is(setLocale('X KWD 3.141 ABC DEF', 'en-US'), 'X KWD 3.141 ABC DEF')
  t.is(setLocale('KWD 3.141 ABC', 'en-US'), 'KWD 3.141 ABC')
  t.is(setLocale('KWD 3.141 ABC DEF', 'en-US'), 'KWD 3.141 ABC DEF')
})

test('3,141 KWD', function (t) {
  t.is(setLocale('3,141 KWD', 'en-US'), 'KWD 3.141')
  t.is(setLocale('3,141 KWD,', 'en-US'), 'KWD 3.141,')
  t.is(setLocale('X 3,141 KWD', 'en-US'), 'X KWD 3.141')
  t.is(setLocale('X 3,141 KWD ABC', 'en-US'), 'X KWD 3.141 ABC')
  t.is(setLocale('X 3,141 KWD ABC DEF', 'en-US'), 'X KWD 3.141 ABC DEF')
  t.is(setLocale('3,141 KWD ABC', 'en-US'), 'KWD 3.141 ABC')
  t.is(setLocale('3,141 KWD ABC DEF', 'en-US'), 'KWD 3.141 ABC DEF')
})

test('KWD 123,456.789', function (t) {
  t.is(setLocale('KWD 123,456.789', 'en-US'), 'KWD 123,456.789')
  t.is(setLocale('KWD 123,456.789,', 'en-US'), 'KWD 123,456.789,')
  t.is(setLocale('X KWD 123,456.789', 'en-US'), 'X KWD 123,456.789')
  t.is(setLocale('X KWD 123,456.789 ABC', 'en-US'), 'X KWD 123,456.789 ABC')
  t.is(
    setLocale('X KWD 123,456.789 ABC DEF', 'en-US'),
    'X KWD 123,456.789 ABC DEF'
  )
  t.is(setLocale('KWD 123,456.789 ABC', 'en-US'), 'KWD 123,456.789 ABC')
  t.is(setLocale('KWD 123,456.789 ABC DEF', 'en-US'), 'KWD 123,456.789 ABC DEF')
})

test('123.456,789 KWD', function (t) {
  t.is(setLocale('123.456,789 KWD', 'en-US'), 'KWD 123,456.789')
  t.is(setLocale('123.456,789 KWD,', 'en-US'), 'KWD 123,456.789,')
  t.is(setLocale('X 123.456,789 KWD', 'en-US'), 'X KWD 123,456.789')
  t.is(setLocale('X 123.456,789 KWD ABC', 'en-US'), 'X KWD 123,456.789 ABC')
  t.is(
    setLocale('X 123.456,789 KWD ABC DEF', 'en-US'),
    'X KWD 123,456.789 ABC DEF'
  )
  t.is(setLocale('123.456,789 KWD ABC', 'en-US'), 'KWD 123,456.789 ABC')
  t.is(setLocale('123.456,789 KWD ABC DEF', 'en-US'), 'KWD 123,456.789 ABC DEF')
})

test('KWD 123,456,789.000', function (t) {
  t.is(setLocale('KWD 123,456,789.000', 'en-US'), 'KWD 123,456,789.000')
  t.is(setLocale('KWD 123,456,789.000,', 'en-US'), 'KWD 123,456,789.000,')
  t.is(setLocale('X KWD 123,456,789.000', 'en-US'), 'X KWD 123,456,789.000')
  t.is(
    setLocale('X KWD 123,456,789.000 ABC', 'en-US'),
    'X KWD 123,456,789.000 ABC'
  )
  t.is(
    setLocale('X KWD 123,456,789.000 ABC DEF', 'en-US'),
    'X KWD 123,456,789.000 ABC DEF'
  )
  t.is(setLocale('KWD 123,456,789.000 ABC', 'en-US'), 'KWD 123,456,789.000 ABC')
  t.is(
    setLocale('KWD 123,456,789.000 ABC DEF', 'en-US'),
    'KWD 123,456,789.000 ABC DEF'
  )
})

test('123.456.789,000 KWD', function (t) {
  t.is(setLocale('123.456.789,000 KWD', 'en-US'), 'KWD 123,456,789.000')
  t.is(setLocale('123.456.789,000 KWD,', 'en-US'), 'KWD 123,456,789.000,')
  t.is(setLocale('X 123.456.789,000 KWD', 'en-US'), 'X KWD 123,456,789.000')
  t.is(
    setLocale('X 123.456.789,000 KWD ABC', 'en-US'),
    'X KWD 123,456,789.000 ABC'
  )
  t.is(
    setLocale('X 123.456.789,000 KWD ABC DEF', 'en-US'),
    'X KWD 123,456,789.000 ABC DEF'
  )
  t.is(setLocale('123.456.789,000 KWD ABC', 'en-US'), 'KWD 123,456,789.000 ABC')
  t.is(
    setLocale('123.456.789,000 KWD ABC DEF', 'en-US'),
    'KWD 123,456,789.000 ABC DEF'
  )
})

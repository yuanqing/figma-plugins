import test from 'ava'
import { formatShort } from '../src/format-short/format-short'

test('no matches', function (t) {
  t.plan(1)
  t.deepEqual(formatShort('foo', { $: ['USD'] }), 'foo')
})

test('single match', function (t) {
  t.plan(2)
  t.deepEqual(formatShort('$42.00 USD', { $: ['USD'] }), '$42.00')
  t.deepEqual(formatShort('$42.00 FOO', { $: ['USD'] }), '$42.00 FOO')
})

test('unchanged if already in short format', function (t) {
  t.plan(1)
  t.deepEqual(formatShort('$42.00', { $: ['USD'] }), '$42.00')
})

test('multiple matches', function (t) {
  t.plan(1)
  t.deepEqual(
    formatShort('$42.00 USD, $3.14 USD', { $: ['USD'] }),
    '$42.00, $3.14'
  )
})

test('multiple currencies', function (t) {
  t.plan(1)
  t.deepEqual(
    formatShort('$42.00 USD, 3,14€ EUR', { '€': ['EUR'], $: ['USD'] }),
    '$42.00, 3,14€'
  )
})

test('multiple currencies with the same currency symbol', function (t) {
  t.plan(1)
  t.deepEqual(
    formatShort('$42.00 USD, $3.14 SGD', { $: ['USD', 'SGD'] }),
    '$42.00, $3.14'
  )
})

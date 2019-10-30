import test from 'ava'
import { formatExplicit } from '../src/format-explicit/format-explicit'

test('no matches', function (t) {
  t.plan(1)
  t.deepEqual(formatExplicit('foo', { $: 'USD' }), 'foo')
})

test('single match', function (t) {
  t.plan(2)
  t.deepEqual(formatExplicit('$42.00', { $: 'USD' }), '$42.00 USD')
  t.deepEqual(formatExplicit('$42.00 FOO', { $: 'USD' }), '$42.00 USD FOO')
})

test('unchanged if already in explicit format', function (t) {
  t.plan(1)
  t.deepEqual(formatExplicit('$42.00 USD', { $: 'USD' }), '$42.00 USD')
})

test('multiple matches', function (t) {
  t.plan(1)
  t.deepEqual(
    formatExplicit('$42.00, $3.14', { $: 'USD' }),
    '$42.00 USD, $3.14 USD'
  )
})

test('multiple currencies', function (t) {
  t.plan(1)
  t.deepEqual(
    formatExplicit('$42.00, 3,14€', { $: 'USD', '€': 'EUR' }),
    '$42.00 USD, 3,14€ EUR'
  )
})

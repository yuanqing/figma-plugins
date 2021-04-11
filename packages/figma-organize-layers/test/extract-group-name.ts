import { test } from 'tap'

import { extractGroupName } from '../src/organize-layers/utilities/extract-group-name'

test('empty string', function (t) {
  t.plan(4)
  t.equal(extractGroupName('', 1), '')
  t.equal(extractGroupName('', 2), '')
  t.equal(extractGroupName('', 3), '')
  t.equal(extractGroupName('', 4), '')
})

test('slash only', function (t) {
  t.plan(4)
  t.equal(extractGroupName('/', 1), '/')
  t.equal(extractGroupName('/', 2), '/')
  t.equal(extractGroupName('/', 3), '/')
  t.equal(extractGroupName('/', 4), '/')
})

test('no slash', function (t) {
  t.plan(4)
  t.equal(extractGroupName('foo', 1), 'foo')
  t.equal(extractGroupName('foo', 2), 'foo')
  t.equal(extractGroupName('foo', 3), 'foo')
  t.equal(extractGroupName('foo', 4), 'foo')
})

test('single slash', function (t) {
  t.plan(4)
  t.equal(extractGroupName('foo/bar', 1), 'foo')
  t.equal(extractGroupName('foo/bar', 2), 'foo')
  t.equal(extractGroupName('foo/bar', 3), 'foo')
  t.equal(extractGroupName('foo/bar', 4), 'foo')
})

test('multiple slashes', function (t) {
  t.plan(4)
  t.equal(extractGroupName('foo/bar/baz', 1), 'foo')
  t.equal(extractGroupName('foo/bar/baz', 2), 'foo/bar')
  t.equal(extractGroupName('foo/bar/baz', 3), 'foo/bar')
  t.equal(extractGroupName('foo/bar/baz', 4), 'foo/bar')
})

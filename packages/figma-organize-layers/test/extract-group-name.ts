import test from 'ava'

import { extractGroupName } from '../src/organize-nodes/utilities/extract-group-name.js'

test('empty string', function (t) {
  t.plan(4)
  t.deepEqual(extractGroupName('', 1), '')
  t.deepEqual(extractGroupName('', 2), '')
  t.deepEqual(extractGroupName('', 3), '')
  t.deepEqual(extractGroupName('', 4), '')
})

test('slash only', function (t) {
  t.plan(4)
  t.deepEqual(extractGroupName('/', 1), '/')
  t.deepEqual(extractGroupName('/', 2), '/')
  t.deepEqual(extractGroupName('/', 3), '/')
  t.deepEqual(extractGroupName('/', 4), '/')
})

test('no slash', function (t) {
  t.plan(4)
  t.deepEqual(extractGroupName('foo', 1), 'foo')
  t.deepEqual(extractGroupName('foo', 2), 'foo')
  t.deepEqual(extractGroupName('foo', 3), 'foo')
  t.deepEqual(extractGroupName('foo', 4), 'foo')
})

test('single slash', function (t) {
  t.plan(4)
  t.deepEqual(extractGroupName('foo/bar', 1), 'foo')
  t.deepEqual(extractGroupName('foo/bar', 2), 'foo')
  t.deepEqual(extractGroupName('foo/bar', 3), 'foo')
  t.deepEqual(extractGroupName('foo/bar', 4), 'foo')
})

test('multiple slashes', function (t) {
  t.plan(4)
  t.deepEqual(extractGroupName('foo/bar/baz', 1), 'foo')
  t.deepEqual(extractGroupName('foo/bar/baz', 2), 'foo/bar')
  t.deepEqual(extractGroupName('foo/bar/baz', 3), 'foo/bar')
  t.deepEqual(extractGroupName('foo/bar/baz', 4), 'foo/bar')
})

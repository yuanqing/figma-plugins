import { createRegex } from './create-regex'

export const dollar = createRegex([
  '(',
  '(?:-|–|−)?', // - (optional)
  '(\\$)', // $
  '(?:\\d{1,3})', // 999
  '(?:,\\d{3})*', // ,999 (optional, repeatable)
  '(?:\\.\\d{2})', // .99
  ')'
])

export const euro = createRegex([
  '(',
  '(?:-|–|−)?', // - (optional)
  '(?:\\d{1,3})', // 999
  '(?:\\.\\d{3})*', // .999 (optional, repeatable)
  '(?:,\\d{2})', // ,99
  '(€)', // €
  ')'
])

export const regexes = [dollar, euro]

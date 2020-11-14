/* eslint-disable no-console */

const languages = require('../src/utilities/languages.json')

console.log(`import { mainFactory } from './main-factory'\n`)
for (const languageKey in languages) {
  console.log(
    `export const ${languageKey.replace(
      '-',
      ''
    )} = mainFactory('${languageKey}')`
  )
}

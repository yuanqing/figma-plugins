/* eslint-disable no-console */

import { languages } from '../src/utilities/languages.js'

function main() {
  console.log(`import { mainFactory } from './main-factory'\n`)
  for (const languageKey in languages) {
    console.log(
      `export const ${languageKey.replace(
        '-',
        ''
      )} = mainFactory('${languageKey}')`
    )
  }
}
main()

/* eslint-disable no-console */

import { languages } from '../src/utilities/languages.js'
import { LanguageKey } from '../src/utilities/types.js'

function main() {
  const result = []
  const languageKeys = Object.keys(languages) as Array<LanguageKey>
  for (const languageKey of languageKeys) {
    result.push({
      main: {
        handler: languageKey.replace('-', ''),
        src: 'src/translate/main.ts'
      },
      name: languages[languageKey],
      ui: 'src/translate/ui.ts'
    })
  }
  console.log(JSON.stringify(result, null, 2))
}
main()

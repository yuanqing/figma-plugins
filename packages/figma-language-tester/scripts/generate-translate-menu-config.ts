/* eslint-disable no-console, sort-keys-fix/sort-keys-fix */

import { languages } from '../src/utilities/languages'
import { LanguageKey } from '../src/utilities/types'

function main() {
  const result = []
  const languageKeys = Object.keys(languages) as Array<LanguageKey>
  for (const languageKey of languageKeys) {
    result.push({
      name: languages[languageKey],
      main: {
        src: 'src/translate/main.ts',
        handler: languageKey.replace('-', '')
      },
      ui: 'src/translate/ui.ts'
    })
  }
  console.log(JSON.stringify(result, null, 2))
}
main()

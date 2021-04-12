/* eslint-disable no-console */

const languages = require('../src/utilities/languages.json') as {
  [key: string]: string
}

const result = []
for (const languageKey in languages) {
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

export {}

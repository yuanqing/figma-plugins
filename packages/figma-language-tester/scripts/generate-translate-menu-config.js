/* eslint-disable no-console */

const languages = require('../src/utilities/languages.json')

const result = []
for (const languageKey in languages) {
  result.push({
    main: {
      handler: languageKey.replace('-', ''),
      src: 'translate/main'
    },
    name: languages[languageKey],
    ui: 'translate/ui'
  })
}
console.log(JSON.stringify(result, null, 2))

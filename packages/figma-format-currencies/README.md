# Format Currencies ![Figma Plugin](https://img.shields.io/badge/figma-plugin-1BC47D.svg) [![npm Version](https://img.shields.io/npm/v/figma-format-currencies.svg)](https://www.npmjs.com/package/figma-format-currencies)

> A Figma plugin to format currencies and convert between currencies

## Commands

### Change to Short Format

Changes currencies in text layers within the selection or on the current page to the Short format.

- `$3.14 USD` &rarr; `$3.14`
- `123.456 ¥ JPY` &rarr; `123.456 ¥`

### Change to Explicit Format

Changes currencies in text layers within the selection or on the current page to the Explicit format.

- `$3.14` &rarr; `$3.14 USD`
- `123.456 ¥` &rarr; `123.456 ¥ JPY`

### Fix Currency Format

Automagically fixes the format of currencies in text layers within the selection or on the current page.

- Normalises spaces, number of significant figures, and separator characters.
- For negative numbers, ensures that the minus sign is at the beginning of the string.

### Convert Currency

Converts all currencies in text layers within the selection or on the current page.

- Optionally set to round numbers (to the nearest tens or hundreds), so that prices look more “natural”.

### Set Locale

Set the current locale, which determines how currencies are formatted.

## License

MIT

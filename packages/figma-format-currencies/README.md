# Format Currency ![Figma Plugin](https://img.shields.io/badge/figma-plugin-1BC47D.svg) [![npm Version](https://img.shields.io/npm/v/figma-format-currency.svg)](https://www.npmjs.com/package/figma-format-currency)

> A Figma plugin to format and convert between currencies

## Commands

### Change to Explicit Format

Changes currencies in text layers within the selection or on the current page to the Explicit format (eg. $42.00 → $42.00 USD).

### Change to Short Format

Changes currencies in text layers within the selection or on the current page to the Short format  (eg. 37,00 € EUR → 37,00 €).

### Change Locale

Changes the currency format to a different locale (eg. ¥5,800 JPY in the en-US locale → 5.800 ¥ JPY in the de-DE locale).

### Fix Currency Format

Automagically fixes the format of currencies in text layers within the selection or on the current page.
- Normalizes spaces, the number of significant figures, and separator characters.
- For negative numbers, ensures that the minus sign is at the beginning of the string.

### Convert Currency

Converts between currencies in text layers within the selection or on the current page.

- Optionally round the converted currencies to the nearest 100s and 1000s, so that prices in your design look more “natural”.

## License

MIT

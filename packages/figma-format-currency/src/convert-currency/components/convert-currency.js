/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Header,
  TextboxAutocomplete,
  useForm
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import {
  Preview,
  INVALID_SETTINGS,
  NO_TEXT_LAYERS
} from '../../preview/preview'
import { convertCurrency } from '../../utilities/currency/convert-currency'
import { isValidLocale } from '../../utilities/currency/is-valid-locale'
import { moneyRegex } from '../../utilities/currency/money-regex'
import isoCodes from '../../utilities/currency/data/iso-codes'

const currencies = Object.keys(isoCodes).map(function (isoCode) {
  return { value: isoCode }
})

export function ConvertCurrency (initialState) {
  const { inputs, setInputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    true
  )
  const { layers, targetCurrency, roundNumbers, locale } = inputs
  const previewItems = computePreview({
    layers,
    targetCurrency,
    roundNumbers,
    locale
  })
  function submitCallback ({ layers, targetCurrency, roundNumbers, locale }) {
    const result = layers.map(function ({ id, characters }) {
      return {
        id,
        characters: convertCurrency({
          string: characters,
          targetCurrency,
          roundNumbers,
          locale
        })
      }
    })
    triggerEvent('SUBMIT', {
      layers: result,
      targetCurrency,
      roundNumbers,
      locale
    })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  function handleCurrencyChange (targetCurrency) {
    setInputs({
      ...inputs,
      targetCurrency
    })
  }
  function handleLocaleChange (locale) {
    setInputs({
      ...inputs,
      locale
    })
  }
  useEffect(
    function () {
      addEventListener('SELECTION_CHANGED', function (layers) {
        setInputs({
          ...inputs,
          layers
        })
      })
    },
    [inputs, setInputs]
  )
  return (
    <div>
      <Preview items={previewItems} />
      <Container>
        <Header>Currency</Header>
        <TextboxAutocomplete
          filter
          strict
          name='currency'
          value={targetCurrency}
          options={currencies}
          onChange={handleCurrencyChange}
        />
        <Checkbox
          name='roundNumbers'
          value={roundNumbers === true}
          onChange={handleInput}
          style={{ marginBottom: '-8px' }}
        >
          Round numbers
        </Checkbox>
        <Header>Locale</Header>
        <TextboxAutocomplete
          filter
          strict
          top
          name='locale'
          value={locale}
          options={[{ value: 'en-US' }, { value: 'de-DE' }]}
          onChange={handleLocaleChange}
        />
        <Button
          fullWidth
          disabled={
            previewItems === INVALID_SETTINGS ||
            previewItems === NO_TEXT_LAYERS ||
            previewItems.length === 0
          }
          onClick={handleSubmit}
          style={{ marginTop: '24px' }}
        >
          Convert Currency
        </Button>
      </Container>
    </div>
  )
}

function computePreview ({ layers, targetCurrency, roundNumbers, locale }) {
  if (
    typeof isoCodes[targetCurrency] === 'undefined' ||
    isValidLocale(locale) === false
  ) {
    return INVALID_SETTINGS
  }
  if (layers.length === 0) {
    return NO_TEXT_LAYERS
  }
  const result = []
  const originalStrings = {}
  layers.forEach(function ({ characters }) {
    characters.replace(moneyRegex, function (original) {
      if (originalStrings[original] === true) {
        return
      }
      originalStrings[original] = true
      result.push({
        original,
        result: convertCurrency({
          string: original,
          targetCurrency,
          roundNumbers,
          locale
        })
      })
    })
  })
  return result
}

/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Text,
  TextboxAutocomplete,
  VerticalSpace,
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
import localesJson from '../../utilities/currency/data/locales'
import isoCodes from '../../utilities/currency/data/iso-codes'

const currencies = Object.keys(isoCodes).map(function (isoCode) {
  return { value: isoCode }
})

const locales = localesJson.map(function (locale) {
  return { value: locale }
})

export function ConvertCurrency (initialState) {
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
  const { inputs, handleInput, handleSubmit } = useForm(
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
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ layers }) {
        handleInput(layers, 'layers')
      })
    },
    [handleInput]
  )
  return (
    <div>
      <Preview items={previewItems} />
      <Container space='medium'>
        <VerticalSpace space='large' />
        <Text muted>Currency</Text>
        <VerticalSpace space='small' />
        <TextboxAutocomplete
          filter
          strict
          name='targetCurrency'
          value={targetCurrency}
          options={currencies}
          onChange={handleInput}
        />
        <VerticalSpace space='small' />
        <Checkbox
          name='roundNumbers'
          value={roundNumbers === true}
          onChange={handleInput}
        >
          <Text>Round numbers</Text>
        </Checkbox>
        <VerticalSpace space='large' />
        <Text muted>Locale</Text>
        <VerticalSpace space='small' />
        <TextboxAutocomplete
          filter
          top
          name='locale'
          value={locale}
          options={locales}
          onChange={handleInput}
        />
        <VerticalSpace space='extraLarge' />
        <Button
          fullWidth
          disabled={
            previewItems === INVALID_SETTINGS ||
            previewItems === NO_TEXT_LAYERS ||
            previewItems.length === 0
          }
          onClick={handleSubmit}
        >
          Convert Currency
        </Button>
        <VerticalSpace space='small' />
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

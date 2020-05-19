/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Text,
  TextboxAutocomplete,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h } from 'preact'
import { useEffect } from 'preact/hooks'

import {
  INVALID_SETTINGS,
  NO_TEXT_LAYERS,
  Preview
} from '../../components/preview/preview'
import { convertCurrency } from '../../utilities/currency/convert-currency'
import { isValidLocale } from '../../utilities/currency/is-valid-locale'
import { moneyRegex } from '../../utilities/currency/money-regex'

const isoCodes = require('../../utilities/currency/data/iso-codes.json')
const localesJson = require('../../utilities/currency/data/locales.json')

const currencies = Object.keys(isoCodes).map(function (isoCode) {
  return { value: isoCode }
})

const locales = localesJson.map(function (locale) {
  return { value: locale }
})

export function ConvertCurrency(initialState) {
  const { state, handleChange, handleSubmit, isValid } = useForm(initialState, {
    transform: function (state) {
      const { layers, targetCurrency, roundNumbers, locale } = state
      return {
        ...state,
        previewItems: computePreview({
          layers,
          targetCurrency,
          roundNumbers,
          locale
        })
      }
    },
    validate: function ({ previewItems }) {
      return (
        previewItems !== INVALID_SETTINGS &&
        previewItems !== NO_TEXT_LAYERS &&
        previewItems.length > 0
      )
    },
    onSubmit: function ({ layers, targetCurrency, roundNumbers, locale }) {
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
      emit('SUBMIT', {
        layers: result,
        targetCurrency,
        roundNumbers,
        locale
      })
    },
    onClose: function () {
      emit('CLOSE_UI')
    }
  })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ layers }) {
        handleChange({ layers })
      })
    },
    [handleChange]
  )
  const { locale, previewItems, roundNumbers, targetCurrency } = state
  return (
    <Fragment>
      <Preview items={previewItems} />
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text muted>Currency</Text>
        <VerticalSpace space="small" />
        <TextboxAutocomplete
          name="targetCurrency"
          value={targetCurrency}
          options={currencies}
          onChange={handleChange}
          filter
          strict
        />
        <VerticalSpace space="small" />
        <Checkbox
          name="roundNumbers"
          value={roundNumbers === true}
          onChange={handleChange}
        >
          <Text>Round numbers</Text>
        </Checkbox>
        <VerticalSpace space="large" />
        <Text muted>Locale</Text>
        <VerticalSpace space="small" />
        <TextboxAutocomplete
          name="locale"
          value={locale}
          options={locales}
          onChange={handleChange}
          filter
          top
        />
        <VerticalSpace space="extraLarge" />
        <Button
          fullWidth
          disabled={isValid() === false}
          focused
          onClick={handleSubmit}
        >
          Convert Currency
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}

function computePreview({ layers, targetCurrency, roundNumbers, locale }) {
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

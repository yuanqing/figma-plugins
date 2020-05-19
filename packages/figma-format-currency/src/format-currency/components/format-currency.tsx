/** @jsx h */
import {
  Button,
  Container,
  SegmentedControl,
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
import localesJson from '../../utilities/currency/data/locales'
import { formatExplicit } from '../../utilities/currency/format-explicit'
import { formatRetain } from '../../utilities/currency/format-retain'
import { formatShort } from '../../utilities/currency/format-short'
import { isValidLocale } from '../../utilities/currency/is-valid-locale'
import { moneyRegex } from '../../utilities/currency/money-regex'
import { EXPLICIT, RETAIN, SHORT } from '../formats'

const formatters = {
  [EXPLICIT]: formatExplicit,
  [RETAIN]: formatRetain,
  [SHORT]: formatShort
}

const locales = localesJson.map(function (locale) {
  return { value: locale }
})

export function FormatCurrency(initialState) {
  const { state, handleChange, handleSubmit, isValid } = useForm(initialState, {
    transform: function (state) {
      const { layers, format, locale } = state
      return {
        ...state,
        previewItems: computePreview({
          layers,
          format,
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
    onSubmit: function ({ layers, format, locale }) {
      const formatter = formatters[format]
      const result = layers.map(function ({ id, characters }) {
        return {
          id,
          characters: formatter(characters, locale)
        }
      })
      emit('SUBMIT', {
        layers: result,
        format,
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
  const { format, locale, previewItems } = state
  return (
    <Fragment>
      <Preview items={previewItems} />
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text muted>Format</Text>
        <VerticalSpace space="small" />
        <SegmentedControl
          name="format"
          value={format}
          options={[{ value: EXPLICIT }, { value: SHORT }, { value: RETAIN }]}
          onChange={handleChange}
        />
        <VerticalSpace space="large" />
        <Text muted>Locale</Text>
        <VerticalSpace space="small" />
        <TextboxAutocomplete
          name="locale"
          value={locale}
          options={locales}
          onChange={handleChange}
          top
        />
        <VerticalSpace space="extraLarge" />
        <Button
          fullWidth
          disabled={isValid() === false}
          focused
          onClick={handleSubmit}
        >
          Format Currency
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}

function computePreview({ layers, format, locale }) {
  if (isValidLocale(locale) === false) {
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
      const formatter = formatters[format]
      result.push({
        original,
        result: formatter(original, locale)
      })
    })
  })
  return result
}

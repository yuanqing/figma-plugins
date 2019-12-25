/** @jsx h */
import {
  Button,
  Container,
  SegmentedControl,
  Text,
  TextboxAutocomplete,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { EXPLICIT, RETAIN, SHORT } from '../formats'
import {
  Preview,
  INVALID_SETTINGS,
  NO_TEXT_LAYERS
} from '../../preview/preview'
import { formatExplicit } from '../../utilities/currency/format-explicit'
import { formatRetain } from '../../utilities/currency/format-retain'
import { formatShort } from '../../utilities/currency/format-short'
import { isValidLocale } from '../../utilities/currency/is-valid-locale'
import { moneyRegex } from '../../utilities/currency/money-regex'
import localesJson from '../../utilities/currency/data/locales'

const transforms = {
  [EXPLICIT]: formatExplicit,
  [RETAIN]: formatRetain,
  [SHORT]: formatShort
}

const locales = localesJson.map(function (locale) {
  return { value: locale }
})

export function FormatCurrency (initialState) {
  function submitCallback ({ layers, format, locale }) {
    const transform = transforms[format]
    const result = layers.map(function ({ id, characters }) {
      return {
        id,
        characters: transform(characters, locale)
      }
    })
    triggerEvent('SUBMIT', {
      layers: result,
      format,
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
  const { layers, format, locale } = inputs
  const previewItems = computePreview({
    layers,
    format,
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
        <Text muted>Format</Text>
        <VerticalSpace space='small' />
        <SegmentedControl
          name='format'
          value={format}
          options={[{ value: EXPLICIT }, { value: SHORT }, { value: RETAIN }]}
          onChange={handleInput}
        />
        <VerticalSpace space='large' />
        <Text muted>Locale</Text>
        <VerticalSpace space='small' />
        <TextboxAutocomplete
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
          Format Currency
        </Button>
        <VerticalSpace space='small' />
      </Container>
    </div>
  )
}

function computePreview ({ layers, format, locale }) {
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
      const transform = transforms[format]
      result.push({
        original,
        result: transform(original, locale)
      })
    })
  })
  return result
}

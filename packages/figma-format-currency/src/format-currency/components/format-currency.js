/** @jsx h */
import {
  Button,
  Container,
  Header,
  SegmentedControl,
  TextboxAutocomplete,
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

const transforms = {
  [EXPLICIT]: formatExplicit,
  [RETAIN]: formatRetain,
  [SHORT]: formatShort
}

export function FormatCurrency (initialState) {
  const { inputs, setInputs, handleInput, handleSubmit } = useForm(
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
  function handleLocaleChange (locale) {
    setInputs({
      ...inputs,
      locale
    })
  }
  useEffect(function () {
    addEventListener('SELECTION_CHANGED', function (layers) {
      setInputs({
        ...inputs,
        layers
      })
    })
  }, [])
  return (
    <div>
      <Preview items={previewItems} />
      <Container>
        <Header>Format</Header>
        <SegmentedControl
          name='format'
          value={inputs.format}
          options={[{ value: EXPLICIT }, { value: SHORT }, { value: RETAIN }]}
          onChange={handleInput}
        />
        <Header>Locale</Header>
        <TextboxAutocomplete
          filter
          strict
          top
          name='locale'
          value={inputs.locale}
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
          Format Currency
        </Button>
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

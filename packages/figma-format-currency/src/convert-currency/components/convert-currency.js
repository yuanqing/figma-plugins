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
import { Preview } from '../../preview/preview'
import { convertCurrency } from '../../utilities/currency/convert-currency'
import { moneyRegex } from '../../utilities/currency/money-regex'

export function ConvertCurrency (initialState) {
  const { inputs, setInputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    false
  )
  const { layers, targetCurrency, roundNumbers, locale } = inputs
  const preview = computePreview({
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
      <Preview items={preview} />
      <Container>
        <Header>Currency</Header>
        <TextboxAutocomplete
          name='currency'
          value={inputs.targetCurrency}
          options={[{ value: 'USD' }, { value: 'EUR' }]}
          onChange={handleCurrencyChange}
        />
        <Checkbox
          name='roundNumbers'
          value={inputs.roundNumbers === true}
          onChange={handleInput}
          style={{ marginBottom: '-8px' }}
        >
          Round numbers
        </Checkbox>
        <Header>Locale</Header>
        <TextboxAutocomplete
          top
          name='locale'
          value={inputs.locale}
          options={[{ value: 'en-US' }, { value: 'de-DE' }]}
          onChange={handleLocaleChange}
        />
        <Button
          fullWidth
          disabled={preview === null || preview.length === 0}
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
  if (layers.length === 0) {
    return null
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

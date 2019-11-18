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
import { convertCurrency } from '../../utilities/currency/convert-currency'

export function ConvertCurrency (initialState) {
  function submitCallback ({ targetCurrency, roundNumbers, locale }) {
    triggerEvent('SUBMIT', { targetCurrency, roundNumbers, locale })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  useEffect(function () {
    addEventListener('CONVERT_CURRENCY_REQUEST', function ({
      layers,
      scope,
      targetCurrency,
      roundNumbers,
      locale
    }) {
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
      triggerEvent('CONVERT_CURRENCY_RESULT', {
        layers: result,
        scope,
        targetCurrency
      })
    })
  }, [])
  const { inputs, setInputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    false
  )
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
  return (
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
      <Button fullWidth onClick={handleSubmit} style={{ marginTop: '24px' }}>
        Convert Currency
      </Button>
    </Container>
  )
}

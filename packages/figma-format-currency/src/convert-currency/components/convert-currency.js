/** @jsx h */
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/button'
import { Checkbox } from 'figma-ui/src/components/checkbox'
import { Divider } from 'figma-ui/src/components/divider'
import { Header } from 'figma-ui/src/components/header'
import { Input } from 'figma-ui/src/components/input'
import { VerticalSpace } from 'figma-ui/src/components/vertical-space'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { convertCurrency } from '../convert-currency'

export function ConvertCurrency (initialState) {
  function submitCallback ({ locale, currency, roundNumbers }) {
    triggerEvent('SUBMIT', locale, currency, roundNumbers)
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  useEffect(function () {
    addEventListener('CONVERT_CURRENCY_REQUEST', function (
      layers,
      scope,
      locale,
      currency,
      roundNumbers
    ) {
      const result = layers.map(function (layer) {
        return {
          id: layer.id,
          characters: convertCurrency(
            layer.characters,
            locale,
            currency,
            roundNumbers
          )
        }
      })
      triggerEvent('CONVERT_CURRENCY_RESULT', result, scope, currency)
    })
  }, [])
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback
  )
  return (
    <div>
      <Header>Target Currency</Header>
      <Input
        name='currency'
        onChange={handleInput}
        value={inputs.currency}
        focused
      />
      <VerticalSpace size='small' />
      <Checkbox
        title='Round numbers'
        name='roundNumbers'
        onChange={handleInput}
        value={inputs.roundNumbers === true}
      />
      <VerticalSpace size='medium' />
      <Divider />
      <Header>Locale</Header>
      <Input name='locale' onChange={handleInput} value={inputs.locale} />
      <VerticalSpace size='medium' />
      <Divider />
      <Button onClick={handleSubmit}>Convert Currency</Button>
    </div>
  )
}

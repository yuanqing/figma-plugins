/** @jsx h */
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/button'
import { Checkbox } from 'figma-ui/src/components/checkbox'
import { Input } from 'figma-ui/src/components/input'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { convertCurrency } from '../convert-currency'
import './convert-currency.scss'

export function ConvertCurrency (initialState) {
  const { currency, locale, roundNumbers } = initialState
  function submitCallback ({ currency, roundNumbers }) {
    triggerEvent('SUBMIT', { currency, roundNumbers })
  }
  function cancelCallback () {
    triggerEvent('CLOSE')
  }
  useEffect(function () {
    addEventListener('CONVERT_CURRENCY', function (
      layers,
      scope,
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
    { currency, roundNumbers },
    submitCallback,
    cancelCallback
  )
  return (
    <div class='convert-currency'>
      <div class='convert-currency__label'>Select target currency…</div>
      <div class='convert-currency__input'>
        <Input
          active
          name='currency'
          onChange={handleInput}
          value={inputs.currency}
          focused
        />
      </div>
      <div class='convert-currency__checkbox'>
        <Checkbox
          title='Round numbers'
          name='roundNumbers'
          onChange={handleInput}
          value={inputs.roundNumbers === true}
        />
      </div>
      <div class='convert-currency__button'>
        <Button type='primary' onClick={handleSubmit}>
          Convert Currency
        </Button>
      </div>
    </div>
  )
}

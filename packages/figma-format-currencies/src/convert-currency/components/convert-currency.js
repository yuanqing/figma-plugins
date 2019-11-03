/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/button'
import { Input } from 'figma-ui/src/components/input'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import { convertCurrency } from '../convert-currency'
import './convert-currency.scss'

export function ConvertCurrency (initialState) {
  const { currency, locale, layers } = initialState
  function submitCallback ({ currency }) {
    const result = layers.map(function (layer) {
      return {
        id: layer.id,
        characters: convertCurrency(layer.characters, locale, currency)
      }
    })
    triggerEvent('CONVERT_CURRENCY_RESULT', currency, result)
  }
  function cancelCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    { currency },
    submitCallback,
    cancelCallback
  )
  return (
    <div class='convert-currency'>
      <div class='convert-currency__label'>Select target currency…</div>
      <div class='convert-currency__input'>
        <Input
          name='currency'
          onChange={handleInput}
          value={inputs.currency}
          focused
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

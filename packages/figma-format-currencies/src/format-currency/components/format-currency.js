/** @jsx h */
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/button'
import { Input } from 'figma-ui/src/components/input'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import './format-currency.scss'

export function FormatCurrency ({
  buttonText,
  transformCallback,
  ...initialState
}) {
  function submitCallback ({ locale }) {
    triggerEvent('SUBMIT', locale)
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  useEffect(function () {
    addEventListener('FORMAT_CURRENCY_REQUEST', function (
      layers,
      scope,
      locale
    ) {
      const result = layers.map(function ({ id, characters }) {
        return {
          id,
          characters: transformCallback(characters, locale)
        }
      })
      triggerEvent('FORMAT_CURRENCY_RESULT', result, scope, locale)
    })
  }, [])
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback
  )
  return (
    <div class='format-currency'>
      <div class='format-currency__input'>
        <Input
          name='locale'
          onChange={handleInput}
          value={inputs.locale}
          focused
        />
      </div>
      <div class='format-currency__button'>
        <Button type='primary' onClick={handleSubmit}>
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

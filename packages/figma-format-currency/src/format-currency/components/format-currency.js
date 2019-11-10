/** @jsx h */
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/button'
import { Input } from 'figma-ui/src/components/input'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import './format-currency.scss'
import { EXPLICIT, RETAIN, SHORT } from './formats'
import { formatExplicit } from '../../utilities/currency/format-explicit'
import { formatRetain } from '../../utilities/currency/format-retain'
import { formatShort } from '../../utilities/currency/format-short'

const transforms = {
  [EXPLICIT]: formatExplicit,
  [RETAIN]: formatRetain,
  [SHORT]: formatShort
}

export function FormatCurrency (initialState) {
  function submitCallback ({ format, locale }) {
    triggerEvent('SUBMIT', format, locale)
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  useEffect(function () {
    addEventListener('FORMAT_CURRENCY_REQUEST', function (
      layers,
      scope,
      format,
      locale
    ) {
      const transform = transforms[format]
      const result = layers.map(function ({ id, characters }) {
        return {
          id,
          characters: transform(characters, locale)
        }
      })
      triggerEvent('FORMAT_CURRENCY_RESULT', result, scope, format, locale)
    })
  }, [])
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback
  )
  return (
    <div class='format-currency'>
      <div class='format-currency__format'>
        <Input
          name='format'
          onChange={handleInput}
          value={inputs.format}
          focused
        />
      </div>
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
          Format Currency
        </Button>
      </div>
    </div>
  )
}

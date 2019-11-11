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
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback
  )
  return (
    <div>
      <Header>Target Currency</Header>
      <Input
        name='targetCurrency'
        onChange={handleInput}
        value={inputs.targetCurrency}
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

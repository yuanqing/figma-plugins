/** @jsx h */
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/button'
import { Divider } from 'figma-ui/src/components/divider'
import { Header } from 'figma-ui/src/components/header'
import { Input } from 'figma-ui/src/components/input'
import { SegmentedControl } from 'figma-ui/src/components/segmented-control'
import { VerticalSpace } from 'figma-ui/src/components/vertical-space'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { EXPLICIT, RETAIN, SHORT } from '../formats'
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
    <div>
      <Header>Format</Header>
      <SegmentedControl
        options={[RETAIN, EXPLICIT, SHORT]}
        name='format'
        onChange={handleInput}
        value={inputs.format}
      />
      <VerticalSpace size='medium' />
      <Divider />
      <Header>Locale</Header>
      <Input
        name='locale'
        onChange={handleInput}
        value={inputs.locale}
        focused
      />
      <VerticalSpace size='medium' />
      <Divider />
      <Button onClick={handleSubmit}>Format Currency</Button>
    </div>
  )
}

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
    triggerEvent('SUBMIT', { format, locale })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  useEffect(function () {
    addEventListener('FORMAT_CURRENCY_REQUEST', function ({
      layers,
      scope,
      format,
      locale
    }) {
      const transform = transforms[format]
      const result = layers.map(function ({ id, characters }) {
        return {
          id,
          characters: transform(characters, locale)
        }
      })
      triggerEvent('FORMAT_CURRENCY_RESULT', { layers: result, scope })
    })
  }, [])
  const { inputs, setInputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    false
  )
  function handleLocaleChange (locale) {
    setInputs({
      ...inputs,
      locale
    })
  }
  return (
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
        top
        name='locale'
        value={inputs.locale}
        options={[{ value: 'en-US' }, { value: 'de-DE' }]}
        onChange={handleLocaleChange}
      />
      <Button fullWidth onClick={handleSubmit} style={{ marginTop: '24px' }}>
        Format Currency
      </Button>
    </Container>
  )
}

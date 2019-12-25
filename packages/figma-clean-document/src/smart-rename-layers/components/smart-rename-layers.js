/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import {
  Button,
  Container,
  Text,
  Textbox,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import { h } from 'preact'

export function SmartRenameLayers (initialState) {
  const { inputs, handleInput, handleSubmit } = useForm(initialState, {
    submit: function (settings) {
      triggerEvent('SUBMIT', settings)
    },
    close: function () {
      triggerEvent('CLOSE')
    }
  })
  const { smartRenameLayersWhitelist } = inputs
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Ignore layers named</Text>
      <VerticalSpace space='small' />
      <Textbox
        name='smartRenameLayersWhitelist'
        value={smartRenameLayersWhitelist}
        onChange={handleInput}
      />
      <VerticalSpace space='extraLarge' />
      <Button fullWidth onClick={handleSubmit}>
        Smart Rename Layers
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

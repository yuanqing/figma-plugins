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
  const { state, handleChange, handleSubmit } = useForm(initialState, {
    onClose: function () {
      triggerEvent('CLOSE')
    },
    onSubmit: function (settings) {
      triggerEvent('SUBMIT', settings)
    }
  })
  const { smartRenameLayersWhitelist } = state
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Ignore layers named</Text>
      <VerticalSpace space='small' />
      <Textbox
        name='smartRenameLayersWhitelist'
        value={smartRenameLayersWhitelist}
        onChange={handleChange}
      />
      <VerticalSpace space='extraLarge' />
      <Button fullWidth onClick={handleSubmit}>
        Smart Rename Layers
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

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
  function submitCallback (settings) {
    triggerEvent('SMART_RENAME_LAYERS', settings)
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    true
  )
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
    </Container>
  )
}

/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import {
  Button,
  Container,
  Header,
  Textbox,
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
    <Container>
      <Header>Ignore layers named</Header>
      <Textbox
        name='smartRenameLayersWhitelist'
        value={smartRenameLayersWhitelist}
        onChange={handleInput}
      />
      <Button fullWidth onClick={handleSubmit} style={{ marginTop: '24px' }}>
        Smart Rename Layers
      </Button>
    </Container>
  )
}

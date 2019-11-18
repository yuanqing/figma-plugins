/** @jsx h */
import {
  Button,
  Container,
  Header,
  TextboxNumeric,
  useForm
} from '@create-figma-plugin/ui'
import { triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'

export function DrawSliceOverSelection (initialState) {
  function submitCallback ({ padding }) {
    triggerEvent('DRAW_SLICE_OVER_SELECTION', {
      padding: parseFloat(padding)
    })
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
  return (
    <Container>
      <Header>Padding</Header>
      <TextboxNumeric
        name='padding'
        onChange={handleInput}
        value={inputs.padding}
        focused
      />
      <Button fullWidth onClick={handleSubmit} style={{ marginTop: '24px' }}>
        Draw Slice Over Selection
      </Button>
    </Container>
  )
}

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

export function DistributeLayers ({ direction, icon, ...initialState }) {
  function submitCallback ({ space }) {
    triggerEvent('DISTRIBUTE_LAYERS', {
      space: parseFloat(space)
    })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback
  )
  return (
    <Container>
      <Header>Space</Header>
      <TextboxNumeric
        name='space'
        icon={icon}
        onChange={handleInput}
        value={inputs.space}
        focused
      />
      <Button fullWidth onClick={handleSubmit} style={{ marginTop: '24px' }}>
        Distribute Layers {direction}
      </Button>
    </Container>
  )
}

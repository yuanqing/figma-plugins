/** @jsx h */
import { Button } from '@create-figma-plugin/ui/src/components/button/button'
import { Container } from '@create-figma-plugin/ui/src/components/container/container'
import { Header } from '@create-figma-plugin/ui/src/components/header/header'
import { TextboxNumeric } from '@create-figma-plugin/ui/src/components/textbox/textbox-numeric/textbox-numeric'
import { useForm } from '@create-figma-plugin/ui/src/hooks/use-form'
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
      <Button fullWidth onClick={handleSubmit} style={{ marginTop: 12 }}>
        Distribute Layers {direction}
      </Button>
    </Container>
  )
}

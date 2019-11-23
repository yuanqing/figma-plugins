/** @jsx h */
import {
  Button,
  Container,
  Header,
  TextboxNumeric,
  useForm
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

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
    closeCallback,
    true
  )
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(true)
  useEffect(function () {
    addEventListener('SELECTION_CHANGED', function (isSubmiButtonEnabled) {
      setIsSubmitButtonEnabled(isSubmiButtonEnabled)
    })
  }, [])
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
      <Button
        fullWidth
        disabled={isSubmitButtonEnabled === false}
        onClick={handleSubmit}
        style={{ marginTop: '24px' }}
      >
        Distribute Layers {direction}
      </Button>
    </Container>
  )
}

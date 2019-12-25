/** @jsx h */
import {
  Button,
  Container,
  Text,
  TextboxNumeric,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import {
  addEventListener,
  evaluateNumericExpression,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function DistributeLayers ({ direction, icon, ...initialState }) {
  function submitCallback ({ space }) {
    triggerEvent('SUBMIT', {
      space: evaluateNumericExpression(space)
    })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    {
      ...initialState,
      hasSelection: true
    },
    submitCallback,
    closeCallback,
    true
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ hasSelection }) {
        handleInput(hasSelection, 'hasSelection')
      })
    },
    [handleInput]
  )
  const { hasSelection, space } = inputs
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Space</Text>
      <VerticalSpace space='small' />
      <TextboxNumeric
        name='space'
        icon={icon}
        onChange={handleInput}
        propagateEscapeKeyDown
        value={space}
        focused
      />
      <VerticalSpace space='extraLarge' />
      <Button
        fullWidth
        disabled={
          hasSelection === false || evaluateNumericExpression(space) === null
        }
        onClick={handleSubmit}
      >
        Distribute Layers {direction}
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

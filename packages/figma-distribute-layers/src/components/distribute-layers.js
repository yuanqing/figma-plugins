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
  const { inputs, handleInput, handleSubmit, isValid } = useForm(initialState, {
    validate: function ({ hasSelection, space }) {
      return hasSelection === true && evaluateNumericExpression(space) !== null
    },
    submit: function ({ space }) {
      triggerEvent('SUBMIT', {
        space: evaluateNumericExpression(space)
      })
    },
    close: function () {
      triggerEvent('CLOSE')
    }
  })
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ hasSelection }) {
        handleInput(hasSelection, 'hasSelection')
      })
    },
    [handleInput]
  )
  const { space } = inputs
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
      <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
        Distribute Layers {direction}
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

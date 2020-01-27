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
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    initialState,
    {
      validate: function ({ hasSelection, space }) {
        return (
          hasSelection === true && evaluateNumericExpression(space) !== null
        )
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ space }) {
        triggerEvent('SUBMIT', {
          space: evaluateNumericExpression(space)
        })
      }
    }
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )
  const { space } = state
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Space</Text>
      <VerticalSpace space='small' />
      <TextboxNumeric
        name='space'
        icon={icon}
        value={space}
        onChange={handleChange}
      />
      <VerticalSpace space='extraLarge' />
      <Button fullWidth disabled={isInvalid() === true} onClick={handleSubmit}>
        Distribute Layers {direction}
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

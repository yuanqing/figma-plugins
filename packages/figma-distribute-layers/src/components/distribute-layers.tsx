/** @jsx h */
import {
  Button,
  Container,
  Text,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import {
  emit,
  evaluateNumericExpression,
  on
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function DistributeLayers({ direction, icon, ...initialState }) {
  const { state, handleChange, handleSubmit, isValid } = useForm(initialState, {
    validate: function ({ hasSelection, space }) {
      return hasSelection === true && evaluateNumericExpression(space) !== null
    },
    onSubmit: function ({ space }) {
      emit('SUBMIT', {
        space: evaluateNumericExpression(space)
      })
    },
    onClose: function () {
      emit('CLOSE_UI')
    }
  })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )
  const { space } = state
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Space</Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        name="space"
        icon={icon}
        value={space}
        onChange={handleChange}
      />
      <VerticalSpace space="extraLarge" />
      <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
        Distribute Layers {direction}
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}

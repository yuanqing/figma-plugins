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

export function DistributeLayers(props: { [key: string]: any }): h.JSX.Element {
  const { direction, icon, ...rest } = props
  const { state, handleChange, handleSubmit, isValid } = useForm(rest, {
    onClose: function () {
      emit('CLOSE_UI')
    },
    onSubmit: function ({ space }) {
      emit('SUBMIT', {
        space: evaluateNumericExpression(space)
      })
    },
    validate: function ({ hasSelection, space }) {
      return hasSelection === true && evaluateNumericExpression(space) !== null
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
        icon={icon}
        name="space"
        onChange={handleChange}
        value={space}
      />
      <VerticalSpace space="extraLarge" />
      <Button disabled={isValid() === false} fullWidth onClick={handleSubmit}>
        Distribute Layers {direction}
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}

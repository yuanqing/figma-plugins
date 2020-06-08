/** @jsx h */
import {
  Button,
  Columns,
  Container,
  moveDownIcon,
  moveRightIcon,
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

export function MoveNodes(props: { [key: string]: any }): h.JSX.Element {
  const { state, handleChange, handleSubmit, isValid } = useForm(props, {
    onClose: function () {
      emit('CLOSE_UI')
    },
    onSubmit: function ({ horizontalOffset, verticalOffset }) {
      emit('SUBMIT', {
        horizontalOffset: evaluateNumericExpression(horizontalOffset),
        verticalOffset: evaluateNumericExpression(verticalOffset)
      })
    },
    validate: function ({ hasSelection, horizontalOffset, verticalOffset }) {
      const evaluatedHorizontalOffset = evaluateNumericExpression(
        horizontalOffset
      )
      const evaluatedVerticalOffset = evaluateNumericExpression(verticalOffset)
      return (
        hasSelection === true &&
        ((evaluatedHorizontalOffset !== null &&
          evaluatedHorizontalOffset !== 0) ||
          (evaluatedVerticalOffset !== null && evaluatedVerticalOffset !== 0))
      )
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
  const { horizontalOffset, verticalOffset } = state
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Columns space="extraSmall">
        <TextboxNumeric
          icon={moveRightIcon}
          name="horizontalOffset"
          onChange={handleChange}
          value={horizontalOffset === null ? '' : horizontalOffset}
        />
        <TextboxNumeric
          icon={moveDownIcon}
          name="verticalOffset"
          onChange={handleChange}
          value={verticalOffset === null ? '' : verticalOffset}
        />
      </Columns>
      <VerticalSpace space="large" />
      <Button disabled={isValid() === false} fullWidth onClick={handleSubmit}>
        Move Layers
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}

/** @jsx h */
import {
  Button,
  Columns,
  Container,
  TextboxNumeric,
  VerticalSpace,
  moveDownIcon,
  moveRightIcon,
  useForm
} from '@create-figma-plugin/ui'
import {
  addEventListener,
  evaluateNumericExpression,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function MoveLayers (initialState) {
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    initialState,
    {
      validate: function ({ hasSelection, horizontalOffset, verticalOffset }) {
        const evaluatedHorizontalOffset = evaluateNumericExpression(
          horizontalOffset
        )
        const evaluatedVerticalOffset = evaluateNumericExpression(
          verticalOffset
        )
        return (
          hasSelection === true &&
          ((evaluatedHorizontalOffset !== null &&
            evaluatedHorizontalOffset !== 0) ||
            (evaluatedVerticalOffset !== null && evaluatedVerticalOffset !== 0))
        )
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ horizontalOffset, verticalOffset }) {
        triggerEvent('SUBMIT', {
          horizontalOffset: evaluateNumericExpression(horizontalOffset),
          verticalOffset: evaluateNumericExpression(verticalOffset)
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
  const { horizontalOffset, verticalOffset } = state
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Columns space='extraSmall'>
        <TextboxNumeric
          name='horizontalOffset'
          icon={moveRightIcon}
          value={horizontalOffset}
          onChange={handleChange}
          propagateEscapeKeyDown
          focused
        />
        <TextboxNumeric
          name='verticalOffset'
          icon={moveDownIcon}
          value={verticalOffset}
          onChange={handleChange}
          propagateEscapeKeyDown
        />
      </Columns>
      <VerticalSpace space='large' />
      <Button fullWidth disabled={isInvalid() === true} onClick={handleSubmit}>
        Move Layers
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

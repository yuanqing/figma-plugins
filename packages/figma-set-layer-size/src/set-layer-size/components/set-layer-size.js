/** @jsx h */
import {
  Button,
  Checkbox,
  Columns,
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
import { MIXED } from '../utilities/constants'

export function SetLayerSize (initialState) {
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    initialState,
    {
      validate: function ({ selectedLayers, width, height }) {
        if (selectedLayers.length === 0) {
          return false
        }
        const evaluatedWidth = evaluateNumericExpression(width)
        const evaluatedHeight = evaluateNumericExpression(height)
        return (
          (evaluatedWidth !== null && evaluatedWidth !== 0) ||
          (evaluatedHeight !== null && evaluatedHeight !== 0)
        )
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({
        selectedLayers,
        width,
        height,
        resizeWithConstraints
      }) {
        triggerEvent('SUBMIT', {
          selectedLayers,
          width: evaluateNumericExpression(width),
          height: evaluateNumericExpression(height),
          resizeWithConstraints
        })
      }
    }
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({
        selectedLayers,
        width,
        height
      }) {
        handleChange({ selectedLayers, width, height })
      })
    },
    [handleChange]
  )
  const { width, height, resizeWithConstraints, selectedLayers } = state
  const hasSelection = selectedLayers.length > 0
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Columns space='extraSmall'>
        <TextboxNumeric
          name='width'
          icon='W'
          value={width === MIXED ? null : width}
          minimum={0}
          onChange={handleChange}
          focused
          disabled={hasSelection === false}
        />
        <TextboxNumeric
          name='height'
          icon='H'
          value={height === MIXED ? null : height}
          minimum={0}
          onChange={handleChange}
          disabled={hasSelection === false}
        />
      </Columns>
      <VerticalSpace space='large' />
      <Checkbox
        name='resizeWithConstraints'
        value={resizeWithConstraints}
        onChange={handleChange}
        disabled={hasSelection === false}
      >
        <Text>Resize with constraints</Text>
      </Checkbox>
      <VerticalSpace space='large' />
      <Button fullWidth disabled={isInvalid() === true} onClick={handleSubmit}>
        Set Layer Size
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

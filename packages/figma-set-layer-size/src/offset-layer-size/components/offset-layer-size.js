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

export function OffsetLayerSize (initialState) {
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    initialState,
    {
      validate: function ({ selectedLayers, offsetWidth, offsetHeight }) {
        if (selectedLayers.length === 0) {
          return false
        }
        const evaluatedWidth = evaluateNumericExpression(offsetWidth)
        const evaluatedHeight = evaluateNumericExpression(offsetHeight)
        return evaluatedWidth !== null || evaluatedHeight !== null
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({
        selectedLayers,
        offsetWidth,
        offsetHeight,
        resizeWithConstraints
      }) {
        triggerEvent('SUBMIT', {
          selectedLayers,
          offsetWidth: evaluateNumericExpression(offsetWidth),
          offsetHeight: evaluateNumericExpression(offsetHeight),
          resizeWithConstraints
        })
      }
    }
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({
        selectedLayers
      }) {
        handleChange({ selectedLayers })
      })
    },
    [handleChange]
  )
  const {
    offsetWidth,
    offsetHeight,
    resizeWithConstraints,
    selectedLayers
  } = state
  const hasSelection = selectedLayers.length > 0
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Columns space='extraSmall'>
        <TextboxNumeric
          name='offsetWidth'
          icon='W'
          value={offsetWidth === null ? '' : offsetWidth}
          onChange={handleChange}
          disabled={hasSelection === false}
        />
        <TextboxNumeric
          name='offsetHeight'
          icon='H'
          value={offsetHeight === null ? '' : offsetHeight}
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
        Offset Layer Size
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

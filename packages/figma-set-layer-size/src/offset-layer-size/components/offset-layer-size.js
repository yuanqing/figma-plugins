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
  emit,
  evaluateNumericExpression,
  on
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function OffsetLayerSize (initialState) {
  const { state, handleChange, handleSubmit, isValid } = useForm(initialState, {
    validate: function ({ selectedLayers, offsetWidth, offsetHeight }) {
      if (selectedLayers.length === 0) {
        return false
      }
      const evaluatedWidth = evaluateNumericExpression(offsetWidth)
      const evaluatedHeight = evaluateNumericExpression(offsetHeight)
      return evaluatedWidth !== null || evaluatedHeight !== null
    },
    onSubmit: function ({
      selectedLayers,
      offsetWidth,
      offsetHeight,
      resizeWithConstraints
    }) {
      emit('SUBMIT', {
        selectedLayers,
        offsetWidth: evaluateNumericExpression(offsetWidth),
        offsetHeight: evaluateNumericExpression(offsetHeight),
        resizeWithConstraints
      })
    },
    onClose: function () {
      emit('CLOSE_UI')
    }
  })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ selectedLayers }) {
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
      <VerticalSpace space='medium' />
      <Checkbox
        name='resizeWithConstraints'
        value={resizeWithConstraints}
        onChange={handleChange}
        disabled={hasSelection === false}
      >
        <Text>Resize with constraints</Text>
      </Checkbox>
      <VerticalSpace space='medium' />
      <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
        Offset Layer Size
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

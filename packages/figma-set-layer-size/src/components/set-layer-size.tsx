/** @jsx h */
import {
  Button,
  Checkbox,
  Columns,
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

import { MIXED } from '../utilities/constants'

export function SetLayerSize(props: { [key: string]: any }): h.JSX.Element {
  const { state, handleChange, handleSubmit, isValid } = useForm(props, {
    onClose: function () {
      emit('CLOSE_UI')
    },
    onSubmit: function ({ nodes, width, height, resizeWithConstraints }) {
      emit('SUBMIT', {
        height: evaluateNumericExpression(height),
        nodes,
        resizeWithConstraints,
        width: evaluateNumericExpression(width)
      })
    },
    validate: function ({ nodes, width, height }) {
      if (nodes.length === 0) {
        return false
      }
      const evaluatedWidth = evaluateNumericExpression(width)
      const evaluatedHeight = evaluateNumericExpression(height)
      return (
        (evaluatedWidth !== null && evaluatedWidth !== 0) ||
        (evaluatedHeight !== null && evaluatedHeight !== 0)
      )
    }
  })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ nodes, width, height }) {
        handleChange({ height, nodes, width })
      })
    },
    [handleChange]
  )
  const { nodes, width, height, resizeWithConstraints } = state
  const hasSelection = nodes.length > 0
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Columns space="extraSmall">
        <TextboxNumeric
          disabled={hasSelection === false}
          icon="W"
          minimum={0}
          name="width"
          onChange={handleChange}
          value={width === MIXED ? null : width}
        />
        <TextboxNumeric
          disabled={hasSelection === false}
          icon="H"
          minimum={0}
          name="height"
          onChange={handleChange}
          value={height === MIXED ? null : height}
        />
      </Columns>
      <VerticalSpace space="medium" />
      <Checkbox
        disabled={hasSelection === false}
        name="resizeWithConstraints"
        onChange={handleChange}
        value={resizeWithConstraints}
      >
        <Text>Resize with constraints</Text>
      </Checkbox>
      <VerticalSpace space="medium" />
      <Button disabled={isValid() === false} fullWidth onClick={handleSubmit}>
        Set Layer Size
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}

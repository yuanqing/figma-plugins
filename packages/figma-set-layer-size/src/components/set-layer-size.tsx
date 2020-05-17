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
import { MIXED } from '../utilities/constants'

export function SetLayerSize (props: any) {
  const { state, handleChange, handleSubmit, isValid } = useForm(props, {
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
    },
    onSubmit: function ({ nodes, width, height, resizeWithConstraints }) {
      emit('SUBMIT', {
        nodes,
        width: evaluateNumericExpression(width),
        height: evaluateNumericExpression(height),
        resizeWithConstraints
      })
    },
    onClose: function () {
      emit('CLOSE_UI')
    }
  })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ nodes, width, height }) {
        handleChange({ nodes, width, height })
      })
    },
    [handleChange]
  )
  const { nodes, width, height, resizeWithConstraints } = state
  const hasSelection = nodes.length > 0
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
        Set Layer Size
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

/** @jsx h */
import {
  Button,
  Columns,
  Container,
  SegmentedControl,
  Text,
  TextboxNumeric,
  VerticalSpace,
  spaceHorizontalIcon,
  spaceVerticalIcon,
  useForm
} from '@create-figma-plugin/ui'
import {
  addEventListener,
  evaluateNumericExpression,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { Preview } from './preview/preview'

const groupDefinitions = [
  { value: 1, text: '1st /' },
  { value: 2, text: '2nd /' },
  { value: 3, text: '3rd /' },
  { value: 4, text: '4th /' },
  { value: 5, text: '5th /' }
]

export function OrganizeLayers (initialState) {
  const { inputs, handleInput, handleSubmit, isValid } = useForm(initialState, {
    validate: function ({ layers }) {
      return layers.length > 0
    },
    submit: function ({ groupDefinition, horizontalSpace, verticalSpace }) {
      triggerEvent('SUBMIT', {
        groupDefinition,
        horizontalSpace: evaluateNumericExpression(horizontalSpace) || 0,
        verticalSpace: evaluateNumericExpression(verticalSpace) || 0
      })
    },
    close: function () {
      triggerEvent('CLOSE')
    }
  })
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({
        layers,
        maximumGroupDefinition
      }) {
        handleInput(layers, 'layers')
        handleInput(maximumGroupDefinition, 'maximumGroupDefinition')
      })
    },
    [handleInput]
  )
  const {
    groupDefinition,
    horizontalSpace,
    maximumGroupDefinition,
    verticalSpace
  } = inputs
  return (
    <div>
      <Preview {...inputs} />
      <Container space='medium'>
        <VerticalSpace space='large' />
        <Text muted>Group by text before</Text>
        <VerticalSpace space='small' />
        <SegmentedControl
          name='groupDefinition'
          value={Math.min(groupDefinition, maximumGroupDefinition)}
          options={groupDefinitions.slice(0, maximumGroupDefinition)}
          onChange={handleInput}
        />
        <VerticalSpace space='large' />
        <Text muted>Space between layers</Text>
        <VerticalSpace space='small' />
        <Columns space='extraSmall'>
          <TextboxNumeric
            name='horizontalSpace'
            icon={spaceHorizontalIcon}
            onChange={handleInput}
            value={horizontalSpace}
          />
          <TextboxNumeric
            name='verticalSpace'
            icon={spaceVerticalIcon}
            onChange={handleInput}
            value={verticalSpace}
          />
        </Columns>
        <VerticalSpace space='large' />
        <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
          Organize Layers
        </Button>
        <VerticalSpace space='small' />
      </Container>
    </div>
  )
}

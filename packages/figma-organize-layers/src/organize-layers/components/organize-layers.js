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
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    initialState,
    {
      validate: function ({ layers }) {
        return layers.length > 0
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ groupDefinition, horizontalSpace, verticalSpace }) {
        triggerEvent('SUBMIT', {
          groupDefinition,
          horizontalSpace: evaluateNumericExpression(horizontalSpace) || 0,
          verticalSpace: evaluateNumericExpression(verticalSpace) || 0
        })
      }
    }
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({
        layers,
        maximumGroupDefinition
      }) {
        handleChange({ layers, maximumGroupDefinition })
      })
    },
    [handleChange]
  )
  const {
    groupDefinition,
    horizontalSpace,
    maximumGroupDefinition,
    verticalSpace
  } = state
  return (
    <div>
      <Preview {...state} />
      <Container space='medium'>
        <VerticalSpace space='large' />
        <Text muted>Group by text before</Text>
        <VerticalSpace space='small' />
        <SegmentedControl
          name='groupDefinition'
          value={Math.min(groupDefinition, maximumGroupDefinition)}
          options={groupDefinitions.slice(0, maximumGroupDefinition)}
          onChange={handleChange}
        />
        <VerticalSpace space='large' />
        <Text muted>Space between layers</Text>
        <VerticalSpace space='small' />
        <Columns space='extraSmall'>
          <TextboxNumeric
            name='horizontalSpace'
            icon={spaceHorizontalIcon}
            value={horizontalSpace}
            minimum={0}
            onChange={handleChange}
          />
          <TextboxNumeric
            name='verticalSpace'
            icon={spaceVerticalIcon}
            value={verticalSpace}
            minimum={0}
            onChange={handleChange}
          />
        </Columns>
        <VerticalSpace space='large' />
        <Button
          fullWidth
          disabled={isInvalid() === true}
          onClick={handleSubmit}
        >
          Organize Layers
        </Button>
        <VerticalSpace space='small' />
      </Container>
    </div>
  )
}

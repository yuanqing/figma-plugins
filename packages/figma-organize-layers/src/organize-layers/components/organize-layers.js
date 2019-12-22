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
  function submitCallback ({
    groupDefinition,
    horizontalSpace,
    verticalSpace
  }) {
    triggerEvent('ORGANIZE_LAYERS', {
      groupDefinition,
      horizontalSpace: evaluateNumericExpression(horizontalSpace) || 0,
      verticalSpace: evaluateNumericExpression(verticalSpace) || 0
    })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, setInputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    true
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function (
        layers,
        maximumGroupDefinition
      ) {
        setInputs({
          ...inputs,
          layers,
          maximumGroupDefinition
        })
      })
    },
    [inputs, setInputs]
  )
  const {
    groupDefinition,
    horizontalSpace,
    layers,
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
        <Button fullWidth disabled={layers.length === 0} onClick={handleSubmit}>
          Organize Layers
        </Button>
      </Container>
    </div>
  )
}

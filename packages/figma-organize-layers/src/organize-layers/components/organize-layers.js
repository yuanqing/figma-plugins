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
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
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
      horizontalSpace: castToNumber(horizontalSpace),
      verticalSpace: castToNumber(verticalSpace)
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
      addEventListener('SELECTION_CHANGED', function (
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
    [setInputs, inputs]
  )
  return (
    <div>
      <Preview {...inputs} />
      <Container space='medium'>
        <VerticalSpace space='large' />
        <Text muted>Group by text before</Text>
        <VerticalSpace space='small' />
        <SegmentedControl
          key='groupDefinition'
          value={Math.min(
            inputs.groupDefinition,
            inputs.maximumGroupDefinition
          )}
          options={groupDefinitions.slice(0, inputs.maximumGroupDefinition)}
          onChange={handleInput}
        />
        <VerticalSpace space='large' />
        <Text muted>Space between layers</Text>
        <VerticalSpace space='small' />
        <Columns space='extraSmall'>
          <TextboxNumeric
            key='horizontalSpace'
            icon={spaceHorizontalIcon}
            onChange={handleInput}
            value={inputs.horizontalSpace}
          />
          <TextboxNumeric
            key='verticalSpace'
            icon={spaceVerticalIcon}
            onChange={handleInput}
            value={inputs.verticalSpace}
          />
        </Columns>
        <VerticalSpace space='large' />
        <Button
          fullWidth
          disabled={inputs.layers.length === 0}
          onClick={handleSubmit}
        >
          Organize Layers
        </Button>
      </Container>
    </div>
  )
}

function castToNumber (string) {
  const result = parseFloat(string)
  return isNaN(result) === true ? 0 : result
}

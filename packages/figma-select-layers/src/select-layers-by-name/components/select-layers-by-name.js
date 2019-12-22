/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Text,
  Textbox,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import {
  addEventListener,
  pluralize,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { filterLayersByName } from '../filter-layers-by-name'

export function SelectLayersByName (initialState) {
  function submitCallback ({ exactMatch, layerName }) {
    triggerEvent('SUBMIT', {
      exactMatch,
      layerName
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
        hasSelection
      ) {
        setInputs({
          ...inputs,
          layers,
          hasSelection
        })
      })
    },
    [inputs, setInputs]
  )
  const { exactMatch, layerName, layers, hasSelection } = inputs
  const selectedLayersCount = filterLayersByName(layers, layerName, exactMatch)
    .length
  const scope = hasSelection ? 'within selection' : 'on page'
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Layer name</Text>
      <VerticalSpace space='small' />
      <Textbox
        name='layerName'
        value={layerName}
        onChange={handleInput}
        propagateEscapeKeyDown
        focused
      />
      <VerticalSpace space='small' />
      <Checkbox
        name='exactMatch'
        value={exactMatch === true}
        onChange={handleInput}
      >
        <Text>Exact match</Text>
      </Checkbox>
      <VerticalSpace space='medium' />
      <Button
        fullWidth
        disabled={selectedLayersCount === 0}
        onClick={handleSubmit}
      >
        Select Layers
      </Button>
      <VerticalSpace space='small' />
      <Text muted align='center'>
        {selectedLayersCount === 0
          ? 'No matches'
          : `${selectedLayersCount} ${pluralize(
              selectedLayersCount,
              'match',
              'matches'
            )} ${scope}`}
      </Text>
    </Container>
  )
}

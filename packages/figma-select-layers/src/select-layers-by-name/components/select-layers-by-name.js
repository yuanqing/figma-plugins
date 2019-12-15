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
import { useCallback, useEffect } from 'preact/hooks'

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
  const { inputs, setInputs, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    true
  )
  useEffect(
    function () {
      return addEventListener('FILTER_LAYERS_BY_NAME_RESULT', setInputs)
    },
    [setInputs]
  )
  const handleChange = useCallback(
    function (value, name) {
      triggerEvent('FILTER_LAYERS_BY_NAME_REQUEST', {
        ...inputs,
        [name]: value
      })
    },
    [inputs]
  )
  const { exactMatch, layerName, selectedLayersCount } = inputs
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Layer name</Text>
      <VerticalSpace space='small' />
      <Textbox
        name='layerName'
        value={layerName}
        onChange={handleChange}
        focused
      />
      <VerticalSpace space='small' />
      <Checkbox
        name='exactMatch'
        value={exactMatch === true}
        onChange={handleChange}
      >
        <Text>Exact match</Text>
      </Checkbox>
      <VerticalSpace space='medium' />
      <Button
        fullWidth
        disabled={selectedLayersCount === 0}
        onClick={handleSubmit}
      >
        {selectedLayersCount === 0
          ? 'No Matches'
          : `Select ${selectedLayersCount} ${pluralize(
              selectedLayersCount,
              'Layer'
            )}`}
      </Button>
    </Container>
  )
}

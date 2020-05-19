/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Text,
  Textbox,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function SelectLayersByName(initialState) {
  const { state, handleChange, handleSubmit, isValid } = useForm(initialState, {
    validate: function ({ layerName }) {
      return layerName !== ''
    },
    onSubmit: function ({ exactMatch, layerName }) {
      emit('SUBMIT', {
        exactMatch,
        layerName
      })
    },
    onClose: function () {
      emit('CLOSE_UI')
    }
  })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )
  const { exactMatch, layerName, hasSelection } = state
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Textbox
        name="layerName"
        placeholder="Layer name"
        value={layerName}
        onChange={handleChange}
      />
      <VerticalSpace space="small" />
      <Checkbox
        name="exactMatch"
        value={exactMatch === true}
        onChange={handleChange}
      >
        <Text>Exact match</Text>
      </Checkbox>
      <VerticalSpace space="medium" />
      <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
        Select Layers by Name
      </Button>
      <VerticalSpace space="small" />
      <Text muted align="center">
        {hasSelection === true
          ? 'Matching layers within selection'
          : 'Matching layers on page'}
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}

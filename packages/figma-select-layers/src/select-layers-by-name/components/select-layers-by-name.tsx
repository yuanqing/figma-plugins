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
    onClose: function () {
      emit('CLOSE_UI')
    },
    onSubmit: function ({ exactMatch, layerName }) {
      emit('SUBMIT', {
        exactMatch,
        layerName
      })
    },
    validate: function ({ layerName }) {
      return layerName !== ''
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
        onChange={handleChange}
        placeholder="Layer name"
        value={layerName}
      />
      <VerticalSpace space="small" />
      <Checkbox
        name="exactMatch"
        onChange={handleChange}
        value={exactMatch === true}
      >
        <Text>Exact match</Text>
      </Checkbox>
      <VerticalSpace space="medium" />
      <Button disabled={isValid() === false} fullWidth onClick={handleSubmit}>
        Select Layers by Name
      </Button>
      <VerticalSpace space="small" />
      <Text align="center" muted>
        {hasSelection === true
          ? 'Matching layers within selection'
          : 'Matching layers on page'}
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}

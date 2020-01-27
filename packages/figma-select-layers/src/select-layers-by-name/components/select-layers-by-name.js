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
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function SelectLayersByName (initialState) {
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    initialState,
    {
      validate: function ({ layerName }) {
        return layerName !== ''
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ exactMatch, layerName }) {
        triggerEvent('SUBMIT', {
          exactMatch,
          layerName
        })
      }
    }
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )
  const { exactMatch, layerName, hasSelection } = state
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Textbox
        name='layerName'
        placeholder='Layer name'
        value={layerName}
        onChange={handleChange}
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
      <Button fullWidth disabled={isInvalid() === true} onClick={handleSubmit}>
        Select Layers by Name
      </Button>
      <VerticalSpace space='small' />
      <Text muted align='center'>
        {hasSelection === true
          ? 'Matching layers within selection'
          : 'Matching layers on page'}
      </Text>
      <VerticalSpace space='extralarge' />
    </Container>
  )
}

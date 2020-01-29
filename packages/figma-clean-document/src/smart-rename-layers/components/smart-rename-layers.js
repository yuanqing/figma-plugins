/** @jsx h */
import {
  Button,
  Container,
  Text,
  Textbox,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function SmartRenameLayers (initialState) {
  const { state, handleChange, handleSubmit } = useForm(initialState, {
    onClose: function () {
      triggerEvent('CLOSE')
    },
    onSubmit: function ({ smartRenameLayersWhitelist }) {
      triggerEvent('SUBMIT', { smartRenameLayersWhitelist })
    }
  })
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )
  const { hasSelection, smartRenameLayersWhitelist } = state
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Ignore layers named</Text>
      <VerticalSpace space='small' />
      <Textbox
        name='smartRenameLayersWhitelist'
        value={smartRenameLayersWhitelist}
        onChange={handleChange}
      />
      <VerticalSpace space='extraLarge' />
      <Button fullWidth onClick={handleSubmit}>
        Smart Rename Layers
      </Button>
      <VerticalSpace space='small' />
      <Text muted align='center'>
        {hasSelection === true
          ? 'Will rename layers in selection'
          : 'Will rename layers on page'}
      </Text>
      <VerticalSpace space='extraLarge' />
    </Container>
  )
}

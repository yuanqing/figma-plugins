/** @jsx h */
import {
  Button,
  Container,
  Text,
  Textbox,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function SmartRenameLayers(initialState) {
  const { state, handleChange, handleSubmit } = useForm(
    { ...initialState, isLoading: false },
    {
      onSubmit: function ({ smartRenameLayersWhitelist }) {
        emit('SUBMIT', { smartRenameLayersWhitelist })
      },
      onClose: function () {
        emit('CLOSE_UI')
      }
    }
  )
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )
  const { hasSelection, isLoading, smartRenameLayersWhitelist } = state
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Ignore layers named</Text>
      <VerticalSpace space="small" />
      <Textbox
        name="smartRenameLayersWhitelist"
        value={smartRenameLayersWhitelist}
        onChange={handleChange}
        disabled={isLoading === true}
      />
      <VerticalSpace space="extraLarge" />
      <Button
        fullWidth
        onClick={handleSubmit}
        disabled={isLoading === true}
        loading={isLoading === true}
        focused
      >
        Smart Rename Layers
      </Button>
      <VerticalSpace space="small" />
      <Text muted align="center">
        {hasSelection === true
          ? 'Renaming layers in selection'
          : 'Renaming all layers on page'}
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}

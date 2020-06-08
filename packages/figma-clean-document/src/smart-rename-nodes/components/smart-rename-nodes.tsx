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

export function SmartRenameNodes(props: { [key: string]: any }): h.JSX.Element {
  const { state, handleChange, handleSubmit } = useForm(
    { ...props, isLoading: false },
    {
      onClose: function () {
        emit('CLOSE_UI')
      },
      onSubmit: function ({ smartRenameLayersWhitelist }) {
        emit('SUBMIT', { smartRenameLayersWhitelist })
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
        disabled={isLoading === true}
        name="smartRenameLayersWhitelist"
        onChange={handleChange}
        value={smartRenameLayersWhitelist}
      />
      <VerticalSpace space="extraLarge" />
      <Button
        disabled={isLoading === true}
        focused
        fullWidth
        loading={isLoading === true}
        onClick={handleSubmit}
      >
        Smart Rename Layers
      </Button>
      <VerticalSpace space="small" />
      <Text align="center" muted>
        {hasSelection === true
          ? 'Renaming layers in selection'
          : 'Renaming all layers on page'}
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}

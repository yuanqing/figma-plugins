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
import { useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  SmartRenameNodesProps,
  SubmitHandler
} from '../utilities/types'

export function SmartRenameNodes(props: SmartRenameNodesProps): h.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const { state, handleChange, handleSubmit, initialFocus } = useForm(props, {
    onClose: function () {
      emit<CloseUIHandler>('CLOSE_UI')
    },
    onSubmit: function ({ smartRenameLayersWhitelist }: SmartRenameNodesProps) {
      setIsLoading(true)
      emit<SubmitHandler>('SUBMIT', smartRenameLayersWhitelist)
    }
  })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function (hasSelection: boolean) {
        handleChange(hasSelection, 'hasSelection')
      })
    },
    [handleChange]
  )
  const { hasSelection, smartRenameLayersWhitelist } = state
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Ignore layers named</Text>
      <VerticalSpace space="small" />
      <Textbox
        {...initialFocus}
        disabled={isLoading === true}
        name="smartRenameLayersWhitelist"
        onChange={handleChange}
        value={smartRenameLayersWhitelist}
      />
      <VerticalSpace space="extraLarge" />
      <Button
        disabled={isLoading === true}
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

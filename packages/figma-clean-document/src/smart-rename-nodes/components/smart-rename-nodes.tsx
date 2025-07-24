import {
  Button,
  Container,
  Muted,
  Text,
  Textbox,
  useInitialFocus,
  useWindowKeyDown,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  SelectionChangedHandler,
  SmartRenameNodesProps,
  SubmitHandler
} from '../utilities/types.js'

export function SmartRenameNodes(props: SmartRenameNodesProps): JSX.Element {
  const [smartRenameLayersWhitelist, setSmartRenameLayersWhitelist] =
    useState<string>(props.smartRenameLayersWhitelist)

  const [hasSelection, setHasSelection] = useState<boolean>(props.hasSelection)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = useCallback(
    function () {
      setLoading(true)
      emit<SubmitHandler>('SUBMIT', smartRenameLayersWhitelist)
    },
    [smartRenameLayersWhitelist]
  )
  useEffect(function () {
    return on<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      function (hasSelection: boolean) {
        setHasSelection(hasSelection)
      }
    )
  }, [])
  useWindowKeyDown('Escape', function () {
    emit<CloseUIHandler>('CLOSE_UI')
  })
  useWindowKeyDown('Enter', handleSubmit)

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Ignore layers named</Muted>
      </Text>
      <VerticalSpace space="small" />
      <Textbox
        disabled={loading === true}
        onValueInput={setSmartRenameLayersWhitelist}
        value={smartRenameLayersWhitelist}
      />
      <VerticalSpace space="large" />
      <Button
        {...useInitialFocus()}
        disabled={loading === true}
        fullWidth
        loading={loading === true}
        onClick={handleSubmit}
      >
        Smart Rename Layers
      </Button>
      <VerticalSpace space="medium" />
      <Text align="center">
        <Muted>
          {hasSelection === true
            ? 'Renaming layers in selection'
            : 'Renaming all layers on page'}
        </Muted>
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}

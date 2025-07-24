import {
  Button,
  Checkbox,
  Container,
  Muted,
  Stack,
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
  CleanNodesProps,
  CloseUIHandler,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types.js'

export function CleanNodes(props: CleanNodesProps): JSX.Element {
  const [deleteHiddenLayers, setDeleteHiddenLayers] = useState<boolean>(
    props.deleteHiddenLayers
  )
  const [pixelPerfect, setPixelPerfect] = useState<boolean>(props.pixelPerfect)
  const [skipLockedLayers, setSkipLockedLayers] = useState<boolean>(
    props.skipLockedLayers
  )
  const [smartRenameLayers, setSmartRenameLayers] = useState<boolean>(
    props.smartRenameLayers
  )
  const [smartRenameLayersWhitelist, setSmartRenameLayersWhitelist] =
    useState<string>(props.smartRenameLayersWhitelist)
  const [smartSortLayers, setSmartSortLayers] = useState<boolean>(
    props.smartSortLayers
  )
  const [ungroupSingleLayerGroups, setUngroupSingleLayerGroups] =
    useState<boolean>(props.ungroupSingleLayerGroups)

  const [hasSelection, setHasSelection] = useState<boolean>(props.hasSelection)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = useCallback(
    function () {
      setLoading(true)
      emit<SubmitHandler>('SUBMIT', {
        deleteHiddenLayers,
        pixelPerfect,
        skipLockedLayers,
        smartRenameLayers,
        smartRenameLayersWhitelist,
        smartSortLayers,
        ungroupSingleLayerGroups
      })
    },
    [
      deleteHiddenLayers,
      pixelPerfect,
      skipLockedLayers,
      smartRenameLayers,
      smartRenameLayersWhitelist,
      smartSortLayers,
      ungroupSingleLayerGroups
    ]
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
  const disabled =
    deleteHiddenLayers === false &&
    pixelPerfect === false &&
    smartRenameLayers === false &&
    smartSortLayers === false &&
    ungroupSingleLayerGroups === false
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Stack space="large">
        <Checkbox
          disabled={loading === true}
          onValueChange={setDeleteHiddenLayers}
          value={deleteHiddenLayers}
        >
          <Text>Delete hidden layers</Text>
        </Checkbox>
        <Checkbox
          disabled={loading === true}
          onValueChange={setUngroupSingleLayerGroups}
          value={ungroupSingleLayerGroups}
        >
          <Text>Ungroup single-layer groups</Text>
        </Checkbox>
        <Checkbox
          disabled={loading === true}
          onValueChange={setPixelPerfect}
          value={pixelPerfect}
        >
          <Text>Make pixel-perfect</Text>
        </Checkbox>
        <Checkbox
          disabled={loading === true}
          onValueChange={setSmartRenameLayers}
          value={smartRenameLayers}
        >
          <Text>Smart rename layers</Text>
          <VerticalSpace space="medium" />
          <Text>
            <Muted>Ignore layers named</Muted>
          </Text>
          <VerticalSpace space="small" />
          <Textbox
            disabled={smartRenameLayers === false || loading === true}
            onValueInput={setSmartRenameLayersWhitelist}
            value={smartRenameLayersWhitelist}
          />
        </Checkbox>
        <Checkbox
          disabled={loading === true}
          onValueChange={setSmartSortLayers}
          value={smartSortLayers}
        >
          <Text>Smart sort layers</Text>
          <VerticalSpace space="medium" />
          <Text>
            <Muted>
              Sort layers by their X and Y position while maintaining their
              relative stacking order on the page
            </Muted>
          </Text>
        </Checkbox>
        <Checkbox
          disabled={loading === true}
          onValueChange={setSkipLockedLayers}
          value={skipLockedLayers}
        >
          <Text>Skip locked layers</Text>
        </Checkbox>
      </Stack>
      <VerticalSpace space="large" />
      <Button
        {...useInitialFocus()}
        disabled={disabled === true || loading === true}
        fullWidth
        loading={loading === true}
        onClick={handleSubmit}
      >
        Clean Layers
      </Button>
      <VerticalSpace space="medium" />
      <Text align="center">
        <Muted>
          {hasSelection === true
            ? 'Cleaning layers in selection'
            : 'Cleaning all layers on page'}
        </Muted>
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}

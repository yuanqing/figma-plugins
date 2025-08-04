import {
  Button,
  Checkbox,
  Code,
  Container,
  Divider,
  Muted,
  Stack,
  Text,
  Textbox,
  useInitialFocus,
  useWindowKeyDown,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h, JSX } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { Selection } from '../../../components/selection.js'
import {
  CleanNodesProps,
  CloseUIHandler,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types.js'
import styles from './clean-nodes.css'

export function CleanNodes(props: CleanNodesProps): JSX.Element {
  const [cleanInstanceLayers, setCleanInstanceLayers] = useState<boolean>(
    props.cleanInstanceLayers
  )
  const [cleanLockedLayers, setCleanLockedLayers] = useState<boolean>(
    props.cleanLockedLayers
  )
  const [deleteHiddenLayers, setDeleteHiddenLayers] = useState<boolean>(
    props.deleteHiddenLayers
  )
  const [pixelPerfect, setPixelPerfect] = useState<boolean>(props.pixelPerfect)
  const [positionCanvasAtZeroZero, setPositionCanvasAtZeroZero] =
    useState<boolean>(props.positionCanvasAtZeroZero)
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

  const handleCancel = useCallback(function () {
    emit<CloseUIHandler>('CLOSE_UI')
  }, [])
  const handleSubmit = useCallback(
    function () {
      setLoading(true)
      emit<SubmitHandler>('SUBMIT', {
        cleanInstanceLayers,
        cleanLockedLayers,
        deleteHiddenLayers,
        pixelPerfect,
        positionCanvasAtZeroZero,
        smartRenameLayers,
        smartRenameLayersWhitelist,
        smartSortLayers,
        ungroupSingleLayerGroups
      })
    },
    [
      cleanInstanceLayers,
      cleanLockedLayers,
      deleteHiddenLayers,
      pixelPerfect,
      positionCanvasAtZeroZero,
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
    positionCanvasAtZeroZero === false &&
    smartRenameLayers === false &&
    smartSortLayers === false &&
    ungroupSingleLayerGroups === false
  return (
    <Fragment>
      <Container space="small">
        <VerticalSpace space="large" />
        <Stack space="medium">
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
          <div>
            <Checkbox
              disabled={loading === true}
              onValueChange={setSmartRenameLayers}
              value={smartRenameLayers}
            >
              <Text>Smart rename layers</Text>
            </Checkbox>
            <div class={styles.smartRenameLayersWhitelist}>
              <VerticalSpace space="small" />
              <Text>
                <Muted>Ignore layers named</Muted>
              </Text>
              <VerticalSpace space="small" />
              <Textbox
                disabled={smartRenameLayers === false || loading === true}
                onValueInput={setSmartRenameLayersWhitelist}
                value={smartRenameLayersWhitelist}
              />
            </div>
          </div>
          <Checkbox
            disabled={loading === true}
            onValueChange={setSmartSortLayers}
            value={smartSortLayers}
          >
            <Text>Smart sort layers</Text>
            <VerticalSpace space="medium" />
            <Text>
              <Muted>
                Sort layers by their <Code>(x,y)</Code> position while
                maintaining their relative stacking order on the page
              </Muted>
            </Text>
          </Checkbox>
          <Checkbox
            disabled={loading === true}
            onValueChange={setCleanInstanceLayers}
            value={cleanInstanceLayers}
          >
            <Text>Clean instance layers</Text>
          </Checkbox>
          <Checkbox
            disabled={loading === true}
            onValueChange={setCleanLockedLayers}
            value={cleanLockedLayers}
          >
            <Text>Clean locked layers</Text>
          </Checkbox>
          <Checkbox
            disabled={hasSelection === true || loading === true}
            onValueChange={setPositionCanvasAtZeroZero}
            value={hasSelection === true ? false : positionCanvasAtZeroZero}
          >
            <Text>
              Position canvas at <Code>(0,0)</Code>
            </Text>
          </Checkbox>
        </Stack>
        <VerticalSpace space="large" />
      </Container>
      <Divider />
      <div class={styles.footer}>
        <Button
          disabled={disabled === true || loading === true}
          onClick={handleCancel}
          secondary
        >
          Cancel
        </Button>
        <Button
          {...useInitialFocus()}
          disabled={disabled === true || loading === true}
          loading={loading === true}
          onClick={handleSubmit}
        >
          Clean layers
        </Button>
      </div>
      <Selection hasSelection={hasSelection} />
    </Fragment>
  )
}

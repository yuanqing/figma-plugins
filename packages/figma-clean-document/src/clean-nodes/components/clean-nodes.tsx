import {
  Button,
  Checkbox,
  Container,
  Stack,
  Text,
  Textbox,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect } from 'preact/hooks'

import {
  CleanNodesProps,
  CloseUIHandler,
  FormState,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types'

export function CleanNodes(props: CleanNodesProps): JSX.Element {
  const {
    disabled,
    formState,
    handleSubmit,
    initialFocus,
    setFormState
  } = useForm<FormState>(
    { ...props, loading: false },
    {
      close: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      submit: function ({
        deleteHiddenLayers,
        loading,
        pixelPerfect,
        skipLockedLayers,
        smartRenameLayers,
        smartRenameLayersWhitelist,
        smartSortLayers,
        ungroupSingleLayerGroups
      }: FormState) {
        setFormState(loading, 'loading')
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
      validate: function ({
        deleteHiddenLayers,
        pixelPerfect,
        smartRenameLayers,
        smartSortLayers,
        ungroupSingleLayerGroups
      }: FormState) {
        return (
          deleteHiddenLayers === true ||
          pixelPerfect === true ||
          smartRenameLayers === true ||
          smartSortLayers === true ||
          ungroupSingleLayerGroups === true
        )
      }
    }
  )
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function (hasSelection) {
          setFormState(hasSelection, 'hasSelection')
        }
      )
    },
    [setFormState]
  )
  const {
    deleteHiddenLayers,
    hasSelection,
    loading,
    pixelPerfect,
    skipLockedLayers,
    smartRenameLayers,
    smartRenameLayersWhitelist,
    smartSortLayers,
    ungroupSingleLayerGroups
  } = formState
  return (
    <Container space="medium">
      <VerticalSpace space="extraLarge" />
      <Stack space="large">
        <Checkbox
          disabled={loading === true}
          name="deleteHiddenLayers"
          onValueChange={setFormState}
          value={deleteHiddenLayers}
        >
          <Text>Delete hidden layers</Text>
        </Checkbox>
        <Checkbox
          disabled={loading === true}
          name="ungroupSingleLayerGroups"
          onValueChange={setFormState}
          value={ungroupSingleLayerGroups}
        >
          <Text>Ungroup single-layer groups</Text>
        </Checkbox>
        <Checkbox
          disabled={loading === true}
          name="pixelPerfect"
          onValueChange={setFormState}
          value={pixelPerfect}
        >
          <Text>Make pixel-perfect</Text>
        </Checkbox>
        <Checkbox
          disabled={loading === true}
          name="smartRenameLayers"
          onValueChange={setFormState}
          value={smartRenameLayers}
        >
          <Text>Smart rename layers</Text>
          <VerticalSpace space="medium" />
          <Text muted>Ignore layers named</Text>
          <VerticalSpace space="small" />
          <Textbox
            disabled={smartRenameLayers === false || loading === true}
            name="smartRenameLayersWhitelist"
            onValueChange={setFormState}
            value={smartRenameLayersWhitelist}
          />
        </Checkbox>
        <Checkbox
          disabled={loading === true}
          name="smartSortLayers"
          onValueChange={setFormState}
          value={smartSortLayers}
        >
          <Text>Smart sort layers</Text>
          <VerticalSpace space="medium" />
          <Text muted>
            Sort layers by their X and Y position while maintaining their
            relative stacking order on the page
          </Text>
        </Checkbox>
        <Checkbox
          disabled={loading === true}
          name="skipLockedLayers"
          onValueChange={setFormState}
          value={skipLockedLayers}
        >
          <Text>Skip locked layers</Text>
        </Checkbox>
      </Stack>
      <VerticalSpace space="extraLarge" />
      <Button
        {...initialFocus}
        disabled={disabled || loading === true}
        fullWidth
        loading={loading === true}
        onClick={handleSubmit}
      >
        Clean Layers
      </Button>
      <VerticalSpace space="small" />
      <Text align="center" muted>
        {hasSelection === true
          ? 'Cleaning layers in selection'
          : 'Cleaning all layers on page'}
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}

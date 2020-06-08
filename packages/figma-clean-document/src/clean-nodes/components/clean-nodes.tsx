/** @jsx h */
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
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function CleanNodes(props: { [key: string]: any }): h.JSX.Element {
  const { state, handleChange, handleSubmit, isValid } = useForm(
    { ...props, isLoading: false },
    {
      onClose: function () {
        emit('CLOSE_UI')
      },
      onSubmit: function ({
        deleteHiddenLayers,
        pixelPerfect,
        skipLockedLayers,
        smartRenameLayers,
        smartRenameLayersWhitelist,
        ungroupSingleLayerGroups
      }) {
        handleChange({ isLoading: true })
        emit('SUBMIT', {
          deleteHiddenLayers,
          pixelPerfect,
          skipLockedLayers,
          smartRenameLayers,
          smartRenameLayersWhitelist,
          ungroupSingleLayerGroups
        })
      },
      validate: function ({
        deleteHiddenLayers,
        pixelPerfect,
        smartRenameLayers,
        smartSortLayers,
        ungroupSingleLayerGroups
      }) {
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
      return on('SELECTION_CHANGED', function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )
  const {
    deleteHiddenLayers,
    hasSelection,
    isLoading,
    pixelPerfect,
    skipLockedLayers,
    smartRenameLayers,
    smartRenameLayersWhitelist,
    smartSortLayers,
    ungroupSingleLayerGroups
  } = state
  return (
    <Container space="medium">
      <VerticalSpace space="extraLarge" />
      <Stack space="large">
        <Checkbox
          disabled={isLoading === true}
          name="deleteHiddenLayers"
          onChange={handleChange}
          value={deleteHiddenLayers}
        >
          <Text>Delete hidden layers</Text>
        </Checkbox>
        <Checkbox
          disabled={isLoading === true}
          name="ungroupSingleLayerGroups"
          onChange={handleChange}
          value={ungroupSingleLayerGroups}
        >
          <Text>Ungroup single-layer groups</Text>
        </Checkbox>
        <Checkbox
          disabled={isLoading === true}
          name="pixelPerfect"
          onChange={handleChange}
          value={pixelPerfect}
        >
          <Text>Make pixel-perfect</Text>
        </Checkbox>
        <Checkbox
          disabled={isLoading === true}
          name="smartRenameLayers"
          onChange={handleChange}
          value={smartRenameLayers}
        >
          <Text>Smart rename layers</Text>
          <VerticalSpace space="medium" />
          <Text muted>Ignore layers named</Text>
          <VerticalSpace space="small" />
          <Textbox
            disabled={smartRenameLayers === false || isLoading === true}
            name="smartRenameLayersWhitelist"
            onChange={handleChange}
            value={smartRenameLayersWhitelist}
          />
        </Checkbox>
        <Checkbox
          disabled={isLoading === true}
          name="smartSortLayers"
          onChange={handleChange}
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
          disabled={isLoading === true}
          name="skipLockedLayers"
          onChange={handleChange}
          value={skipLockedLayers}
        >
          <Text>Skip locked layers</Text>
        </Checkbox>
      </Stack>
      <VerticalSpace space="extraLarge" />
      <Button
        disabled={isValid() === false || isLoading === true}
        focused
        fullWidth
        loading={isLoading === true}
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

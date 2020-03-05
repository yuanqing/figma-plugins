/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Stack,
  Text,
  Textbox,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function CleanLayers (initialState) {
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    { ...initialState, isLoading: false },
    {
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
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ hasSelection, isLoading, ...settings }) {
        handleChange({ isLoading: true })
        triggerEvent('SUBMIT', settings)
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
    <Container space='medium'>
      <VerticalSpace space='extraLarge' />
      <Stack space='large'>
        <Checkbox
          name='deleteHiddenLayers'
          value={deleteHiddenLayers}
          onChange={handleChange}
          disabled={isLoading === true}
        >
          <Text>Delete hidden layers</Text>
        </Checkbox>
        <Checkbox
          name='ungroupSingleLayerGroups'
          value={ungroupSingleLayerGroups}
          onChange={handleChange}
          disabled={isLoading === true}
        >
          <Text>Ungroup single-layer groups</Text>
        </Checkbox>
        <Checkbox
          name='pixelPerfect'
          value={pixelPerfect}
          onChange={handleChange}
          disabled={isLoading === true}
        >
          <Text>Make pixel-perfect</Text>
        </Checkbox>
        <Checkbox
          name='smartRenameLayers'
          value={smartRenameLayers}
          onChange={handleChange}
          disabled={isLoading === true}
        >
          <Text>Smart rename layers</Text>
          <VerticalSpace space='medium' />
          <Text muted>Ignore layers named</Text>
          <VerticalSpace space='small' />
          <Textbox
            disabled={smartRenameLayers === false || isLoading === true}
            name='smartRenameLayersWhitelist'
            value={smartRenameLayersWhitelist}
            onChange={handleChange}
          />
        </Checkbox>
        <Checkbox
          name='smartSortLayers'
          onChange={handleChange}
          value={smartSortLayers}
          disabled={isLoading === true}
        >
          <Text>Smart sort layers</Text>
          <VerticalSpace space='medium' />
          <Text muted>
            Sort layers by their X and Y position while maintaining their
            relative stacking order on the page
          </Text>
        </Checkbox>
        <Checkbox
          name='skipLockedLayers'
          value={skipLockedLayers}
          onChange={handleChange}
          disabled={isLoading === true}
        >
          <Text>Skip locked layers</Text>
        </Checkbox>
      </Stack>
      <VerticalSpace space='extraLarge' />
      <Button
        fullWidth
        disabled={isInvalid() === true || isLoading === true}
        loading={isLoading === true}
        focused
        onClick={handleSubmit}
      >
        Clean Layers
      </Button>
      <VerticalSpace space='small' />
      <Text muted align='center'>
        {hasSelection === true
          ? 'Cleaning layers in selection'
          : 'Cleaning all layers on page'}
      </Text>
      <VerticalSpace space='extraLarge' />
    </Container>
  )
}

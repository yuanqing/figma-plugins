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
    initialState,
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
      onSubmit: function (settings) {
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
    pixelPerfect,
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
        >
          <Text>Delete hidden layers</Text>
        </Checkbox>
        <Checkbox
          name='ungroupSingleLayerGroups'
          value={ungroupSingleLayerGroups}
          onChange={handleChange}
        >
          <Text>Ungroup single-layer groups</Text>
        </Checkbox>
        <Checkbox
          name='pixelPerfect'
          value={pixelPerfect}
          onChange={handleChange}
        >
          <Text>Make pixel-perfect</Text>
        </Checkbox>
        <Checkbox
          name='smartRenameLayers'
          value={smartRenameLayers}
          onChange={handleChange}
        >
          <Text>Smart rename layers</Text>
          <VerticalSpace space='medium' />
          <Text muted>Ignore layers named</Text>
          <VerticalSpace space='small' />
          <Textbox
            disabled={smartRenameLayers === false}
            name='smartRenameLayersWhitelist'
            value={smartRenameLayersWhitelist}
            onChange={handleChange}
          />
        </Checkbox>
        <Checkbox
          name='smartSortLayers'
          onChange={handleChange}
          value={smartSortLayers}
        >
          <Text>Smart sort layers</Text>
          <VerticalSpace space='medium' />
          <Text muted>
            Sort layers by their X and Y position while maintaining their
            relative stacking order on the page
          </Text>
        </Checkbox>
      </Stack>
      <VerticalSpace space='extraLarge' />
      <Button fullWidth disabled={isInvalid() === true} onClick={handleSubmit}>
        Clean Layers
      </Button>
      <VerticalSpace space='small' />
      <Text muted align='center'>
        {hasSelection === true
          ? 'Cleaning layers in selection'
          : 'Cleaning layers on page'}
      </Text>
      <VerticalSpace space='extraLarge' />
    </Container>
  )
}

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
import { triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'

export function CleanLayers (initialState) {
  function submitCallback (settings) {
    triggerEvent('CLEAN_LAYERS', settings)
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    true
  )
  const {
    deleteHiddenLayers,
    pixelPerfect,
    smartRenameLayers,
    smartRenameLayersWhitelist,
    smartSortLayers,
    ungroupSingleLayerGroups
  } = inputs
  const isSubmitButtonEnabled =
    deleteHiddenLayers === true ||
    pixelPerfect === true ||
    smartRenameLayers === true ||
    smartSortLayers === true ||
    ungroupSingleLayerGroups === true
  return (
    <Container space='medium'>
      <VerticalSpace space='extraLarge' />
      <Stack space='large'>
        <Checkbox
          key='deleteHiddenLayers'
          value={deleteHiddenLayers}
          onChange={handleInput}
        >
          <Text>Delete hidden layers</Text>
        </Checkbox>
        <Checkbox
          key='ungroupSingleLayerGroups'
          value={ungroupSingleLayerGroups}
          onChange={handleInput}
        >
          <Text>Ungroup single-layer groups</Text>
        </Checkbox>
        <Checkbox
          key='pixelPerfect'
          value={pixelPerfect}
          onChange={handleInput}
        >
          <Text>Make pixel-perfect</Text>
        </Checkbox>
        <Checkbox
          key='smartRenameLayers'
          value={smartRenameLayers}
          onChange={handleInput}
        >
          <Text>Smart rename layers</Text>
          <VerticalSpace space='medium' />
          <Text muted>Ignore layers named</Text>
          <VerticalSpace space='small' />
          <Textbox
            disabled={inputs.smartRenameLayers === false}
            key='smartRenameLayersWhitelist'
            value={smartRenameLayersWhitelist}
            onChange={handleInput}
          />
        </Checkbox>
        <Checkbox
          key='smartSortLayers'
          onChange={handleInput}
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
      <Button
        fullWidth
        disabled={isSubmitButtonEnabled === false}
        onClick={isSubmitButtonEnabled === true ? handleSubmit : null}
      >
        Clean Layers
      </Button>
    </Container>
  )
}
